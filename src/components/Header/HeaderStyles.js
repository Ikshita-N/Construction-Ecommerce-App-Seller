import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    color: "black",
  },
  searchButton: {
    padding: 10,
  },
});

export default styles
