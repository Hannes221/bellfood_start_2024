import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { useEffect } from 'react';

const TabTwoScreen = (props: any) => {
  const onSubmit = () => {
    const email = AsyncStorage.getItem('@MySuperStore:key').then((value) => {
      axios.post("http://localhost:8000/chat", { username: email }
      )
      props.onAuth({ username: email, secret: value })
    });
    
  }

  useEffect(() => {
    onSubmit();
  }, )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matches</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

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
