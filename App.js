import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import Register from './src/Register';
import Logout from './src/Logout';
import Paciente from './src/paciente/Paciente';
import PacienteEdit from './src/paciente/PacienteEdit';
import PacienteConsulta from './src/paciente/PacienteConsulta';
import PacienteHistorial from './src/paciente/PacienteHistorial';
import PacienteTratamientos from './src/paciente/PacienteTratamientos';
import Medico from './src/medico/Medico';

const Stack = createStackNavigator();

const AuthStack = ({ setIsLoggedIn }) => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login">
      {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

const PacienteStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Paciente" component={Paciente} />
    <Stack.Screen name="PacienteEdit" component={PacienteEdit} />
    <Stack.Screen name="PacienteConsulta" component={PacienteConsulta} />
    <Stack.Screen name="PacienteHistorial" component={PacienteHistorial} />
    <Stack.Screen name="PacienteTratamientos" component={PacienteTratamientos} />
    <Stack.Screen name="Logout" component={Logout} />
  </Stack.Navigator>
);

const MedicoStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Medico" component={Medico} />
    <Stack.Screen name="Logout" component={Logout} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        role === 'ROLE_PACIENTE' ? (
          <PacienteStack />
        ) : (
          <MedicoStack />
        )
      ) : (
        <AuthStack setIsLoggedIn={(status, userRole) => { setIsLoggedIn(status); setRole(userRole); }} />
      )}
    </NavigationContainer>
  );
};

export default App;
