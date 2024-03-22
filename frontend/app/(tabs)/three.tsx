import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';

// Mock user interests
const userInterests = ['Food', 'Technology', 'Music', 'Art', 'Sports', 'Health', 'Nature'];

// Mock data for example workers
const workers = [
  { id: '1', name: 'Alice', interests: ['Food', 'Languages', 'Travel'] },
  { id: '2', name: 'Bob', interests: ['Technology', 'Music', 'Art'] },
  { id: '3', name: 'Charlie', interests: ['Sports', 'Origin', 'Health'] },
  { id: '4', name: 'Diana', interests: ['Freetime', 'Culture', 'Nature'] },
  { id: '5', name: 'Evan', interests: ['Food', 'Music', 'Art'] },
  { id: '6', name: 'Fiona', interests: ['Languages', 'Travel', 'Technology'] },
  { id: '7', name: 'George', interests: ['Sports', 'Health', 'Food'] },
];

// Function to find common interests
const findCommonInterests = (workerInterests: any) => {
  return workerInterests.filter(interest => userInterests.includes(interest)).length >= 3;
};

export default function TabThreeScreen() {
  // Filter matches based on common interests
  const matches = workers.filter(worker => findCommonInterests(worker.interests));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your matches:</Text>
      {/* Map over the matches and display them */}
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.matchContainer}>
            <Text style={styles.matchName}>{item.name}</Text>
            <Text style={styles.matchInterests}>{item.interests.join(', ')}</Text>
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
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchInterests: {
    fontSize: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});