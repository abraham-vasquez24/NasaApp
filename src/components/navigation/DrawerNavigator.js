// src/navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InicioScreen from '../screens/InicioScreen';
import PlanetasScreen from '../screens/PlanetasScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Inicio" component={InicioScreen} />
      <Drawer.Screen name="Planetas" component={PlanetasScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
