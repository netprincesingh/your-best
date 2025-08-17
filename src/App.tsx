import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Quiz from "./screens/Mock.tsx";
import Planner from "./screens/Planner.tsx";
import Mock from "./screens/Mock.tsx";
import Track from "./screens/Track.tsx";


const Tab = createBottomTabNavigator();


const App = ()=>{
    return(
        <NavigationContainer>
            <SafeAreaProvider>
                <Tab.Navigator>

                    <Tab.Screen name="Quiz" component={Quiz} options={{title:"List"}} />
                    
                </Tab.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );

}

export default App;


