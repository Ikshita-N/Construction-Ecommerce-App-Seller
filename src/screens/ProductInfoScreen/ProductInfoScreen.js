import React, { useState } from "react";
import {
  ScrollView,
  Text,
  ImageBackground,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import {
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./ProductInfoScreenStyles";

const ProductInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const initialProduct = route.params;
  const [product, setProduct] = useState(initialProduct);
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle saving changes
  const saveChanges = () => {
    console.log("Saving changes:", product);
    Alert.alert("Changes Saved Successfully");
    setIsEditing(false); // Exit editing mode
  };

  // Function to handle editing a specific field
  const handleFieldChange = (field, value) => {
    setProduct({
      ...product,
      [field]: value,
    });
  };

  // Render function for the component
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Product Images */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product.images.map((image, id) => (
          <ImageBackground
            style={styles.imageBackground}
            source={{ uri: image }}
            key={id}
          >
            <View style={{ padding: 20 }}>
              <View style={styles.discountBadge}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 12 }}>
                  {product.discount}% off
                </Text>
              </View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Product Details */}
      <View style={{ padding: 10 }}>
        {/* Product Title with Stars */}
        <View>
          {isEditing ? (
            <TextInput
              style={styles.productTitle}
              value={product.title}
              onChangeText={(text) => handleFieldChange("title", text)}
            />
          ) : (
            <Text style={styles.productTitle}>{product.title}</Text>
          )}
        </View>
        <View style={styles.starContainer}>
          <FontAwesome
            name="star"
            size={20}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
          <Text>({product.rating})</Text>
        </View>
        <Text style={styles.priceText}>₹{product.price}</Text>

        <Text style={styles.mrpText}>
          MRP: ₹{product.mrp}
        </Text>
      </View>

      {/* Other Details */}
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Category:</Text>
        {isEditing ? (
          <TextInput
            style={{ marginLeft: 5, flex: 1, borderBottomWidth: 1, borderBottomColor: "#D0D0D0" }}
            value={product.category}
            onChangeText={(text) => handleFieldChange("category", text)}
          />
        ) : (
          <Text> {product.category}</Text>
        )}
      </View>

      <View style={styles.keyFeaturesContainer}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Key Features:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.keyFeatureText, { marginLeft: 5, flex: 1, borderBottomWidth: 1, borderBottomColor: "#D0D0D0" }]}
            value={product.keyFeatures.join(", ")}
            onChangeText={(text) => handleFieldChange("keyFeatures", text.split(", "))} // Convert back to array
          />
        ) : (
          product.keyFeatures.map((feature, index) => (
            <Text key={index} style={styles.keyFeatureText}>
              - {feature}
            </Text>
          ))
        )}
      </View>

      {/* Specifications Section */}
      <View style={styles.specificationsContainer}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Specifications:</Text>
        {Object.keys(product.specifications).map((key, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
            {isEditing ? (
              <>
                <TextInput
                  style={{ flex: 1, marginRight: 5, borderBottomWidth: 1, borderBottomColor: "#D0D0D0" }}
                  value={key}
                  onChangeText={(text) => {
                    const updatedSpecs = { ...product.specifications };
                    delete updatedSpecs[key];
                    updatedSpecs[text] = product.specifications[key];
                    handleFieldChange("specifications", updatedSpecs);
                  }}
                />
                <TextInput
                  style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: "#D0D0D0" }}
                  value={product.specifications[key]}
                  onChangeText={(text) => handleFieldChange("specifications", { ...product.specifications, [key]: text })}
                />
              </>
            ) : (
              <>
                <Text style={{ flex: 1, marginRight: 5 }}>{key}:</Text>
                <Text>{product.specifications[key]}</Text>
              </>
            )}
          </View>
        ))}
        {isEditing && (
          <Pressable
            style={[styles.button, { backgroundColor: "#1976d2", marginTop: 10 }]}
            onPress={() => {
              const newKey = "New Spec";
              handleFieldChange("specifications", { ...product.specifications, [newKey]: "" });
            }}
          >
            <Text style={styles.buttonText}>Add New Specification</Text>
          </Pressable>
        )}
      </View>

      {/* Total and Stock Details */}
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ₹{product.price}{" "}
          <Text style={{ fontSize: 12 }}> (Including all taxes)</Text>
        </Text>
      </View>

      <Text style={styles.inStockText}>IN Stock</Text>

      {/* Reviews Section */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewText}>Reviews:</Text>
        {product.reviews.map((review, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={styles.reviewerText}>
              - Reviewer: {review.reviewer}
            </Text>
            <View style={styles.reviewRatingContainer}>
              <Text>Rating: </Text>
              {[...Array(review.rating)].map((_, i) => (
                <FontAwesome
                  key={i}
                  name="star"
                  size={20}
                  color="#FFD700"
                  style={{ marginRight: 2 }}
                />
              ))}
            </View>
            <Text style={styles.reviewCommentText}>
              Comment: {review.comment}
            </Text>
            <Text style={styles.reviewDateText}>Date: {review.date}</Text>
          </View>
        ))}
      </View>

      {/* Edit and Save Buttons */}
      {isEditing ? (
        <Pressable
          style={[styles.button, { backgroundColor: "#1976d2" }]}
          onPress={saveChanges}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button, { backgroundColor: "#1976d2" }]}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>Edit Product</Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

export default ProductInfoScreen;
