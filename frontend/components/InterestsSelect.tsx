import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../assets/static/translations';

interface UserBase {
  email: string;
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
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

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

  useEffect(() => {
    AsyncStorage.getItem('@MySuperStore:language').then((language) => {
      setSelectedLanguage(language!);
    });
  });

  async function submitInterests(selectedOptions: string[]) {
    const email = await AsyncStorage.getItem('@MySuperStore:key');
    const body = {
      email: email,
      food: selectedOptions.includes('Food'),
      languages: selectedOptions.includes('Languages'),
      travel: selectedOptions.includes('Travel'),
      technology: selectedOptions.includes('Technology'),
      music: selectedOptions.includes('Music'),
      art: selectedOptions.includes('Art'),
      sports: selectedOptions.includes('Sports'),
      origin: selectedOptions.includes('Origin'),
      health: selectedOptions.includes('Health'),
      freetime: selectedOptions.includes('Freetime'),
      culture: selectedOptions.includes('Culture'),
      nature: selectedOptions.includes('Nature'),
    };

    try {
      const response = await axios.post('http://localhost:8000/user', body);
      console.log('Interests submitted:', response.data);
      setSelectedOptions([]);
    } catch (error) {
      console.error('Error submitting interests:', error);
    }
  }

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
        <TouchableOpacity onPress={() => submitInterests(selectedOptions)}>
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
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default SelectInterests;
