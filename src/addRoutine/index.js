// AddRoutine.js
import style from "./style";
import { Alert, SafeAreaView, TextInput, View } from "react-native";
import { Header, InputCheckbox, InputText, Loading, UcButton } from "../../components";
import React, { useEffect, useRef, useState } from "react";
import createWebClient from "../../webClient";
import { useFocusEffect } from "@react-navigation/native";

const AddRoutine = (props) => {
  const mainPage = useRef(props.route && props.route.params && props.route.params.mainPage == 0  ? false : true);
  const isLoading = useRef(false);
  const [refresh, setRefresh] = useState(false);
  const [title, setTitle] = useState("");

  const routineId = props.route?.params?.routineId;
  const deviceId = props.route?.params?.deviceId;



  useFocusEffect(
    React.useCallback(() => {
      fetchData().then(()=> {})
    }, [props.route]),
  );

  const fetchData = async  () => {
    if (routineId) {
      try {
        isLoading.current = true;
        const WebClient = await createWebClient();

        const response = await WebClient.post("", {
          method: "getRoutineId",
          routineId: routineId
        });
        setTitle(response.data.title);
      } catch (error) {
        console.error("Error using WebClient:", error);
      } finally {
        isLoading.current = false;
        setRefresh(!refresh);
      }
    }
  }



  if (isLoading.current) {
    return <Loading />;
  }

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

        if (response?.data) {
          Alert.alert("Bilgi", "Rutin başarılı bir şekilde kaydedildi", [
            {
              text: "Tamam",
              onPress: () => {
                props.navigation.goBack();
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
        isLoading.current = false;
        setRefresh(!refresh);
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


  const handleUpdate = async () => {
    if (title) {
      try {

        isLoading.current = true;
        const WebClient = await createWebClient();

        const response = await WebClient.post("", {
          method: "updateRoutine",
          title: title,
          isMainPage: mainPage.current ? 1 : 0,
          routineId : routineId
        });

        if (response?.data?.success) {
          Alert.alert("Bilgi", "Rutin başarılı bir şekilde Güncellendi", [
            {
              text: "Tamam",
              onPress: () => {
                props.navigation.goBack();
              },
            },
          ]);
        } else {
          Alert.alert("Hata", "Rutin Güncellenirken bir hata oluştu", [
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
        isLoading.current = false;
        setRefresh(!refresh);
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

  const handleDelete = async () => {
    if (title) {
      try {

        isLoading.current = true;
        const WebClient = await createWebClient();

        const responseDelete = await WebClient.post('', {method:'deleteRoutine', routineId : routineId, deviceId: deviceId});


        if( responseDelete.data.success) {
          Alert.alert("Bilgi", "Rutin başarılı bir şekilde silindi", [
            {
              text: "Tamam",
              onPress: () => {
                props.navigation.goBack();
              },
            },
          ]);
        } else {
          Alert.alert("Hata", "Rutin silinirken bir hata oluştu", [
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
        isLoading.current = false;
        setRefresh(!refresh);
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
        <Header goBack={true} title={routineId ? "Rutin Güncelle": "Rutin Ekle"} navigation={props.navigation} />
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
          value={mainPage.current}
          label="Anasayfada gözükmeli mi?"
          onChange={handleCheckboxChange}
        />
      </View>


      {
        routineId ?
          <UcButton title={"Güncelle"} handlePress={ handleUpdate} /> :
          <UcButton title={"Kaydet"} handlePress={ handleSubmit} />
      }

      {
        routineId ?
          <UcButton contentStyle={{
            marginTop: 25,
            backgroundColor: 'black',
          }}  title={"Sil"} handlePress={ handleDelete} /> : null
      }


    </SafeAreaView>
  );
};

export default AddRoutine;
