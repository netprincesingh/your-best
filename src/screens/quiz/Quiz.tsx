import React, { TouchableOpacity } from "react-native";
import { View,Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";


const Quiz = ()=>{

    const navigation = useNavigation();


    return(
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.headText}>Find The Best Version of You</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('QuizQuestions')}}>
                <Text style={styles.buttonText}> Start Quiz </Text> 
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
container:{
    flex:1,
    padding:10,
},
headText:{
    textAlign:"center",
    paddingTop:250,
    paddingBottom:20,
    fontWeight:'bold',
    fontSize:25,

},
button:{
    height: 50,
    backgroundColor: '#5d6ff0',
    borderRadius: 8,
    padding: 15,
},
buttonText:{
    color: 'white',
    textAlign: 'center',
    fontWeight: 600,
}
});
export default Quiz;