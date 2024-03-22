import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrettyChatWindow } from 'react-chat-engine-pretty';

import axios from 'axios';
import { useEffect, useState } from 'react';

const TabTwoScreen = () => {
  const onSubmit = () => {
    AsyncStorage.getItem('@MySuperStore:key').then((value) => {
      axios.post('http://localhost:8000/authenticate', {
        username: value,
      });
    });
  };

  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    AsyncStorage.getItem('@MySuperStore:key').then((value) => {
      setEmail(value!);
    });
    onSubmit();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matches</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <PrettyChatWindow
        projectId={process.env.REACT_APP_CHATENGINE_PROJECT_ID!}
        username={email}
        secret={process.env.REACT_APP_CHATENGINE_PRIVATE_KEY!}
      />
    </View>
  );
};

export default TabTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
