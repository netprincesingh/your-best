import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator.js";
import QuizQuestions from "../screens/quiz/QuizQuestions.tsx";
import ResultScreen from "../screens/quiz/ResultScreen.tsx";

const Stack = createStackNavigator();

export default function MainStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name ="HomeTabs" component={AppNavigator}/>
            <Stack.Screen name = "QuizQuestions" component={QuizQuestions}/>
            <Stack.Screen name ="Result" component={ResultScreen} />
            

        </Stack.Navigator>
    );
}

