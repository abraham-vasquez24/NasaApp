import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Importación de pantallas
import BienvenidaScreen from './src/components/screens/BienvenidaScreen';
import InicioScreen from './src/components/screens/InicioScreen';
import FavoritosScreen from './src/components/screens/FavoritosScreen';
import PlanetasScreen from './src/components/screens/PlanetasScreen';
import EstrellasScreen from './src/components/screens/EstrellasScreen';
import AgujerosNegrosScreen from './src/components/screens/AgujerosNegrosScreen';


// Configuración de navegadores
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [favoritos, setFavoritos] = useState([]);

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#1a73e8',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home-outline';
          if (route.name === 'Favoritos') iconName = 'heart-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio">
        {() => <InicioScreen favoritos={favoritos} setFavoritos={setFavoritos} />}
      </Tab.Screen>
      <Tab.Screen name="Favoritos">
        {() => <FavoritosScreen favoritos={favoritos} />}
      </Tab.Screen>
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: '#000' },
          drawerActiveTintColor: '#1a73e8',
          drawerInactiveTintColor: '#aaa',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      >
        <Drawer.Screen name="Bienvenida" component={BienvenidaScreen} />
        <Drawer.Screen name="Explorar" component={TabNavigator} />
        <Drawer.Screen name="Planetas" component={PlanetasScreen} />
        <Drawer.Screen name="Estrellas" component={EstrellasScreen} />
        <Drawer.Screen name="Agujeros Negros" component={AgujerosNegrosScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
