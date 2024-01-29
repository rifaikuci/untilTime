import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

import style from "./style";
import CardItem from "./cardItem";
import MainTop from "./mainTop";
import AddCardItem from "./addCardItem";
import createWebClient from "../../webClient";
import { Loading } from "../../components";


const Index = (props) => {

  const cardList = [
    {
      userId: 1,
      itemDescription: "Duolingo İngilzice Çlaışma1",
      active: true,
      totalSeconds: 0,
    },
    {
      userId: 2,
      itemDescription: "Duolingo İngilzice Çlaışma2",
      active: false,
      totalSeconds: 50,
    },
    {
      userId: 3,
      itemDescription: "Duolingo İngilzice Çlaışma3",
      active: false,
      totalSeconds: 80,
    },
    {
      userId: 4,
      itemDescription: "Duolingo İngilzice Çlaışma4",
      active: true,
      totalSeconds: 90,
    },


  ];

  const handleAddItem = () => {
      props.navigation.navigate("AddRoutine")
  }


  const [isLoading, setIsLoading] = useState(false)
  const useWebClient = async () => {
    try {
      setIsLoading(true);
      const WebClient = await createWebClient();

      const response = await WebClient.post('', {method:'deviceControl'});

    } catch (error) {
      console.error('Error using WebClient:', error);
    } finally {
      setIsLoading(false);

    }
  };


  if (isLoading) {
    return <Loading />;
  }



  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>
        <MainTop />

        <View style={style.cardListContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {
              cardList.map((x,index) => {
                return (
                  <CardItem item={x} key={index} />
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
