import { Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import React, { useEffect, useState } from "react";
import { timeConvertSecond } from "../../util/helper";
import Icon from "react-native-vector-icons/Entypo";
import { COLORS } from "../../constants/theme";
import ItemSettingsModal from "./itemSettingsModal";

const CardItem = ({ item }) => {


  const [timer, setTimer] = useState(item.itemTimer ? item.itemTimer : "00:00:00");

  useEffect(() => {
    let totalSeconds = timeConvertSecond(timer);
    const intervalId = setInterval(() => {
      totalSeconds++;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const formattedTimer = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      setTimer(formattedTimer);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  return (

    <View style={style.cardItemContainer}>

      <ItemSettingsModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />

      <View style={style.cardItemContentTopBar}>

        <View style={style.cardItemContentTopDesc}>
          <Text style={style.cardItemContentTopText}>
            {item.itemDescription}
          </Text>
        </View>

        <TouchableOpacity style={style.cardItemContentTopIcon} onPress={() => setModalVisible(true)}>
          <Icon name="dots-three-vertical" size={20} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <View style={style.cardItemTimerView}>
        <Text style={style.cardItemTimerText}>
          {timer}
        </Text>
      </View>

      <View style={{
        marginBottom: 20, alignItems: "center", flexDirection: "row", justifyContent: "center",
      }}>

        <Icon name="controller-play" size={30} color={COLORS.secondary} />
        <Icon name="controller-stop" size={30} color={COLORS.secondary} />
        <Icon name="controller-paus" size={30} color={COLORS.secondary} />
        <Icon name="check" size={30} color={COLORS.secondary} />

      </View>


    </View>);
};

export default CardItem;
