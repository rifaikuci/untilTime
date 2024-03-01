import { Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import React, { useEffect, useRef, useState } from "react";
import { showTimer, timeConvertSecond } from "../../util/helper";
import Icon from "react-native-vector-icons/Entypo";
import { COLORS } from "../../constants/theme";
import { ItemSettingsModal } from "../index";


const CardItem = ({
                    item, handleDelete, handleMainPage,isModalVisible,
                    setModalVisible, selectedItem, handleUpdate,
                    handlePlay, handleSave, navigation, settingsView=true, isDetail = false }) => {


  const [timer, setTimer] = useState(item.totalSeconds ? item.totalSeconds : "0");
  const [timerString,setTimerString] = useState( item.totalSeconds ? showTimer(item.totalSeconds) : showTimer(0));

  useEffect(() => {

    if (item.active) {

      let totalSeconds = timer;
      const intervalId = setInterval(() => {
          totalSeconds++;
          setTimer(totalSeconds)
          const formattedTimer = showTimer(totalSeconds);
          setTimerString(formattedTimer);

      }, 1000);

      return () => clearInterval(intervalId);
    } else if(isDetail) {
      const formattedTimer = showTimer(timer);
      setTimerString(formattedTimer);
    } else {
      setTimer(0)
      const formattedTimer = showTimer(0);
      setTimerString(formattedTimer);
    }



  }, [item.active]);

  return (

    <View style={style.cardItemContainer}>

      {
            <ItemSettingsModal
              navigation={navigation}
              handleDelete={handleDelete}
              handleMainPage={handleMainPage}
              handleUpdate={handleUpdate}
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
              selectedItem={selectedItem ? selectedItem.current : null}
            />
      }


      <View style={style.cardItemContentTopBar}>

        <View style={style.cardItemContentTopDesc}>
          <Text style={style.cardItemContentTopText}>
            {item.title}
          </Text>
        </View>

        {
          settingsView ?
            <TouchableOpacity style={style.cardItemContentTopIcon} onPress={() => {

              selectedItem.current = item
              setModalVisible(true)}
            }
            >
              <Icon name="dots-three-vertical" size={20} color={COLORS.secondary} />
            </TouchableOpacity> : null
        }

      </View>

      <View style={style.cardItemTimerView}>
        <Text style={style.cardItemTimerText}>
          {timerString}
        </Text>
      </View>

      <View style={style.iconContainer}>

        {
          !item.active &&
          <TouchableOpacity onPress={() => handlePlay(item)}>
            <Icon
              name="controller-play"
              size={40}
              color={COLORS.secondary}
              style={style.iconItem}
            />
          </TouchableOpacity>

        }

        {
          item.active &&
          <TouchableOpacity onPress={()=>handleSave(item)}>
            <Icon
              name="check"
              size={40}
              color={COLORS.secondary}
              style={style.iconItem}
            />
          </TouchableOpacity>
        }

      </View>


    </View>);
};

export default CardItem;
