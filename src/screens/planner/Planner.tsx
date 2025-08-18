import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DomainSelectionScreen from './DomainSelectionScreen.tsx';
import RoadmapScreen from './RoadmapScreen.tsx';
import ScheduleScreen from './ScheduleScreen.tsx';
import ProgressScreen from './ProgressScreen.tsx';

const Stack = createStackNavigator();

function Planner() {
  return (
    
      <Stack.Navigator initialRouteName="DomainSelection" screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="DomainSelection"
          component={DomainSelectionScreen}
          options={{ title: 'Choose Your Path' }}
        />
        <Stack.Screen name="Roadmap" component={RoadmapScreen} />
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{ title: 'Set Your Schedule' }}
        />
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ title: 'Your Progress' }}
        />
      </Stack.Navigator>
    
  );
}

export default Planner;