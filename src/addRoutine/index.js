// AddRoutine.js
import React, { useEffect, useRef, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Header, InputCheckbox, InputText, Loading, UcButton } from "../../components";
import createWebClient from "../../webClient";
import { useFocusEffect } from "@react-navigation/native";
import style from "./style";

const AddRoutine = (props) => {
  const mainPage = useRef(props.route?.params?.mainPage === 0 ? false : true);
  const isLoading = useRef(false);
  const [refresh, setRefresh] = useState(false);
  const [title, setTitle] = useState(props.route?.params?.routineId ? "" : "");// Eğer routineId varsa boş, yoksa varsayılan bir değer

  const routineId = props.route?.params?.routineId;
  const deviceId = props.route?.params?.deviceId;

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [props.route]),
  );

  const fetchData = async () => {
    if (routineId) {
      try {
        isLoading.current = true;
        const WebClient = await createWebClient();
        const response = await WebClient.post("", {
          method: "getRoutineId",
          routineId: routineId,
        });
        setTitle(response.data.title);
      } catch (error) {
        console.error("Error using WebClient:", error);
      } finally {
        isLoading.current = false;
        setRefresh(!refresh);
      }
    }
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleCheckboxChange = (isChecked) => {
    mainPage.current = isChecked;
    setRefresh(!refresh);
  };

  const handleSubmit = async () => {
    if (title) {
      try {
        isLoading.current = true;
        const WebClient = await createWebClient();
        const response = await WebClient.post("", {
          method: "saveRoutines",
          title: title,
          isMainPage: mainPage.current ? 1 : 0,
        });

        showAlert(response, "Rutin başarılı bir şekilde kaydedildi");
      } catch (error) {
        console.error("Error using WebClient:", error);
      } finally {
        isLoading.current = false;
        setRefresh(!refresh);
      }
    } else {
      showAlert(null, "Rutin adı giriniz");
    }
  };

  const handleUpdate = async () => {
    if (title) {
      try {
        isLoading.current = true;
        const WebClient = await createWebClient();
        const response = await WebClient.post("", {
          method: "updateRoutine",
          title: title,
          isMainPage: mainPage.current ? 1 : 0,
          routineId: routineId,
        });

        showAlert(response, "Rutin başarılı bir şekilde Güncellendi");
      } catch (error) {
        console.error("Error using WebClient:", error);
      } finally {
        isLoading.current = false;
        setRefresh(!refresh);
      }
    } else {
      showAlert(null, "Rutin adı giriniz");
    }
  };

  const handleDelete = async () => {
    if (title) {
      try {
        isLoading.current = true;
        const WebClient = await createWebClient();
        const responseDelete = await WebClient.post("", { method: "deleteRoutine", routineId: routineId, deviceId: deviceId });

        showAlert(responseDelete, "Rutin başarılı bir şekilde silindi");
      } catch (error) {
        console.error("Error using WebClient:", error);
      } finally {
        isLoading.current = false;
        setRefresh(!refresh);
      }
    } else {
      showAlert(null, "Rutin adı giriniz");
    }
  };

  const showAlert = (response, successMessage) => {
    const success = response?.data?.success;
    const message = success ? successMessage : "Rutin eklenirken bir hata oluştu";

    Alert.alert(
      success ? "Bilgi" : "Hata",
      message,
      [
        {
          text: "Tamam",
          onPress: () => {
            if (success) {
              props.navigation.goBack();
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>
        <Header goBack={true} title={routineId ? "Rutin Güncelle" : "Rutin Ekle"} navigation={props.navigation} />
      </View>

      <View style={style.inputContent}>
        <InputText placeHolderText={"Rutin giriniz..."} value={title} onChangeText={handleTitleChange} />
      </View>
      <View style={style.checkboxContent}>
        <InputCheckbox value={mainPage.current} label="Anasayfada gözükmeli mi?" onChange={handleCheckboxChange} />
      </View>

      {routineId ? <UcButton title={"Güncelle"} handlePress={handleUpdate} /> : <UcButton title={"Kaydet"} handlePress={handleSubmit} />}
      {routineId ? <UcButton contentStyle={{ marginTop: 25, backgroundColor: "black" }} title={"Sil"} handlePress={handleDelete} /> : null}
    </SafeAreaView>
  );
};

export default AddRoutine;
