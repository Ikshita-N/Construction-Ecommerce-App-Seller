import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModalDropdown from 'react-native-modal-dropdown';
import dummySellingHistory from "../../dummySellingHistory";
import styles from "./SellingHistoryScreenStyles";

function SellingHistoryScreen() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("All");
  const [sellingHistory, setSellingHistory] = useState([]);

  const extractTransactions = (history) => {
    return history.flatMap(item => 
      item.transactions.map(transaction => ({
        id: transaction.transactionId,
        name: item.product.title,
        price: item.product.price,
        status: transaction.deliveryStatus === 1 ? 'Sold' : 'Pending'
      }))
    );
  };

  const filterHistory = (value) => {
    const transactions = extractTransactions(dummySellingHistory);
    if (value === "All") {
      setSellingHistory(transactions);
    } else {
      const filteredHistory = transactions.filter(item => item.status === value);
      setSellingHistory(filteredHistory);
    }
    setSelectedValue(value);
  };

  useEffect(() => {
    const transactions = extractTransactions(dummySellingHistory);
    setSellingHistory(transactions);
  }, []);

  return (
    <View style={styles.container}>
      <ModalDropdown
        options={['All', 'Sold', 'Pending']}
        defaultValue={selectedValue}
        onSelect={(index, value) => filterHistory(value)}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownStyle}
        dropdownTextStyle={styles.dropdownTextStyle}
      />

      <FlatList
        data={sellingHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Details", { item })}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.price}</Text>
            <Text style={styles.itemText}>{item.status}</Text>
          </TouchableOpacity>
        )}
        initialScrollIndex={0}
      />
    </View>
  );
}

export default SellingHistoryScreen;
