import React, { useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import style from "./style";
import CardItem from "./cardItem";
import MainTop from "./mainTop";


const Index = () => {

  const cardList = [
    {
      itemDescription: "Duolingo İngilzice Çlaışma",
      itemTimer: "00:00:00"
    },
    {
      itemDescription: "Duolingo İngilzice Çlaışma 10",
      itemTimer: "00:01:00"
    },
    {
      itemDescription: "Duolingo İngilzice Çlaışma1",
      itemTimer: "00:02:00"
    },
    {
      itemDescription: "Duolingo İngilzice Çlaışma3",
      itemTimer: "00:03:00"
    },
    {
      itemDescription: "Duolingo İngilzice Çlaışma2",
      itemTimer: "00:40:00"
    },


  ];


  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>

        <MainTop />

        <View style={style.cardListContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {
              cardList.map((x,index )=> {
                return (
                  <CardItem itemTimer={x.itemTimer} itemDescription={x.itemDescription} key={index}  />
                )
              })
            }

          </ScrollView>

        </View>

      </View>
    </SafeAreaView>

  );
};


export default Index;
