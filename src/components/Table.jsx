import React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView } from 'react-native';

const Table = ({data, columns, handleRefetch, refreshing}) => {

  return (
      <View style={styles.container}>
          <View style={[styles.row, {backgroundColor: "#EFEFEF", borderRadius: 5}]}>
            {columns.map((column) => (
              <Text style={styles.headerCell}>
                {column}
              </Text>
            ))}
          </View>
          <ScrollView
            style={{width: "100%", height:"100%"}}
            refreshControl={
              <RefreshControl 
                  refreshing={refreshing} 
                  onRefresh={handleRefetch}
                  colors={['#3498db', '#e74c3c', '#2ecc71']}
              />
            }
          >
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                  <View style={[styles.row]}>
                      <View style={styles.cell}>
                          <Text style={[styles.cellText, {color: "#636363", fontWeight: "bold", fontSize: 14}]}>{item.name}</Text>
                      </View>
                      <View style={styles.cell}>
                          <Text style={styles.cellText}>{item.price}</Text>
                      </View>
                      <View style={styles.cell}>
                          <Text style={styles.cellText}>{item.qtyTotal}</Text>
                      </View>
                      <View style={styles.cell}>
                          <Text style={styles.cellText}>{item.unit}</Text>
                      </View>
                      <View style={styles.cell}>
                          <Text style={styles.cellText}>{item.code}</Text>
                      </View>
                  </View>
              )}
            />
          </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    color: "red"
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "black",
    fontSize: 16,
    color: "#4C4C4C"
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: '#EDECEC',
    borderLeftColor: "#ccc",
    marginRight: 2,
    width: 60,
    height: 60
  },
  cellText: {
    textAlign: 'center',
    color: "#616161",
    fontWeight: "600"
  },
  floatingButton: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Elevación para una sombra (opcional)
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Table;
