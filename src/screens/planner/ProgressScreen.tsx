import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProgressScreen = () => {
  const [scores, setScores] = useState([]);
  const [testName, setTestName] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@scores');
      if (jsonValue != null) {
        setScores(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load scores.');
    }
  };

  const saveScore = async () => {
    if (!testName.trim() || !score.trim()) return;
    const newScore = {
      id: Date.now().toString(),
      name: testName,
      value: score,
    };
    const updatedScores = [...scores, newScore];
    setScores(updatedScores);
    try {
      const jsonValue = JSON.stringify(updatedScores);
      await AsyncStorage.setItem('@scores', jsonValue);
      setTestName('');
      setScore('');
      Keyboard.dismiss();
    } catch (e) {
      console.error('Failed to save score.');
    }
  };

  
  const deleteScore = async (id) => {
    const updatedScores = scores.filter((item) => item.id !== id);
    setScores(updatedScores);
    try {
      const jsonValue = JSON.stringify(updatedScores);
      await AsyncStorage.setItem('@scores', jsonValue);
    } catch (e) {
      console.error('Failed to delete score.');
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Score",
      "Are you sure you want to delete this score?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteScore(id)
        }
      ]
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Track Your Test Scores</Text>

      <TextInput
        style={styles.input}
        placeholder="Test Name (e.g., Python Quiz 1)"
        value={testName}
        onChangeText={setTestName}
      />

      <TextInput
        style={styles.input}
        placeholder="Score (e.g., 85%)"
        value={score}
        onChangeText={setScore}
      />

      
      <TouchableOpacity style={styles.button} onPress={saveScore}>
        <Text style={styles.buttonText}>Add Score</Text>
      </TouchableOpacity>

      <FlatList
        data={scores}
        keyExtractor={(item) => item.id}
        
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.scoreText}>
              {item.name}: {item.value}
            </Text>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <Icon name="delete-outline" size={24} color="#c0392b" />
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  scoreItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginTop: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
  },
  button: {
    height: 50,
    backgroundColor: '#5d6ff0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ProgressScreen;