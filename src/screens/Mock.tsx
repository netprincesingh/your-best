import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import apiClient from '../api/client'; // Make sure this path is correct

const Mock = () => {
  const candidateId = 2;

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        // --- NEW FETCH LOGIC ---
        // 1. Fetch the candidate details and their interviews in parallel.
        const [candidateResponse, interviewsResponse] = await Promise.all([
          apiClient.get(`/candidates/${candidateId}`),
          apiClient.get(`/interviews?candidateId=${candidateId}`)
        ]);

        // 2. Manually combine the data.
        const combinedData = {
          ...candidateResponse.data, // Takes id, name, appliedFor
          interviews: interviewsResponse.data // Adds the interviews array
        };
        
        console.log("Combined Data:", JSON.stringify(combinedData, null, 2));
        
        setCandidate(combinedData);
      } catch (e) {
        setError('Failed to fetch data. Ensure server and ngrok are running.');
        console.error("API Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, []);

  // The rest of your code remains exactly the same...
  const renderScores = (scores) => {
    return Object.entries(scores).map(([skill, score], index) => (
      <View key={index} style={styles.scoreItem}>
        <Text style={styles.skillText}>{skill.replace(/([A-Z])/g, ' $1')}: </Text>
        <Text style={styles.scoreText}>{score} / 10</Text>
      </View>
    ));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Interview Feedback...</Text>
      </View>
    );
  }

  if (error || !candidate) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>⚠️ {error || "Could not load candidate data."}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Interview Feedback 📋</Text>
      
      <ScrollView contentContainerStyle={styles.list}>
        <View style={styles.candidateCard}>
          <Text style={styles.candidateName}>{candidate.name}</Text>
          <Text style={styles.roleText}>Applied for: {candidate.appliedFor}</Text>
          
          {candidate.interviews && candidate.interviews.map(interview => (
            <View key={interview.id} style={styles.interviewContainer}>
              <View style={styles.interviewHeader}>
                <Text style={styles.interviewRound}>{interview.round}</Text>
                <Text style={styles.interviewDate}>{interview.date}</Text>
              </View>
              <Text style={styles.interviewerText}>with {interview.interviewer}</Text>
              <Text style={styles.feedbackText}>"{interview.feedback}"</Text>
              <View style={styles.scoresGrid}>
                {renderScores(interview.scores)}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#1c1e21' },
  list: { paddingHorizontal: 15, paddingBottom: 20 },
  candidateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  candidateName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  roleText: { fontSize: 16, color: '#657786', marginBottom: 15, fontStyle: 'italic' },
  interviewContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
    paddingTop: 15,
    marginTop: 15,
  },
  interviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  interviewRound: { fontSize: 18, fontWeight: '600', color: '#14171a' },
  interviewDate: { fontSize: 14, color: '#657786' },
  interviewerText: { fontSize: 15, color: '#657786', marginBottom: 10, marginTop: 2 },
  feedbackText: { fontSize: 15, color: '#333', lineHeight: 22, marginBottom: 15, fontStyle: 'italic' },
  scoresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f8fa',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    width: '48%',
  },
  skillText: { textTransform: 'capitalize', color: '#14171a', fontSize: 14, flex: 1 },
  scoreText: { fontWeight: 'bold', color: '#1DA1F2', fontSize: 14 },
  errorText: { color: '#e74c3c', fontSize: 16, textAlign: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
});

export default Mock;