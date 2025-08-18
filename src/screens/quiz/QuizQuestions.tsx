import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { questions } from '../../data';

const QuizQuestions = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ uiUx: 0, fullStack: 0, aiMl: 0 });

  const handleAnswer = (answerValue) => {
    setScores(prevScores => ({
      ...prevScores,
      [answerValue]: prevScores[answerValue] + 1,
    }));

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Quiz is complete, navigate to the results screen
      const result = getResult();
      navigation.replace('Result', { result });
    }
  };

  const getResult = () => {
    let maxScore = -1;
    let result = '';

    for (const key in scores) {
      if (scores[key] > maxScore) {
        maxScore = scores[key];
        result = key;
      } else if (scores[key] === maxScore) {
        result = 'fullStack'; // Tie-breaker
      }
    }
    return result;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option.value)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  questionNumber: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default QuizQuestions;