import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image, Button } from 'react-native';

const EstrellasScreen = () => {
  const [estrellas, setEstrellas] = useState([]);
  const [estrellaSeleccionada, setEstrellaSeleccionada] = useState(null);

  // Datos fijos de estrellas con imágenes reales y URLs verificadas
  const datosEstrellas = [
    {
      id: '1',
      nombre: 'Sol',
      tipo: 'Estrella enana amarilla',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9mSnKpZ765f98KmLnZ51NGzBYEg7VZENVsQ&s', // Imagen del Sol
      description: 'El Sol es nuestra estrella más cercana y fuente principal de energía.',
    },
    {
      id: '2',
      nombre: 'Sirius',
      tipo: 'Estrella binaria',
      image: 'https://images.sk-static.com/images/media/profile_images/artists/369473/huge_avatar', // Imagen de Sirius
      description: 'Sirius es el sistema estelar más brillante visto desde la Tierra.',
    },
    {
      id: '3',
      nombre: 'Betelgeuse',
      tipo: 'Supergigante roja',
      image: 'https://w7.pngwing.com/pngs/1022/271/png-transparent-astronomical-object-el-sol-the-sun-sunlight-red-supergiant-star-planetes-cloud-orange-sphere-thumbnail.png', // Imagen de Betelgeuse
      description: 'Betelgeuse es una estrella masiva cerca del final de su vida.',
    },
    {
      id: '4',
      nombre: 'Rigel',
      tipo: 'Supergigante azul',
      image: 'https://play-lh.googleusercontent.com/OCMD64jc8eVqzP98kGiL_YhnK5dMUFlS5AZhJ90GuPKAxiCcw3P7JzRt9_Vf88iWTvs', // Imagen de Rigel
      description: 'Rigel es una de las estrellas más brillantes de la constelación de Orión.',
    },
    {
      id: '5',
      nombre: 'Vega',
      tipo: 'Estrella enana blanca',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Vega_star_black_background.png', // Imagen de Vega
      description: 'Vega es la estrella más brillante de la constelación de Lyra.',
    },
    {
      id: '6',
      nombre: 'Aldebarán',
      tipo: 'Gigante roja',
      image: 'https://bitacoradegalileo.wordpress.com/wp-content/uploads/2010/11/aldebaran.jpg', // Imagen de Aldebarán
      description: 'Aldebarán es la estrella más brillante de la constelación de Tauro.',
    },
    {
      id: '7',
      nombre: 'Antares',
      tipo: 'Supergigante roja',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQehTdGl1DIMtTSMD5h0KOpP0_95UCdw5_WV8JAJ77jQcheSLC42PX2r3u4OpwoQayJWrM&usqp=CAU', // Imagen de Antares
      description: 'Antares es la estrella más brillante de la constelación de Escorpio.',
    },
    {
      id: '8',
      nombre: 'Capella',
      tipo: 'Estrella gigante',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhk_bSxD8BKloyOPrsZJvBHVvSu38iZxCReykNnPSAImXr5F40-Du0-CQ2ENdX6iFp06seiEFo115KMcsSRWSBktBskRux8ZaW_B9Lbp8UmCfCsVFoQXb3oEHSZFaat1l0BPxzAyVPkyWA/w1200-h630-p-k-no-nu/CAPELLA+G8III+STR+AURIGA+15X15+M0+A46%2525BC+TSOPTICS%252BIMX178.jpg', // Imagen de Capella
      description: 'Capella es el sistema estelar más brillante de la constelación de Auriga.',
    },
    {
      id: '9',
      nombre: 'Altair',
      tipo: 'Estrella enana blanca',
      image: 'https://live.staticflickr.com/8479/8189293850_93e1132a74_b.jpg', // Imagen de Altair
      description: 'Altair es una estrella rápida y brillante de la constelación de Águila.',
    },
    {
      id: '10',
      nombre: 'Polaris',
      tipo: 'Supergigante amarilla',
      image: 'https://us.123rf.com/450wm/girja62/girja621704/girja62170400002/75090342-la-creaci%C3%B3n-de-galaxias-estelares-usando-una-explosi%C3%B3n-c%C3%B3smica.jpg?ver=6', // Imagen de Polaris
      description: 'Polaris, también conocida como la Estrella del Norte, es una estrella clave para la navegación.',
    },
  ];

  useEffect(() => {
    setEstrellas(datosEstrellas);
  }, []);

  const handlePress = (estrella) => {
    setEstrellaSeleccionada(estrella);
  };

  const cerrarModal = () => {
    setEstrellaSeleccionada(null);
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Estrellas</Text>
      <FlatList
        data={estrellas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.item} onPress={() => handlePress(item)}>
            <Text style={estilos.texto}>{item.nombre}</Text>
            <Text style={estilos.detalle}>{item.tipo}</Text>
          </TouchableOpacity>
        )}
      />
      {estrellaSeleccionada && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!estrellaSeleccionada}
          onRequestClose={cerrarModal}
        >
          <View style={estilos.modal}>
            <Text style={estilos.modalTitulo}>{estrellaSeleccionada.nombre}</Text>
            <Image
              source={{ uri: estrellaSeleccionada.image }}
              style={estilos.imagen}
            />
            <Text style={estilos.descripcion}>{estrellaSeleccionada.description}</Text>
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
  detalle: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
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

export default EstrellasScreen;
