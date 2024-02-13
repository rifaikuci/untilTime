import style from "./style";
import { Alert, FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CardItem, Header, InputCheckbox, InputText, Loading, UcButton } from "../../components";
import React, { useEffect, useRef, useState } from "react";
import createWebClient from "../../webClient";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../../constants/theme";



const DetailRoutine = (props) => {
  const isLoading = useRef(false);
  const [refresh, setRefresh] = useState(false);
  const [activeSections, setActiveSections] = useState([]);
  const [timeType, setTimeType] = useState("DAILY");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [active, setActive] = useState(false);


  const [data, setData]  = useState([]);
  const title = props.route.params.title;
  const routineId = props.route.params.id;


  useEffect( () => {

    fetchData(timeType).then(()=> {})
  }, []);


  const fetchData = async  (timeTypeTemp) => {
    if (routineId) {
      try {
        isLoading.current = true;
        const WebClient = await createWebClient();

        const response = await WebClient.post("", {
          method: "getRoutineTimes",
          routineId: routineId,
          timeType: timeTypeTemp
        });


         setTotalSeconds(response.data && response.data.length > 0 ? response.data[response.data.length -1].totalSeconds : 0)
         setActive(response.data && response.data.length > 0 ? response.data[response.data.length -1].active : false)
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

  const handleDelete = async (routineId) => {

    const WebClient = await createWebClient();
  };

  const handleUpdateMainPage = async (routineId) => {

    const WebClient = await createWebClient();

  };

  const handleUpdate = (item) => {
    console.log(item.isMainPage, "item");
  };

  const handlePlay = async (item) => {


    const WebClient = await createWebClient();


  };


  const handleSave = async (item) => {

    const WebClient = await createWebClient();


  };


  const handleRadioChange = (radioName) => {
    fetchData(radioName).then(()=> {})
    setTimeType(radioName);
  };

  const subItemHandleDelete = (e) => {
    console.log("silinecek");
  };

  const choosenButton = () => {
    return (
      <View style={style.radioInputs}>
        <TouchableOpacity
          style={[style.radio, timeType === "DAILY" && style.selectedRadio]}
          onPress={() => handleRadioChange("DAILY")}
        >
          <Text style={style.name}>Bugün</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.radio, timeType === "LAST_SEVEN_DAY" && style.selectedRadio]}
          onPress={() => handleRadioChange("LAST_SEVEN_DAY")}
        >
          <Text style={style.name}> 7 Gün</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.radio, timeType === "LAST_THIRTY_DAY" && style.selectedRadio]}
          onPress={() => handleRadioChange("LAST_THIRTY_DAY")}
        >
          <Text style={style.name}> 30 Gün</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.radio, timeType === "ALL" && style.selectedRadio]}
          onPress={() => handleRadioChange("ALL")}
        >
          <Text style={style.name}>Tümü</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const detailTimesList = () => {
    return (
      <View style={[{ ...style.topViewContainer }]}>

        <ScrollView
          style={style.detailTimesContainer}
          contentContainerStyle={style.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >

          <Accordion
            activeSections={activeSections}
            sections={data}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={(sections) => {
              setActiveSections(sections.includes(undefined) ? [] : sections);
            }}
            renderAsFlatList={false}
          />
        </ScrollView>
      </View>

    );
  };

  function renderHeader(section, key, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={
          [{ ...style.listItemHeader }, { backgroundColor: COLORS.secondary }]}
      >
        <View>
          <Text style={style.listItemHeaderText}>
            {`${section.tarih} (${section.toplam_sure})`}
          </Text>
        </View>


      </Animatable.View>
    );
  };
  const subItemContent = (e) => {
    return (
      <View style={style.subItemContentContainer} key={e.item}>
        <View style={style.subItemTextContent}>
          <Text style={style.subItemText}>
            {"23.12.2023 10:15 (100:35:3)"}
          </Text>
        </View>

        {
          /*
           <View>
          <TouchableOpacity onPress={(e)=>subItemHandleDelete(e)}>
            <Icon name="trash" size={20} color={"#cc2d2d"} />
          </TouchableOpacity>

        </View>
           */
        }


      </View>

    );
  };

  function renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
      >
        <FlatList
          scrollEnabled={false}
          data={[{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }, { item: 5 }, { item: 6 }, { item: 7 }, { item: 8 }]}
          renderItem={({ item }) => subItemContent(item)}
          keyExtractor={(item, index) => `key-${index}`}
        />
      </Animatable.View>
    );
  }


  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>
        <Header goBack={true} title={"Rutin Detay Bilgisi "} navigation={props.navigation} />

        <View style={style.cardItemContainer}>
          <CardItem
            isDetail={true}
            settingsView={false}
            item={{ title: title ,totalSeconds: totalSeconds, active: active }}
            key={6}
            handleDelete={handleDelete}
            handleMainPage={handleUpdateMainPage}
            handleUpdate={handleUpdate}
            handlePlay={handlePlay}
            handleSave={handleSave}
          />
        </View>

      </View>

      {choosenButton()}
      {detailTimesList()}


    </SafeAreaView>
  );
};

export default DetailRoutine;
