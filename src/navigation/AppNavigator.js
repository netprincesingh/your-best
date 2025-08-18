import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Quiz from "../screens/quiz/Quiz.tsx";
import Planner from "../screens/planner/Planner.tsx";
import Mock from "../screens/Mock.tsx";
import Track from "../screens/Track.tsx";


const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    return (
        
            
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Quiz') {
                                iconName = focused ? 'comment-question' : 'comment-question-outline';
                            }
                            else if (route.name == 'Planner') {
                                iconName = focused ? 'calendar-month' : 'calendar-month-outline';
                            }
                            else if (route.name === 'Mock') {
                                iconName = focused ? 'account-group' : 'account-group-outline';
                            }
                            else if (route.name === 'Track') {
                                iconName = focused ? 'timeline-text-outline' : 'timeline-text-outline';
                            }

                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#5d6ff0',
                        tabBarInactiveTintColor: 'grey',
                        headerShown: false,

                        tabBarStyle: {
                            position: 'absolute',
                            height: 70,
                            paddingBottom: 10,
                            paddingTop: 10,
                            backgroundColor: 'white',
                            borderTopWidth: 0,
                            elevation: 10,
                            shadowOpacity: 0.1,
                            shadowRadius: 10,
                        },
                    })}
                >

                    <Tab.Screen name="Quiz" component={Quiz} options={{ title: "Quiz" }} />
                    <Tab.Screen name="Planner" component={Planner} options={{ title: "Planner" }} />
                    <Tab.Screen name="Mock" component={Mock} options={{ title: "Mock" }} />
                    <Tab.Screen name="Track" component={Track} options={{ title: "Track" }} />

                </Tab.Navigator>
            
        
    );

}

export default AppNavigator;


