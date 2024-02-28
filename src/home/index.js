import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";

import style from "./style";
import MainTop from "./mainTop";
import AddCardItem from "./addCardItem";
import createWebClient from "../../webClient";
import { CardItem, Loading } from "../../components";
import { useFocusEffect } from "@react-navigation/native";


const Index = (props) => {

  const routines = useRef([]);
  const deviceInfo = useRef({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const selectedItem = useRef({});

  const handleAddItem = () => {
    props.navigation.navigate("AddRoutine");
  };


  const [isLoading, setIsLoading] = useState(false);
  const useWebClient = async () => {
    try {
      setIsLoading(true);
      const WebClient = await createWebClient();

      const response = await WebClient.post("", { method: "deviceControl" });
      deviceInfo.current = response.data;

      if (response.data.id) {
        const routineResponse = await WebClient.post("", { method: "getRoutinesMainPage", deviceId: response.data.id });

        routines.current = routineResponse.data;

        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Error using WebClient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      useWebClient().then((r) => {
      });

    }, []),
  );


  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = async (routineId) => {

    const WebClient = await createWebClient();

    const responseDelete = await WebClient.post("", {
      method: "deleteRoutine",
      routineId: routineId,
      deviceId: deviceInfo.current.id,
    });

    if (deviceInfo.current && responseDelete.data.success) {
      const routineResponse = await WebClient.post("", {
        method: "getRoutinesMainPage",
        deviceId: deviceInfo.current.id,
      });
      routines.current = routineResponse.data;
      setModalVisible(false);
    }
  };

  const handleUpdateMainPage = async (routineId) => {

    const WebClient = await createWebClient();

    const responseUpdate = await WebClient.post("", {
      method: "updateRoutineMainPage",
      routineId: routineId,
      deviceId: deviceInfo.current.id,
    });

    if (deviceInfo.current && responseUpdate.data.success) {
      const routineResponse = await WebClient.post("", {
        method: "getRoutinesMainPage",
        deviceId: deviceInfo.current.id,
      });
      routines.current = routineResponse.data;
      setModalVisible(false);
    }
  };

  const handleUpdate = (item) => {
    setModalVisible(false);
    props.navigation.navigate("AddRoutine", {
      routineId: item.id,
      deviceId: deviceInfo.current.id,
      mainPage: item.isMainPage,
    });
  };

  const handlePlay = async (item) => {


    const WebClient = await createWebClient();

    const responseStart = await WebClient.post("", {
      method: "startRoutineTimes",
      routineId: item.id,
      deviceId: deviceInfo.current.id,
    });

    if (deviceInfo.current && responseStart.data.success) {
      routines.current.find(x => x.id === item.id).active = true;
      routines.current.find(x => x.id === item.id).routineTimesId = responseStart.data.routineTimesId;
      setRefresh(!refresh);
    }
  };


  const handleSave = async (item) => {

    const WebClient = await createWebClient();

    const responseStart = await WebClient.post("", {
      method: "finishRoutineTimes",
      routineId: item.id,
      deviceId: deviceInfo.current.id,
      routineTimesId: item.routineTimesId,
    });

    if (deviceInfo.current && responseStart.data.success) {
      routines.current.find(x => x.id === item.id).totalSeconds = 0;
      routines.current.find(x => x.id === item.id).active = false;
      setRefresh(!refresh);
    }

  };

  const  handleDetail = (x) => {
    props.navigation.navigate("DetailRoutine", {...x,  deviceId: deviceInfo.current.id} )

  }


  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>
        <MainTop />

        <View style={style.cardListContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {
              routines.current.map((x, index) => {
                return (
                  <TouchableOpacity key={index} onPress={()=> handleDetail(x)}>

                    <CardItem
                      isModalVisible={isModalVisible}
                      setModalVisible={setModalVisible}
                      selectedItem={selectedItem}
                      item={x}
                      key={index}
                      handleDelete={handleDelete}
                      handleMainPage={handleUpdateMainPage}
                      handleUpdate={handleUpdate}
                      handlePlay={handlePlay}
                      handleSave={handleSave}
                    />
                  </TouchableOpacity>

                );
              })
            }

            <AddCardItem title={"Yeni bir rutin ekleyin"} handleAddItem={handleAddItem} />
          </ScrollView>

        </View>

      </View>
    </SafeAreaView>


  );
};


export default Index;
