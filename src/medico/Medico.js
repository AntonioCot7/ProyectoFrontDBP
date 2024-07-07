import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { getMedicoInfo } from '../api'; // Asegúrate de que la ruta sea correcta
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const Medico = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
          const data = await getMedicoInfo();
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('Error', 'Error fetching user info');
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    navigation.navigate('MedicoEdit'); // Asegúrate de tener esta ruta configurada en tu navegación
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>¡Bienvenido de vuelta! 👨‍⚕️</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={require('../../img/MedicoImagen.png')} style={styles.mainImage} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.userInfo}>
            <Image source={require('../../img/UserIcon.png')} style={styles.userIcon} />
            <View style={styles.userDetails}>
              <Text><Text style={styles.bold}>Nombre:</Text> {userInfo?.nombre}</Text>
              <Text><Text style={styles.bold}>Apellido:</Text> {userInfo?.apellido}</Text>
              <Text><Text style={styles.bold}>Email:</Text> {userInfo?.email}</Text>
              <Text><Text style={styles.bold}>Teléfono:</Text> {userInfo?.telefono}</Text>
              <Text><Text style={styles.bold}>Edad:</Text> {userInfo?.edad}</Text>
              <Text><Text style={styles.bold}>Especialidad:</Text> {userInfo?.especialidad}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Image source={require('../../img/Pencil.png')} style={styles.editIcon} />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#1E6793',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  userIcon: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  userDetails: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E6793',
    padding: 10,
    borderRadius: 5,
  },
  editIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Medico;
