import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { roadmaps } from '../../components/RoadmapData';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RoadmapScreen = ({ route, navigation }) => {
    const { selectedDomain } = route.params;
    const [roadmap, setRoadmap] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: `${selectedDomain} Roadmap` });
        setRoadmap(roadmaps[selectedDomain] || []);
    }, [selectedDomain]);

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={roadmap}
                keyExtractor={(item) => item.id}
                renderItem={({ item,index }) => (
                    <View>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.title}</Text>

                    </View>

                    {index < roadmap.length - 1 && (
                    <MaterialCommunityIcons
                        name="arrow-down"
                        size={34}
                        color="#5d6ff0"
                        style={styles.icon}
                    />
                    )}

                    </View>

                )}
            />

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Schedule') }}>
                <Text style={styles.buttonText}>Set Study Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Progress') }}>
                <Text style={styles.buttonText}>View My Progress</Text>
            </TouchableOpacity>




        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginBottom: 90,
    },
    item: {
        padding: 15,
        
    },
    itemText: {
        fontSize: 18
    },
    button: {
        height: 50,
        backgroundColor: '#5d6ff0',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 600,

    },
    icon:{
        marginLeft:80,
    },
});

export default RoadmapScreen;