import { Alert } from 'react-native';

export const alertShow = (title="Vaya, parece que algo salio mal", message="Algo salio mal, intentalo mas tarde", onPress) => {
    Alert.alert(title, message, [
        {
            text: "Cerrar",
            onPress: ()=> onPress
        }
    ]);
};
