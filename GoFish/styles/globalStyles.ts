import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D4A",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#EAF8BF",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#00060e",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#27476E",
    color: "#EAF8BF",
  },

  section: {
    padding: 10,
    marginTop: 12,
    marginBottom: 6,
    color: "#ECA400",
    fontSize: 20,
    fontWeight: "bold",
  },  

  button: {
    marginVertical: 10,
    color: "#006992",
    padding: 30
  },

  paragraphText:{
    color: '#EAF8BF',
    fontSize: 18,
    marginBottom: 20,
  },

  link: {
    marginTop: 10,
    color: '#ECA400',
    textAlign: "center",
  },
});