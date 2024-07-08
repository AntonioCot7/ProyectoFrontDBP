import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMedicos, patchMedicoByPacienteId } from '../api'; 
import * as SecureStore from 'expo-secure-store';

const ListaDeMedicos = () => {
    const [medicos, setMedicos] = useState([]);
    const [page, setPage] = useState(1);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const token = await SecureStore.getItemAsync('token');
                const medicosData = await getMedicos(token, page);
                setMedicos((prevMedicos) => [...prevMedicos, ...medicosData]);
            } catch (error) {
                console.error('The list of doctors could not be retrieved.', error);
                Alert.alert('Error', 'The list of doctors could not be retrieved.');
            }
        };

        fetchMedicos();
    }, [page]);

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleAddMedico = async (medicoId) => {
        try {
            const token = await SecureStore.getItemAsync('token');
            await patchMedicoByPacienteId(medicoId, token);
            Alert.alert('Success', 'El médico ha sido asignado exitosamente al paciente.');
        } catch (error) {
            console.error('A doctor could not be assigned to the patient.', error);
            Alert.alert('Error', 'No se pudo asignar el médico al paciente.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Lista de Medicos</Text>
            </View>
            <View style={styles.listContainer}>
                {medicos.length > 0 ? (
                    medicos.map((medico) => (
                        <View key={medico.id} style={styles.medicoCard}>
                            <Image source={require('../assets/ListaMedicos.png')} style={styles.image} />
                            <View style={styles.infoContainer}>
                                <View style={styles.info}>
                                    <Text style={styles.title}>Medico:</Text>
                                    <Text>● <Text style={styles.boldText}>{medico.nombre} {medico.apellido}</Text></Text>
                                    <Text>● {medico.email}</Text>
                                    <Text>● {medico.telefono}</Text>
                                    <Text>● {medico.edad} años</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text>● <Text style={styles.boldText}>Sexo:</Text> {medico.sexo}</Text>
                                    <Text>● <Text style={styles.boldText}>Especialidad:</Text> {medico.especialidad}</Text>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.assignButton}
                                    onPress={() => handleAddMedico(medico.id)}
                                >
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.viewRouteButton}
                                    onPress={() => navigation.navigate('MedicoRuta', { medicoId: medico.id })}
                                >
                                    <Text style={styles.buttonText}>Ver Ruta</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noMedicosText}>No hay médicos disponibles.</Text>
                )}
                <TouchableOpacity onPress={loadMore} style={styles.loadMoreButton}>
                    <Text style={styles.buttonText}>Cargar más...</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FFF7',
    },
    header: {
        backgroundColor: '#2D6A4F',
        paddingVertical: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 20,
    },
    medicoCard: {
        backgroundColor: '#DADADA',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    info: {
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    assignButton: {
        backgroundColor: '#2D6A4F',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    viewRouteButton: {
        backgroundColor: '#1D4E89',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    loadMoreButton: {
        backgroundColor: '#2D6A4F',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    noMedicosText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
    },
});

export default ListaDeMedicos;
