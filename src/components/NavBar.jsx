import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { context } from '../auth/AuthContex';
import { useNavigate } from 'react-router-native';
import logo from '../pictures/logo.png';

const NavBar = ({ title }) => {

  const {logOut, user} = useContext(context);
  const navigate = useNavigate();

  const handleLogOut = () => {
      logOut();
      navigate("/login", {replace: true});
  };

  return (
    <View style={styles.headerContainer}>
        <View style={styles.containerHeader}>
          <View style={styles.container}>
              <Image
                source={logo}
                style={styles.image}
              />
          </View>
          <Text style={styles.headerText}>Bienvenido {user.user}</Text>
        </View>
        <TouchableOpacity
          onPress={handleLogOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cerrar sesion</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1e3a8a',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#3498db', // Color de fondo del botón
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  image: {
    width: "100%", 
    height: "100%",
    resizeMode: 'contain', 
  },
  containerHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  }
});

export default NavBar;
