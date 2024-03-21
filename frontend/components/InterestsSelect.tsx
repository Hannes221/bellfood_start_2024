import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SelectInterests = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

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
            </View>
            <Text>What interest are we missing?</Text>
            {selectedOptions.length > 0 && (
                <Text style={styles.selectedOptionText}>
                    Your Interests: {selectedOptions.join(', ')}
                </Text>
            )}
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
