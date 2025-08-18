import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DomainSelectionScreen = ({ navigation }) => {

    const handleSelectDomain = (domain) => {
        navigation.navigate('Roadmap', { selectedDomain: domain });
    };

    return (
        <SafeAreaView style={styles.container}>
        

            <Text style={styles.title}>Select Your Domain</Text>

            <TouchableOpacity style={styles.button} onPress={() => handleSelectDomain('AI/ML')}>
                <Text style={styles.buttonText}>AI/ML</Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.button} onPress={() => handleSelectDomain('Full Stack')}>
                <Text style={styles.buttonText}>Full Stack</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=> handleSelectDomain('UI/UX')}>
                <Text style={styles.buttonText}>UI/UX</Text>
            </TouchableOpacity>




           

        
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign:'center',
        marginTop:270,
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%'
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

    }
});

export default DomainSelectionScreen;