import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SerchBar";
import { context } from "../auth/AuthContex";
import { useContext, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PRODUCTS, SERCH_PRODUCT_BY_NAME_CODE } from "../Graphql/Query";
import Spinner from "../components/Spinner";
import { alertShow } from "../helpers/Alert";
import { typesUnit } from "../helpers/typesUnit";
import Table from "../components/Table";
import ModalContainer from "../components/Modal";

const columns = ['Nombre', 'Precio', 'Existencia', 'Unidad', 'Codigo'];

const CasherScreen = () => {

  const {user} = useContext(context);
  const [products, setProducts] = useState(null);
  const [isLoadingData, setLoadingData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [getProducts, {data, loading, error}] = useLazyQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only"
  });
  const [searchProduct] = useLazyQuery(SERCH_PRODUCT_BY_NAME_CODE, {
    fetchPolicy: "network-only"
  }); 

  const handleHideModal = () => setShowModal(false);

  const handleShowModal = () => setShowModal(true);

  const handleSearchProducts = async({inputText}) => {
    try {
      setLoadingData(true);
      const data = await searchProduct({
        variables: {
            filter: {
              or: [
                {
                  Name: {containsi: inputText}
                },
                {
                  Code: {contains: inputText}
                }
            ]
          }
        }
      });
      if(data?.data?.poducts?.data.length === 0){
        setProducts([]);
        setLoadingData(false);
      };
      const productsData = data.data.products.data.map(({id, attributes}) => {
        return{
            id: id,
            name: (attributes?.Name) ? attributes.Name : "" ,
            price: (attributes?.Price) ? attributes.Price : 0,
            qtyTotal: (attributes?.QtyTotal) ? attributes.QtyTotal : 0,
            unit: (attributes?.Unit) ? typesUnit[attributes.Unit] : "",
            code: (attributes?.Code) ? attributes.Code : ""
        }
      });
      setProducts(productsData);
      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      alertShow();
    }
  };  

  const handleGetProducts = () => getProducts();

  const handleRefetch = () => {
      setRefreshing(true);
      handleGetProducts();
      setRefreshing(false);
  }

  useEffect(()=>{
      if(data && !loading && !error){
          if(data.products.data){
              const productsData = data.products.data.map(({id, attributes}) => {
                  return{
                      id: id,
                      name: (attributes?.Name) ? attributes.Name : "" ,
                      price: (attributes?.Price) ? attributes.Price : 0,
                      qtyTotal: (attributes?.QtyTotal) ? attributes.QtyTotal : 0,
                      unit: (attributes?.Unit) ? typesUnit[attributes.Unit] : "",
                      code: (attributes?.Code) ? attributes.Code : ""
                  }
              });
              setProducts(productsData);
          }else if(!loading && error){
              alertShow();
          }
      }
  }, [data, loading, error]);

  useEffect(()=>{
    handleGetProducts();
  },[]);
  
  return (
    <View style={{width: "100%", height: "100%", backgroundColor: "#fff"}}>
      <NavBar title={"Cobranza"}/>
      <SearchBar  handleSearchProducts={handleSearchProducts} />
      <Table columns={columns} data={products} handleRefetch={handleRefetch} refreshing={refreshing} />
      {
        (user.category === "storekeeper") &&
            <TouchableOpacity style={styles.floatingButton} onPress={handleShowModal}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
      }
      {
          (isLoadingData) &&   
              <Spinner />
      }
      {
          (showModal) &&
              <ModalContainer isOpen={showModal} handleClose={handleHideModal} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 70,
    right: 30,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default CasherScreen;