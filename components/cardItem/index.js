import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import style from "./style";
import { showTimer } from "../../util/helper";
import { COLORS } from "../../constants/theme";
import { ItemSettingsModal } from "../index";

const CardItem = ({
                    item,
                    handleDelete,
                    handleMainPage,
                    isModalVisible,
                    setModalVisible,
                    selectedItem,
                    handleUpdate,
                    handlePlay,
                    handleSave,
                    navigation,
                    settingsView = true,
                    isDetail = false,
                  }) => {
  const [timer, setTimer] = useState(item.totalSeconds || 0);
  const [timerString, setTimerString] = useState(showTimer(item.totalSeconds || 0));

  useEffect(() => {
    if (item.active) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        setTimerString(showTimer(timer + 1));
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (isDetail) {
      setTimerString(showTimer(timer));
    } else {
      setTimer(0);
      setTimerString(showTimer(0));
    }
  }, [item.active, timer, isDetail]);

  return (
    <View style={style.cardItemContainer}>
      {isModalVisible && (
        <ItemSettingsModal
          navigation={navigation}
          handleDelete={handleDelete}
          handleMainPage={handleMainPage}
          handleUpdate={handleUpdate}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          selectedItem={selectedItem ? selectedItem.current : null}
        />
      )}

      <View style={style.cardItemContentTopBar}>
        <View style={style.cardItemContentTopDesc}>
          <Text style={style.cardItemContentTopText}>{item.title}</Text>
        </View>
        {settingsView && (
          <TouchableOpacity
            style={style.cardItemContentTopIcon}
            onPress={() => {
              selectedItem.current = item;
              setModalVisible(true);
            }}
          >
            <Icon name="dots-three-vertical" size={20} color={COLORS.secondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={style.cardItemTimerView}>
        <Text style={style.cardItemTimerText}>{timerString}</Text>
      </View>

      <View style={style.iconContainer}>
        {!item.active && (
          <TouchableOpacity onPress={() => handlePlay(item)}>
            <Icon name="controller-play" size={40} color={COLORS.secondary} style={style.iconItem} />
          </TouchableOpacity>
        )}

        {item.active && (
          <TouchableOpacity onPress={() => handleSave(item)}>
            <Icon name="check" size={40} color={COLORS.secondary} style={style.iconItem} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CardItem;
