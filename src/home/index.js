import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import style from "./style";
import CardItem from "./cardItem";
import MainTop from "./mainTop";
import AddCardItem from "./addCardItem";


const Index = () => {

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
    console.log("add item")
  }


  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>

        <MainTop />

        <View style={style.cardListContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {
              cardList.map((x, index) => {
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
