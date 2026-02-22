import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  // Main screen container
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#001D4A",
    padding: 20,
  },

  // Titles
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ECA400",
  },

  // Section headings
  section: {
    paddingVertical: 6,
    marginTop: 12,
    marginBottom: 6,
    color: "#EAF8BF",
    fontSize: 20,
    fontWeight: "bold",
  },

  // Paragraph / body text
  paragraphText: {
    color: "#c4efef",
    fontSize: 16,
    marginBottom: 12,
  },

  // Text input fields
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#00060e",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#27476E",
    color: "#EAF8BF",
  },

  // Buttons
button: {
  backgroundColor: "#006992",
  paddingVertical: 16,
  paddingHorizontal: 24, // space around text
  borderRadius: 25,
  marginVertical: 10,
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center", // centers the button horizontally
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  // Links
  link: {
    marginTop: 10,
    color: "#ECA400",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  // Apartment listing card
  card: {
    backgroundColor: "#397ba7",
    flexDirection: "row",
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  // Card image
  cardImage: {
    width: 110,
    height: 90,
    borderRadius: 12,
  },

  // Card details container
  cardDetails: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },

  // Card price text
  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#006992",
    marginBottom: 4,
  },

  // Card info text
  cardText: {
    fontSize: 14,
    color: "#001D4A",
  },

  // Search bar / filter container
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  filterInput: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#27476E",
    color: "#EAF8BF",
    borderWidth: 1,
    borderColor: "#00060e",
    fontSize: 14,
    textAlign: "center",
  },

  // No results text
  noResults: {
    color: "#EAF8BF",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});