import style from "./style";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { COLORS } from "../../constants/theme";
import Icon from "react-native-vector-icons/AntDesign";

const ItemSettingsModal = ({ isModalVisible, setModalVisible, item }) => {

  return (

    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={style.modalContent}>

        <View style={style.modalBody}>
          <View style={style.modalTitleContent}>
            <Text style={style.modalTitle}>
              {item.itemDescription}
            </Text>
          </View>

          <TouchableOpacity style={style.modalCloseIconContent} onPress={() => setModalVisible(false)} >
            <Icon name="close" size={30} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={style.choosenContent}>

          <View style={style.choosenItem}>
            <Text style={style.choosenItemText}>
              Anasayfadan Çıkar
            </Text>
          </View>

          <View style={style.choosenItem}>
            <Text style={style.choosenItemText}>
              Rutininizi inceleyin
            </Text>
          </View>

          <View style={style.choosenItem}>
            <Text style={style.choosenItemText}>
              Rutini sil
            </Text>
          </View>
        </View>

      </View>
    </Modal>
  );
};

export default ItemSettingsModal;
