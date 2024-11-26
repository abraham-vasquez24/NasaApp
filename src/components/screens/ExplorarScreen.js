import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const ExplorarScreen = () => {
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Llamada a la API de la NASA para obtener las imágenes del día
    const obtenerImagenes = async () => {
      try {
        const response = await fetch(
          'https://api.nasa.gov/planetary/apod?api_key=FaaYiuziHgrsiR8IIrEKrrB6TxFuLJwb1pzzXHDU&count=10'
        );
        const data = await response.json();
        setImagenes(data);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener las imágenes', error);
        setCargando(false);
      }
    };

    obtenerImagenes();
  }, []);

  if (cargando) {
    return (
      <View style={estilos.cargando}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Imágenes del Día</Text>
      <FlatList
        data={imagenes}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={estilos.imagenContainer}>
            <Image source={{ uri: item.url }} style={estilos.imagen} />
            <Text style={estilos.descripcion}>{item.explanation}</Text>
          </View>
        )}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  titulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  imagenContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagen: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  descripcion: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

export default ExplorarScreen;
