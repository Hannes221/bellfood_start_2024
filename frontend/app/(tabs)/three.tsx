import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Card } from 'react-native-elements';

export default function TabThreeScreen() {
  // Define a type for a match
  interface Match {
    id: string;
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
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    AsyncStorage.getItem('@MySuperStore:key').then((value) => {
      axios
        .post('http://localhost:8000/matching', {
          email: value,
        })
        .then((response) => {
          setMatches(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item: Match) => item.id.toString()}
        renderItem={({ item }: { item: Match }) => (
          <View style={styles.item}>
            <Card>
              <Card.Title>{item.email}</Card.Title>
              <Card.Divider />
              {/* List down the interests here */}
            </Card>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 'auto',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  matchContainer: {
    padding: 20,
    alignItems: 'center',
  },
  item: {
    flex: 1,
    margin: 10,
    maxWidth: 'auto',
  },
});
