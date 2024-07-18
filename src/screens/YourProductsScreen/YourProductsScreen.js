import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Products from '../../data'; 
import CategoryProduct from '../../components/Header/CategoryProduct';

const YourProductsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.productList}>
      {Products.map(product => (
        <View key={product.id} style={styles.categoryItems}>
          <CategoryProduct item={product} />
        </View>
      ))}
    </ScrollView>
  );
};

export default YourProductsScreen;

const styles = StyleSheet.create({
  productList: {
    padding: 10, 
  },
  categoryItems: {
    
  },
  productTitle: {
    
  },
});
