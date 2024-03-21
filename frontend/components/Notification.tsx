import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const NotificationAlert = ({ message, type, isVisible, onClose }: any) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => onClose && onClose());
    }
  }, [isVisible, fadeAnim, onClose]);

  let backgroundColor;
  switch (type) {
    case 'error':
      backgroundColor = '#FF6347';
      break;
    case 'success':
      backgroundColor = '#32CD32';
      break;
    default:
      backgroundColor = '#6495ED';
  }

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor, opacity: fadeAnim }]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30, // You can adjust this to be wherever you want the alert to appear
    left: 0,
    right: 0,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    color: 'white',
    flex: 1, // Make text to take up all space except for close button
  },
  closeButton: {
    marginLeft: 10,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationAlert;