import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const FadeInWrapper = ({ children }: any) => {
  // Initialize opacity to 0 for the fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Initialize scale to 0.9 for the dynamic scaling effect
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Simultaneous animation for both opacity and scale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade to opaque
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale to original size
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.fadeIn,
        {
          opacity: fadeAnim, // Bind opacity to animated value
          transform: [{ scale: scaleAnim }], // Bind scale to animated value
        },
      ]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fadeIn: {
    flex: 1, // Take up all available space
    // Style your container as needed
  },
});

export default FadeInWrapper;