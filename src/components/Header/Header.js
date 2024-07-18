import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CompanyLogo from "./companyLogo.png"; 
import styles from "./HeaderStyles";

const Header = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const trimmedSearchQuery = searchQuery.trim();
    if (trimmedSearchQuery !== "") {
      navigation.navigate("SearchResults", { searchQuery: trimmedSearchQuery });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.headerLogo}
            source={CompanyLogo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for Your Products"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
