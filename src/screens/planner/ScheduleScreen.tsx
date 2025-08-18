import React, { useState } from 'react';
import { View, Button, Text, Platform, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import notifee, {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScheduleScreen = () => {


  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const scheduleDailyReminder = async () => {
    try {
      // Request permissions for iOS
      await notifee.requestPermission();

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'study-reminders',
        name: 'Study Reminders',
      });

      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(), // The selected time
        repeatFrequency: RepeatFrequency.DAILY, // Repeat every day
      };

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          title: 'Time to Study! 🚀',
          body: 'Your daily study session is starting now. Let\'s make some progress!',
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
          },
        },
        trigger,
      );

      Alert.alert(
        'Reminder Set!',
        `A daily reminder is scheduled for ${date.toLocaleTimeString()}.`,
      );
    } catch (error) {
      console.error('Error scheduling notification: ', error);
      Alert.alert('Error', 'Could not set the reminder.');
    }
  };



  return (
    <SafeAreaView style={styles.container} >

      <Text style={styles.label}>Choose your daily study time:</Text>



      <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)} >
        <Text style={styles.buttonText}>Select a time</Text>
      </TouchableOpacity>


      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}


      <Text style={[styles.label2,{marginTop:40}]}>
        Selected Time: {date.toLocaleTimeString()}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => scheduleDailyReminder} >
        <Text style={styles.buttonText}>Set Daily Reminder</Text>
      </TouchableOpacity>


    

    </SafeAreaView>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    marginTop:200,
  },

  label2: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },


  button: {
    height: 50,
    backgroundColor: '#5d6ff0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  buttonText: {

    textAlign: 'center',
    color:"white",
    fontWeight:600,

  }
});

export default ScheduleScreen;