import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, Picker } from 'react-native';
import { typesUnit } from '../helpers/typesUnit';
import { SelectList } from 'react-native-dropdown-select-list'
import Spinner from './Spinner';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../Graphql/Mutations';
import { alertShow } from '../helpers/Alert';

const AddProduct = ({handleClose}) => {

  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
        name: "",
        price: 0,
        unit: "",
        code: "",
        QtyTotal: 0
  });
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted: ()=>hadleResetState()
  });


  const options = [
      {key:'1', value:'Pieza', enum: "PIECE"},
      {key:'2', value:'Kilogramo', enum: "KILOGRAM"},
      {key:'3', value:'Paquete', enum: "PACKAGE"},
  ]

  const {name, price, unit, code, QtyTotal} = inputData;

  const handleInputChange = (name, value) => {
    setInputData({
        ...inputData,
        [name]: value
    });
  };

  const hadleResetState = () => {
      setInputData({
        name: "",
        price: 0,
        unit: "",
        code: "",
        QtyTotal: 0
      });
      handleClose()
  }

  const handleFormSubmit = async() => {
    try{
        setLoading(true);
        const product = await createProduct({
            variables:{
                name: name.trim(),
                price: Number(price),
                total: Number(QtyTotal),
                unit: options.find(entry => entry.value === unit).enum,
                code: code.trim()
            }
        });  
        setLoading(false);
    }catch(error){
        setLoading(false);
        alertShow("Error", "Fallo la creacion del producto")
    }
  };

  return (
    <View>
        <Text style={{color: "black", fontSize: 25, textAlign:"center", fontWeight: "600"}}>Crea un producto</Text>
        <View style={styles.container}>
            <Text style={styles.label}>Nombre: </Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(input) => handleInputChange("name", input)}
                placeholder="Nombre"
            />

            <Text style={styles.label}>Precio: </Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={(input) => handleInputChange("price", input)}
                keyboardType="numeric"
                placeholder="$0.00"
            />

            <Text style={styles.label}>Unidad: </Text>
            <View style={{marginBottom: 10}}>
                <SelectList 
                    setSelected={(input) => handleInputChange("unit", input)} 
                    data={options} 
                    search={false}
                    save="value"
                    dropdownTextStyles={{color: "#5F5F5F"}}
                    inputStyles={{color: "#5F5F5F"}}
                />
            </View>

            <Text style={styles.label}>Codigo: </Text>
            <TextInput
                style={styles.input}
                value={code}
                onChangeText={(input) => handleInputChange("code", input)}
                placeholder="Codigo"
            />

            <Text style={styles.label}>En existencia: </Text>
            <TextInput
                style={styles.input}
                value={QtyTotal}
                onChangeText={(input) => handleInputChange("QtyTotal", input)}
                keyboardType="numeric"
                placeholder="Inventario"
            />

            <Button title="Crear" onPress={handleFormSubmit} />
        </View>
            {
                (loading) &&
                    <Spinner />
            }
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: "black"
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      color: "#5F5F5F",
      borderRadius: 5
    },
  });

export default AddProduct