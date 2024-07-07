import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const SensorScreen = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [lastAlertTime, setLastAlertTime] = useState(0);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
        const currentTime = Date.now();
        if (
          (Math.abs(accelerometerData.x) > 1.5 || 
          Math.abs(accelerometerData.y) > 1.5 || 
          Math.abs(accelerometerData.z) > 1.5) &&
          currentTime - lastAlertTime > 5000 // 5 segundos
        ) {
          setLastAlertTime(currentTime);
          Alert.alert('Movimiento detectado', 'Se ha detectado un movimiento brusco.');
        }
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Datos del Acelerómetro:</Text>
      <Text style={styles.data}>x: {x.toFixed(2)} y: {y.toFixed(2)} z: {z.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default SensorScreen;
