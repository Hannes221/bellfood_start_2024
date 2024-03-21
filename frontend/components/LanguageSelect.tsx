import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SelectLanguage = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        '🇪🇸 Español',
        '🇩🇪 Deutsch',
        '🏴󠁧󠁢󠁥󠁮󠁧󠁿 English',
        '🇮🇹 Italiano',
        '🇫🇷 Français',
        '🇭🇺 Magyar',
        '🇵🇱 Polski',
        '🇷🇺 Русский',
        '🇨🇳 中文',
    ];

    const handleOptionSelect = (option: any) => {
        setSelectedOption(option);
    };

    return (
        <>
            <Text style={styles.title}>🗣️</Text>
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedOption === option && styles.selectedOptionButton,
                        ]}
                        onPress={() => handleOptionSelect(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {selectedOption !== null && (
                <Text style={styles.selectedOptionText}>
                    Selected Option: {selectedOption}
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

export default SelectLanguage;
