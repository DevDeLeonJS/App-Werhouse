import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logo from '../pictures/logo.png';
import { context } from '../auth/AuthContex';
import { useNavigate } from 'react-router-native';
import Spinner from '../components/Spinner';

const LoginScreen = () => {  
  const {loggin, loading} = useContext(context)
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errroLoggin, setErrorLoggin] = useState(null);

  const handleLogin = async() => {
      try {
        if(!userName && !password) return;
        if(userName.length > 4 && password.length > 4){
           const status = await loggin({userName: userName.trim(), password: password.trim()});
           if(status === 200){
             navigate("/home", {replace: true});    
           }
           if(status === 400){
              setErrorLoggin({
                  message: "El correo o la contraseña son incorrectos, intetelo de nuevo",
                  status: status
              });
           }
           if(status === 502){
              setErrorLoggin({
                  message: "El servidor no responde, intentelo mas tarde",
                  status: status
              })
           }
        };
      } catch (error) {
        console.log("Error(Componente Login)", error);
      }
  };

  // TODO: Implementacion de ver el password en el input de password

  return (
    <View style={styles.container}>
        <Text style={styles.title}>¡Bienvendo!</Text>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={logo}/>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          onChangeText={(text) => setUsername(text)}
          keyboardType="ascii-capable"
          value={userName}
          placeholderTextColor="#a1a1aa"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          keyboardType="ascii-capable"
          value={password}
          placeholderTextColor="#a1a1aa"
          
        />
        {
           (errroLoggin) &&
            <View style={{borderColor: "red", borderWidth: 1, borderRadius: 5,  padding: 10, marginBottom: 10, backgroundColor: "#FFE3E3"}}>
                <Text style={{color: "red"}} >{errroLoggin.message}</Text>
            </View>
        }

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        {
          (loading) &&
            <Spinner />
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    color: "#1e3a8a"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  containerImage: {
      width: 250, 
      height: 250,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#a1a1aa',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    color: "#27272a",
    fontSize: 18
  },
  button: {
    backgroundColor: '#1e3a8a',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
