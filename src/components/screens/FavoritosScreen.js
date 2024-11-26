// src/screens/FavoritosScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FavoritosScreen = ({ favoritos }) => {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Favoritos</Text>
      {favoritos.length === 0 ? (
        <Text style={estilos.texto}>No tienes favoritos aún.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={estilos.item}>
              <Text style={estilos.texto}>{item.data[0].title}</Text>
            </View>
          )}
        />
      )}
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
  texto: {
    color: '#aaa',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default FavoritosScreen;
