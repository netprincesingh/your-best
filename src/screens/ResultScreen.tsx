import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ResultScreen = ({ navigation }) => {
  const route = useRoute();
  const { result } = route.params;

  const getResultTitle = () => {
    switch (result) {
      case 'uiUx':
        return 'UI/UX Designer';
      case 'fullStack':
        return 'Full Stack Developer';
      case 'aiMl':
        return 'AI/ML Engineer';
      default:
        return 'Full Stack Developer'; // Default for tie
    }
  };

  const getResultDescription = () => {
    switch (result) {
      case 'uiUx':
        return "You have a knack for user-centric design and aesthetics. Your ideal path is crafting beautiful and intuitive user experiences.";
      case 'fullStack':
        return "You're a versatile problem-solver who enjoys working on both the front-end and back-end of applications. You love building a complete system from scratch.";
      case 'aiMl':
        return "You're fascinated by data, algorithms, and logic. Your skills are best suited for building intelligent systems that can learn and predict.";
      default:
        return "You're a versatile problem-solver who enjoys working on both the front-end and back-end of applications. You love building a complete system from scratch.";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Career Path Is:</Text>
      <Text style={styles.resultTitle}>{getResultTitle()}</Text>
      <Text style={styles.description}>{getResultDescription()}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.retryButtonText}>Start Over</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF', // A nice blue for the result
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#555',
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultScreen;