import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface UserBase {
    food: boolean;
    languages: boolean;
    travel: boolean;
    technology: boolean;
    music: boolean;
    art: boolean;
    sports: boolean;
    origin: boolean;
    health: boolean;
    freetime: boolean;
    culture: boolean;
    nature: boolean;
}


const SelectInterests = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = [
        'Food',
        'Languages',
        'Travel',
        'Technology',
        'Music',
        'Art',
        'Sports',
        'Origin',
        'Health',
        'Freetime',
        'Culture',
        'Nature',
    ];

    const submitInterests = async (selectedOptions: string[]) => {
        try {
            const response = await axios.post('http://localhost:8000/interest', {
                interests: selectedOptions,
            });
            console.log('Interests submitted:', response.data);
            setSelectedOptions([]);
        } catch (error) {
            console.error('Error submitting interests:', error);
        }
    };    


    const handleOptionSelect = (option: any) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <>
            <Text style={styles.title}>Select your interests</Text>
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedOptions.includes(option) && styles.selectedOptionButton,
                        ]}
                        onPress={() => handleOptionSelect(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    onPress={() => submitInterests(selectedOptions)}
                >
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
            {/**
            <Text>What interest are we missing?</Text>
            {selectedOptions.length > 0 && (
                <View>
                    <Text style={styles.selectedOptionText}>
                        Your Interests: {selectedOptions.join(', ')}
                    </Text>
                </View>
            )}
             */}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '80%',
    },
    optionButton: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        width: '45%',
        alignItems: 'center',
    },
    selectedOptionButton: {
        backgroundColor: '#007AFF',
    },
    optionText: {
        color: '#333',
        fontSize: 16,
    },
    selectedOptionText: {
        fontSize: 18,
        marginTop: 20,
    },
});

export default SelectInterests;