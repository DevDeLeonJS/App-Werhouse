// Importa las bibliotecas necesarias
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import AddProduct from './AddProduct';

const ModalContainer = ({isOpen, handleClose}) => {
  return (
    <View>
      <Modal
        isVisible={isOpen}
        onBackdropPress={()=>handleClose()}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContenido}>
          <View>
            <AddProduct handleClose={handleClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContenido: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#fff"
    }
});

export default ModalContainer;
