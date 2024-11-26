// src/screens/InicioScreen.js
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';

const PantallaOne = () => {
  const [nasaImages, setNasaImages] = useState([]);

  // Fetch de varias imágenes desde la API de la NASA
  useEffect(() => {
    const fetchNasaImages = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?count=5&api_key=WFM1jZf2uKlh4IctNbxXAsVuC1woajz9HlVAwTg6`
        );
        const data = await response.json();
        setNasaImages(data); // Guardamos las imágenes obtenidas
      } catch (error) {
        console.error('Error fetching NASA images:', error);
      }
    };

    fetchNasaImages();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {nasaImages.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.url }}
            style={styles.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
});

export default PantallaOne;
