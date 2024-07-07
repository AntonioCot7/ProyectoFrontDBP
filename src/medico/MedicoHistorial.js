import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Picker, Alert } from 'react-native';
import { getPacientes, addHistorial, getHistorial } from '../services/api'; // Asegúrate de que las rutas sean correctas
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const MedicoHistorial = () => {
    const [historiales, setHistoriales] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState('');
    const [historialInfo, setHistorialInfo] = useState({
        fecha: new Date(),
        descripcion: ''
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const token = await SecureStore.getItemAsync('token');
                if (token) {
                    const data = await getPacientes(token);
                    setPacientes(data);
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
                Alert.alert('Error', 'Error fetching patients');
            }
        };

        fetchPacientes();
    }, []);

    useEffect(() => {
        if (selectedPaciente) {
            const fetchHistoriales = async () => {
                try {
                    const token = await SecureStore.getItemAsync('token');
                    const historialesData = await getHistorial(parseInt(selectedPaciente), token);
                    setHistoriales(historialesData);
                } catch (error) {
                    console.error('Error fetching historiales:', error);
                    Alert.alert('Error', 'Error fetching historiales');
                }
            };

            fetchHistoriales();
        }
    }, [selectedPaciente]);

    const handleInputChange = (name, value) => {
        setHistorialInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || historialInfo.fecha;
        setShowDatePicker(false);
        handleInputChange('fecha', currentDate);
    };

    const handleSubmit = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const utcDate = new Date(historialInfo.fecha.getTime() - historialInfo.fecha.getTimezoneOffset() * 60000).toISOString();
            const historialDTO = {
                paciente_id: parseInt(selectedPaciente),
                fecha: utcDate.replace('Z', ''),
                descripcion: historialInfo.descripcion
            };
            await addHistorial(historialDTO, token);
            Alert.alert('Éxito', 'Historial añadido correctamente');
            const historialesData = await getHistorial(parseInt(selectedPaciente), token);
            setHistoriales(historialesData);
        } catch (error) {
            console.error('Error adding historial:', error);
            Alert.alert('Error', 'Error añadiendo historial');
        }
    };

    const handleEdit = (id) => {
        navigation.navigate('MedicoHistorialEdit', { id });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Añadir Historial</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Seleccionar Paciente:</Text>
                <Picker
                    selectedValue={selectedPaciente}
                    onValueChange={(itemValue) => setSelectedPaciente(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Seleccione un paciente" value="" />
                    {pacientes.map((paciente) => (
                        <Picker.Item key={paciente.id} label={`${paciente.nombre} ${paciente.apellido}`} value={paciente.id} />
                    ))}
                </Picker>
                <Text style={styles.label}>Fecha de la consulta:</Text>
                <Button onPress={() => setShowDatePicker(true)} title={format(historialInfo.fecha, 'dd MMMM, yyyy h:mm a', { locale: es })} />
                {showDatePicker && (
                    <DateTimePicker
                        value={historialInfo.fecha}
                        mode="datetime"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <Text style={styles.label}>Descripción:</Text>
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    onChangeText={(value) => handleInputChange('descripcion', value)}
                    value={historialInfo.descripcion}
                />
                <Button title="Confirmar" onPress={handleSubmit} />
            </View>
            <Text style={styles.header}>Historial Médico</Text>
            {historiales.length > 0 ? (
                historiales.map((historial) => (
                    <View key={historial.id} style={styles.historialItem}>
                        <Text style={styles.historialDate}>Fecha: {format(new Date(historial.fecha), 'dd MMMM, yyyy h:mm a', { locale: es })}</Text>
                        <Text><Text style={styles.bold}>Descripción:</Text> {historial.descripcion}</Text>
                        <Button title="Editar" onPress={() => handleEdit(historial.id)} />
                    </View>
                ))
            ) : (
                <Text>No hay historiales disponibles.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7FFF7',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2D6A4F',
        textAlign: 'center',
    },
    form: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#2D6A4F',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        borderColor: '#95D5B2',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
    },
    historialItem: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#E5E5E5',
    },
    historialDate: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default MedicoHistorial;
