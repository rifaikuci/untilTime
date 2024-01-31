// AddRoutine.js
import style from "./style";
import { Alert, SafeAreaView, TextInput, View } from "react-native";
import { Header, InputCheckbox, InputText, Loading, UcButton } from "../../components";
import React, { useState } from "react";
import createWebClient from "../../webClient";

const AddRoutine = (props) => {
  const [title, setTitle] = useState("");
  const [mainPage, setMainPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleCheckboxChange = (isChecked) => {
    setMainPage(isChecked);
  };


  const handleSubmit = async () => {
    if (title) {
      try {

        setIsLoading(true);
        const WebClient = await createWebClient();

        const response = await WebClient.post("", {
          method: "saveRoutines",
          title: title,
          isMainPage: mainPage ? 1 : 0,
        });

        if (response?.data?.success) {
          Alert.alert("Bilgi", "Rutin başarılı bir şekilde kaydedildi", [
            {
              text: "Tamam",
              onPress: () => {
                props.navigation.navigate("Home");
              },
            },
          ]);
        } else {
          Alert.alert("Hata", "Rutin eklenirken bir hata oluştu", [
            {
              text: "Tamam",
              onPress: () => {
              },
            },
          ]);
        }

      } catch (error) {
        console.error("Error using WebClient:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert("Hata", "Rutin adı giriniz", [
        {
          text: "Tamam",
          onPress: () => {
          },
        },
      ]);
    }
  };


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


      <UcButton title={"Kaydet"} handlePress={handleSubmit} />

    </SafeAreaView>
  );
};

export default AddRoutine;
