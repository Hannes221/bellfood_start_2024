import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native"
import React, { useState } from "react";

const TextInputComponent = () => {
    const [text, onChangeText] = React.useState('Ask Belly anything...');
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            >
            </TextInput>
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,

    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    submitButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 12,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TextInputComponent;