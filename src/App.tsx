import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MainStack from "./navigation/MainStack.js";



const App = () => {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <MainStack/>
            </SafeAreaProvider>
        </NavigationContainer>
    );

}

export default App;


