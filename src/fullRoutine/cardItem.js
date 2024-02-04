import { Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import React, { useEffect, useRef, useState } from "react";
import { showTimer } from "../../util/helper";
import Icon from "react-native-vector-icons/Entypo";
import { COLORS } from "../../constants/theme";
import ItemSettingsModal from "./itemSettingsModal";


const CardItem = ({ item, handleDelete, handleMainPage,isModalVisible, setModalVisible, selectedItem, handleUpdate }) => {


  const [timer, setTimer] = useState(item.totalSeconds ? item.totalSeconds : "0");
  const timerString = useRef( item.totalSeconds ? showTimer(item.totalSeconds) : showTimer(0));
  const [active, setActive] = useState(item.active ? item.active : false);

  useEffect(() => {

    if (active) {

      let totalSeconds = timer;
      const intervalId = setInterval(() => {
          totalSeconds++;
          setTimer(totalSeconds)
          const formattedTimer = showTimer(totalSeconds);
          timerString.current = formattedTimer;

      }, 1000);

      return () => clearInterval(intervalId);
    }

  }, [active]);




  // type kısmıda gönderilecek.
  const handlePlay = () => {
      setActive(true)
      console.log("play")
  }

  const handlePause = () => {
    setActive(false)
    console.log("pause")
  }

  const handleSave = () => {
    setActive(false)
    console.log("save")
  }

  const handleCancel = () => {
    setActive(false)
    setTimer(0)
    console.log("cancel")
  }



  return (

    <View style={style.cardItemContainer}>

      {
            <ItemSettingsModal
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

        <TouchableOpacity style={style.cardItemContentTopIcon} onPress={() => {

          selectedItem.current = item
          setModalVisible(true)}
        }
          >
          <Icon name="dots-three-vertical" size={20} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <View style={style.cardItemTimerView}>
        <Text style={style.cardItemTimerText}>
          {timerString.current}
        </Text>
      </View>

      <View style={style.iconContainer}>

        {
          !active &&
          <TouchableOpacity onPress={()=> handlePlay()}>
            <Icon
              name="controller-play"
              size={40}
              color={COLORS.secondary}
              style={style.iconItem}
            />
          </TouchableOpacity>

        }

        {
          active &&
          <TouchableOpacity onPress={()=> handleCancel()}>
            <Icon
              name="controller-stop"
              size={40}
              color={COLORS.secondary}
              style={style.iconItem}
            />
          </TouchableOpacity>
        }

        {
          active &&
          <TouchableOpacity onPress={()=> handlePause()}>
            <Icon
              name="controller-paus"
              size={40}
              color={COLORS.secondary}
              style={style.iconItem}
            />
          </TouchableOpacity>
        }

        {
          active &&
          <TouchableOpacity onPress={()=> handleSave()}>
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
