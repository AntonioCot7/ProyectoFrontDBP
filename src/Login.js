import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { login } from './api'; // Asegúrate de que la ruta sea correcta
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      const token = response.token;
      await SecureStore.setItemAsync('token', token);

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      await SecureStore.setItemAsync('role', role);
      
      Alert.alert('Login exitoso', 'Te has logueado correctamente');
      if (role === 'ROLE_PACIENTE') {
        navigation.navigate('DashboardPaciente');
      } else if (role === 'ROLE_MEDICO') {
        navigation.navigate('DashboardMedico');
      }
    } catch (error) {
      Alert.alert('Error en el login', 'Hubo un problema al iniciar sesión. Intenta nuevamente.');
      console.error('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a SalPÉ</Text>
      <Image source={require('../img/Logo_ODAD.png')} style={styles.logo} />
      <Text style={styles.label}>Correo :</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingrese su correo"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.label}>Contraseña :</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Ingrese su contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Text style={styles.or}>O</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E6793',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  label: {
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    width: '80%',
    backgroundColor: 'white',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#1E6793',
    fontWeight: 'bold',
  },
  or: {
    color: 'white',
    marginVertical: 10,
  },
});

export default Login;
