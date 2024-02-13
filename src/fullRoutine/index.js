import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import style from "./style";
import MainTop from "./mainTop";
import createWebClient from "../../webClient";
import { Loading, CardItem} from "../../components";
import { useFocusEffect } from "@react-navigation/native";


const FullRoutine = (props) => {

  const routines = useRef([]);
  const deviceInfo = useRef({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const selectedItem = useRef({});


  const [isLoading, setIsLoading] = useState(false)
  const useWebClient = async () => {
    try {
      setIsLoading(true);
      const WebClient = await createWebClient();

      const response = await WebClient.post('', {method:'deviceControl'});
      deviceInfo.current = response.data;

      if(response.data.id) {
        const routineResponse = await WebClient.post('', {method:'getRoutines', deviceId: response.data.id});

        routines.current = routineResponse.data;
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error('Error using WebClient:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      useWebClient().then((r) => {});

    }, [])
  )


  if (isLoading) {
    return <Loading />;
  }

  const  handleDelete = async (routineId) => {

    const WebClient = await createWebClient();

    const responseDelete = await WebClient.post('', {method:'deleteRoutine', routineId : routineId, deviceId: deviceInfo.current.id});

    if(deviceInfo.current && responseDelete.data.success) {
      const routineResponse = await WebClient.post('', {method:'getRoutinesMainPage', deviceId: deviceInfo.current.id});
      routines.current = routineResponse.data;
      setModalVisible(false)
    }
  }

  const  handleUpdateMainPage = async (routineId) => {

    const WebClient = await createWebClient();

    const responseUpdate = await WebClient.post('', {method:'updateRoutineMainPage', routineId : routineId, deviceId: deviceInfo.current.id});

    if(deviceInfo.current && responseUpdate.data.success) {
      const routineResponse = await WebClient.post('', {method:'getRoutinesMainPage', deviceId: deviceInfo.current.id});
      routines.current = routineResponse.data;
      setModalVisible(false)
    }
  }

  const handleUpdate = (item) => {
    setModalVisible(false)
    props.navigation.navigate("AddRoutine", {routineId : item.id, deviceId: deviceInfo.current.id, mainPage:item.isMainPage } )
  }



  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>
        <MainTop />

        <View style={style.cardListContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {
              routines.current.map((x,index) => {
                return (
                  <CardItem
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    selectedItem={selectedItem}
                    item={x}
                    key={index}
                    handleDelete={handleDelete}
                    handleMainPage={handleUpdateMainPage}
                    handleUpdate={handleUpdate}
                  />
                );
              })
            }

          </ScrollView>

        </View>

      </View>
    </SafeAreaView>



  );
};


export default FullRoutine;
