import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from './LoginScreenStyles'; // Import styles from separate file

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Simulating asynchronous token retrieval
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("Error while fetching token:", err);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    // Simulating login functionality
    console.log("Logging in with user:", user);

    // Replace with actual login logic using axios
    // axios.post(`http://${ipAddress}:8000/login`, user)
    //   .then((response) => {
    //     console.log(response);
    //     const token = response.data.token;
    //     AsyncStorage.setItem("authToken", token);
    //     navigation.replace("Main");
    //   })
    //   .catch((error) => {
    //     Alert.alert("Login Error", "Invalid Email");
    //     console.log(error);
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj0IU2sjKXwBONkiU_-d4iAx14GLgZp5Mm7w&s,size=(826,465)",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Login In to your Account</Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons
              style={styles.inputIcon}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter Your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <AntDesign
              style={styles.inputIcon}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter Your Password"
            />
          </View>
        </View>

        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 12 }}
        >
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
