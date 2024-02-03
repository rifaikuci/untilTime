import style from "./style";
import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { COLORS } from "../../constants/theme";
import Icon from "react-native-vector-icons/AntDesign";

const ItemSettingsModal = ({ isModalVisible, setModalVisible, handleDelete, handleMainPage, selectedItem, handleUpdate }) => {

  return (

    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={style.modalContent}>

        <View style={style.modalBody}>
          <View style={style.modalTitleContent}>
            <Text style={style.modalTitle}>
              {selectedItem ? selectedItem.title :"asd"}
            </Text>
          </View>

          <TouchableOpacity style={style.modalCloseIconContent} onPress={() => setModalVisible(false)}>
            <Icon name="close" size={30} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={style.choosenContent}>

          <TouchableOpacity onPress={() => handleUpdate(selectedItem.id)}>
            <View style={style.choosenItem}>
              <Text style={style.choosenItemText}>
                Düzenle
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleMainPage(selectedItem.id)}>
            <View style={style.choosenItem}>
              <Text style={style.choosenItemText}>
                Anasayfadan Çıkar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> console.log("anA")}>
          <View style={style.choosenItem}>
            <Text style={style.choosenItemText}>
              Rutininizi inceleyin
            </Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDelete(selectedItem.id)}>
          <View style={style.choosenItem}>
            <Text style={style.choosenItemText}>
              Rutini sil
            </Text>
          </View>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
};

export default ItemSettingsModal;
