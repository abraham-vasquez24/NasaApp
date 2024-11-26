// src/screens/InicioScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const InicioScreen = ({ navigation, favoritos, setFavoritos }) => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  const realizarBusqueda = async () => {
    try {
      const respuesta = await axios.get(
        `https://images-api.nasa.gov/search?q=${busqueda}`
      );
      setResultados(respuesta.data.collection.items);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const agregarAFavoritos = (item) => {
    setFavoritos((prev) => [...prev, item]);
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Explora el Universo</Text>
      <TextInput
        style={estilos.cajaTexto}
        placeholder="Busca información..."
        placeholderTextColor="#888"
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <TouchableOpacity style={estilos.boton} onPress={realizarBusqueda}>
        <Text style={estilos.textoBoton}>Buscar</Text>
      </TouchableOpacity>
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.data[0].nasa_id}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <Text style={estilos.texto}>{item.data[0].title}</Text>
            <TouchableOpacity
              style={estilos.botonFavoritos}
              onPress={() => agregarAFavoritos(item)}
            >
              <Text style={estilos.textoBoton}>Agregar a Favoritos</Text>
            </TouchableOpacity>
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
    marginBottom: 20,
  },
  cajaTexto: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#1a73e8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
  },
  botonFavoritos: {
    marginTop: 10,
    backgroundColor: '#e53935',
    padding: 10,
    borderRadius: 5,
  },
});

export default InicioScreen;
