import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BienvenidaScreen = ({ navigation }) => {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Bienvenido a AppNasa</Text>
      <Text style={estilos.descripcion}>
        Descubre informacion importante, entretenida y exclusiva acerca del universo proporcionada por la NASA.
      </Text>
      
      <Image
        source={require('../../../assets/cohete.png')}
        style={estilos.imagenMediana}
      />
    
      <TouchableOpacity
        style={estilos.boton}
        onPress={() => navigation.navigate('Explorar')} 
      >
        <Text style={estilos.textoBoton}>Explorar</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  descripcion: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
    lineHeight: 24,
  },
  imagenMediana: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  boton: {
    backgroundColor: '#0057e7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BienvenidaScreen;
