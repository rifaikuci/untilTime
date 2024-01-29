// AddRoutine.js
import style from "./style";
import {  SafeAreaView, TextInput, View } from "react-native";
import { Header, InputCheckbox, InputText, UcButton } from "../../components";
import { useState } from "react";

const AddRoutine = (props) => {
  const [title, setTitle] = useState("");
  const [mainPage, setMainPage] = useState(true);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleCheckboxChange = (isChecked) => {
    console.log("Checkbox durumu:", isChecked);
    // Burada başka işlemler yapabilirsiniz
  };

  const handleSubmit = () => {
    console.log(title, mainPage)
  }

  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>
        <Header goBack={true} title={"Rutin Ekle"} navigation={props.navigation} />
      </View>

      <View style={style.inputContent}>
        <InputText
          placeHolderText={"Rutin giriniz..."}
          value={title}
          onChangeText={handleTitleChange}
        />
      </View>
      <View style={style.checkboxContent}>
        <InputCheckbox
          value={mainPage}
          label="Anasayfada gözükmeli mi?"
          onChange={handleCheckboxChange}
        />
      </View>


     <UcButton title={"Kaydet"} handlePress={handleSubmit}  />

    </SafeAreaView>
  );
};

export default AddRoutine;
