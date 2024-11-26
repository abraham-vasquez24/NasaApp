import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image, Button } from 'react-native';
import axios from 'axios';

const PlanetasScreen = () => {
  const [planetas, setPlanetas] = useState([]);
  const [planetaSeleccionado, setPlanetaSeleccionado] = useState(null);

  // Mapeo de imágenes para cada planeta
  const imagenesPlanetas = {
    Mercurio: 'https://png.pngtree.com/thumb_back/fh260/background/20230714/pngtree-nasa-s-3d-rendering-of-intricately-detailed-mercury-planet-on-black-image_3882334.jpg',
    Venus: 'https://e0.pxfuel.com/wallpapers/259/849/desktop-wallpaper-venus-planet-venus.jpg',
    Tierra: 'https://content.nationalgeographic.com.es/medio/2022/08/01/el-planeta-tierra_103f061c_800x800.jpg',
    Marte: 'https://media.istockphoto.com/id/184971501/es/foto/3-d-model-of-mars.jpg?s=612x612&w=0&k=20&c=7WkZezvOrjxTDeizVumIuIcF03KdRVrFAPmL4Bf0HQE=',
    Júpiter: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlnaMGyH3aW0TpEu7bEo5vRvVl7m8QRjBJxcb5E2wrjv_G_Auxc-jAa8CZ6GKde4WQVA&usqp=CAU',
    Saturno: 'https://img.freepik.com/psd-premium/concepto-planeta-saturno-aislado-sobre-fondo-transparente_879541-683.jpg',
    Urano: 'https://img.freepik.com/foto-gratis/esfera-abstracta-brilla-liquido-submarino-azul-generado-ia_188544-22051.jpg',
    Neptuno: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/1200px-Neptune_Full.jpg',
  };

  useEffect(() => {
    const obtenerPlanetas = async () => {
      try {
        const respuesta = await axios.get(
          'https://api.le-systeme-solaire.net/rest/bodies/'
        );
        const planetasFiltrados = respuesta.data.bodies
          .filter((cuerpo) => cuerpo.isPlanet)
          .map((planeta) => ({
            id: planeta.id,
            englishName: planeta.englishName,
            spanishName: traducirPlaneta(planeta.englishName),
            gravity: planeta.gravity,
            density: planeta.density,
            meanRadius: planeta.meanRadius,
          }));
        setPlanetas(planetasFiltrados);
      } catch (error) {
        console.error('Error al obtener los planetas:', error);
      }
    };

    obtenerPlanetas();
  }, []);

  const traducirPlaneta = (nombreIngles) => {
    const traducciones = {
      Mercury: 'Mercurio',
      Venus: 'Venus',
      Earth: 'Tierra',
      Mars: 'Marte',
      Jupiter: 'Júpiter',
      Saturn: 'Saturno',
      Uranus: 'Urano',
      Neptune: 'Neptuno',
    };
    return traducciones[nombreIngles] || nombreIngles;
  };

  const handlePress = (planeta) => {
    setPlanetaSeleccionado(planeta);
  };

  const cerrarModal = () => {
    setPlanetaSeleccionado(null);
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Planetas del Sistema Solar</Text>
      <FlatList
        data={planetas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.item} onPress={() => handlePress(item)}>
            <Text style={estilos.texto}>{item.spanishName}</Text>
          </TouchableOpacity>
        )}
      />
      {planetaSeleccionado && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!planetaSeleccionado}
          onRequestClose={cerrarModal}
        >
          <View style={estilos.modal}>
            <Text style={estilos.modalTitulo}>{planetaSeleccionado.spanishName}</Text>
            <Image
              source={{ uri: imagenesPlanetas[planetaSeleccionado.spanishName] }}
              style={estilos.imagen}
            />
            <Text style={estilos.descripcion}>
              Gravedad: {planetaSeleccionado.gravity} m/s²
            </Text>
            <Text style={estilos.descripcion}>
              Densidad: {planetaSeleccionado.density} g/cm³
            </Text>
            <Text style={estilos.descripcion}>
              Radio medio: {planetaSeleccionado.meanRadius} km
            </Text>
            <Button title="Cerrar" onPress={cerrarModal} />
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
    borderRadius: 5,
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  imagen: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  descripcion: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PlanetasScreen;
