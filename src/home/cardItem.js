import { Text, View } from "react-native";
import style from "./style";
import { useEffect, useState } from "react";
import { timeConvertSecond } from "../../util/helper";
import Icon from "react-native-vector-icons/Entypo";
import { COLORS } from "../../constants/theme";

const CardItem = ({ itemTimer, itemDescription }) => {


  const [timer, setTimer] = useState(itemTimer ? itemTimer : "00:00:00");

  useEffect(() => {
    let totalSeconds = timeConvertSecond(timer);

    console.log(totalSeconds, "dena");
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


  return (

    <View style={style.cardItemContainer}>

      <View style={style.cardItemContentTopBar}>

        <View style={style.cardItemContentTopDesc}>
          <Text style={style.cardItemContentTopText}>
            {itemDescription}
          </Text>
        </View>

        <View style={style.cardItemContentTopIcon}>
          <Icon name="dots-three-vertical" size={20} color={COLORS.secondary} />
        </View>
      </View>

      <View style={style.cardItemTimerView}>
        <Text style={style.cardItemTimerText}>
          {timer}
        </Text>
      </View>

      <View style={{
        marginBottom: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
      }}>


        <Icon name="controller-play" size={30} color={COLORS.secondary} />
        <Icon name="controller-stop" size={30} color={COLORS.secondary} />
        <Icon name="controller-paus" size={30} color={COLORS.secondary} />
        <Icon name="check" size={30} color={COLORS.secondary} />

      </View>


    </View>
  );
};

export default CardItem;
