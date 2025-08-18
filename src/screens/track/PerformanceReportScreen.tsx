import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import apiClient from '../../api/client';

const screenWidth = Dimensions.get('window').width;

const PerformanceReportScreen = ({ route }) => {
  const { studentId, studentName } = route.params;
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await apiClient.get(`/performance?studentId=${studentId}`);
        setPerformanceData(response.data);
      } catch (error) {
        console.error("Failed to fetch performance data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPerformance();
  }, [studentId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!performanceData || performanceData.length === 0) {
    return <Text style={styles.title}>No performance data available for {studentName}.</Text>;
  }

  // Prepare data for the line chart (growth over time)
  const lineChartData = {
    labels: performanceData[0]?.scores.map(s => s.month) || [],
    datasets: performanceData.map((subjectData, index) => ({
      data: subjectData.scores.map(s => s.score),
      color: (opacity = 1) => `rgba(${index * 80}, ${255 - index * 80}, 100, ${opacity})`,
      strokeWidth: 2,
    })),
    legend: performanceData.map(s => s.subject),
  };

  // Prepare data for the bar chart (latest scores comparison)
  const barChartData = {
    labels: performanceData.map(s => s.subject),
    datasets: [{
      data: performanceData.map(s => s.scores[s.scores.length - 1].score),
    }],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Performance Report for {studentName}</Text>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Progress 📈</Text>
        <LineChart
          data={lineChartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Latest Score by Subject 📊</Text>
        <BarChart
          data={barChartData}
          width={screenWidth - 32}
          height={220}
          yAxisLabel="%"
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero={true}
        />
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '4', strokeWidth: '2', stroke: '#007aff' },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', margin: 20 },
  chartContainer: {
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  chart: { marginVertical: 8, borderRadius: 16 },
});

export default PerformanceReportScreen;