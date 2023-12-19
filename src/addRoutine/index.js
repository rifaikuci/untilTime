import style from "./style";
import { SafeAreaView, View } from "react-native";
import { Header } from "../../components";

const AddRoutine = () => {

  return (
    <SafeAreaView>
      <View style={style.topViewContainer}>
        <Header
          title={"Rutin Ekle"} />
      </View>
    </SafeAreaView>
  );
};

export default AddRoutine;
