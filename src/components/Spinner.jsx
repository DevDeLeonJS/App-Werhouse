import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Spinner = ({message="Cargando..."}) => {
  return (
    <View style={styles.container}>        
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{color: "#0000ff", fontSize: 18, marginTop: 20}} >{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      right: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      pointerEvents: "none",
      backgroundColor: "#fff",
      opacity: 0.98
    },
});

export default Spinner;