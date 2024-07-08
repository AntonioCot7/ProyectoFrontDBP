import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, BackHandler, Image, TouchableOpacity } from 'react-native';
import { updateMedicoInfo, getMedicoInfo, deleteMedico } from '../api'; // Ensure the path is correct
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import UserIcon from '../../img/UserIcon.png'; // Ensure this image is in the correct folder

const MedicoEdit = () => {
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    edad: '',
  });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
          const data = await getMedicoInfo(token);
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('Error', 'Error fetching user info');
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (field, value) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        await updateMedicoInfo(userInfo.id, userInfo, token);
        Alert.alert('Perfil actualizado', 'Tu perfil ha sido actualizado exitosamente');
        navigation.goBack(); // Go back to the previous screen
      }
    } catch (error) {
      console.error('Error actualizando el perfil:', error);
      Alert.alert('Error', 'Error actualizando el perfil');
    }
  };

  const handleDelete = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        await deleteMedico(userInfo.id, token);
        Alert.alert(
          'Perfil eliminado',
          'Tu perfil ha sido eliminado exitosamente',
          [
            {
              text: 'OK',
              onPress: () => {
                setTimeout(() => {
                  BackHandler.exitApp(); // Close the app after 5 seconds
                }, 5000);
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error eliminando el perfil:', error);
      Alert.alert('Error', 'Error eliminando el perfil');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={userInfo.nombre}
        onChangeText={(value) => handleInputChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={userInfo.apellido}
        onChangeText={(value) => handleInputChange('apellido', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Especialidad"
        value={userInfo.especialidad}
        onChangeText={(value) => handleInputChange('especialidad', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={userInfo.telefono}
        onChangeText={(value) => handleInputChange('telefono', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={userInfo.edad}
        onChangeText={(value) => handleInputChange('edad', value)}
      />
      <Button title="Actualizar" onPress={handleUpdate} />
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
      <View style={styles.preview}>
        <Image source={UserIcon} style={styles.image} />
        <Text style={styles.infoText}><Text style={styles.bold}>Nombre:</Text> {userInfo.nombre}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Apellido:</Text> {userInfo.apellido}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Especialidad:</Text> {userInfo.especialidad}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Teléfono:</Text> {userInfo.telefono}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Edad:</Text> {userInfo.edad}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7FFF7',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D6A4F',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#95D5B2',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  preview: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Helvetica',
  },
  bold: {
    fontWeight: 'bold',
    color: '#555',
  },
});

export default MedicoEdit;