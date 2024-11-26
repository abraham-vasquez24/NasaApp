import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';

const AgujerosNegrosScreen = () => {
  const [agujerosNegros, setAgujerosNegros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const obtenerAgujerosNegros = async () => {
      try {
        const response = await fetch(
          'https://images-api.nasa.gov/search?q=black%20hole'
        );
        const data = await response.json();
        const items = data.collection.items.slice(0, 10).map((item, index) => ({
          id: index.toString(),
          nombre: item.data[0].title,
          descripcion: item.data[0].description || 'Sin descripción disponible.',
          imagen: item.links ? item.links[0].href : null,
        }));
        setAgujerosNegros(items);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    obtenerAgujerosNegros();
  }, []);

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Agujeros Negros</Text>
      <FlatList
        data={agujerosNegros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
          >
            <View style={estilos.item}>
              <Text style={estilos.texto}>{item.nombre}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {selectedItem && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={estilos.modal}>
            <Text style={estilos.modalTitulo}>{selectedItem.nombre}</Text>
            <Image
              source={{ uri: selectedItem.imagen }}
              style={estilos.imagen}
            />
            <Text style={estilos.modalDescripcion}>
              {selectedItem.descripcion}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={estilos.cerrarBoton}
            >
              <Text style={estilos.cerrarTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    borderRadius: 10,
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  imagen: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  modalDescripcion: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  cerrarBoton: {
    backgroundColor: '#ff3333',
    padding: 10,
    borderRadius: 5,
  },
  cerrarTexto: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AgujerosNegrosScreen;
