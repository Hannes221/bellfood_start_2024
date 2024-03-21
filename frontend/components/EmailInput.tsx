import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';

export default function EmailInput({ onChangeText, value }: any) {
  return (
    <>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText} 
        value={value} 
        keyboardType="email-address"
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
