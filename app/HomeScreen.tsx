import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

type RootStackParamList = {
  Home: undefined;
  NewNote: { noteToEdit?: Note } | undefined;
};

type Note = {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  color: string;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps & { notes: Note[] }> = ({
  navigation,
  notes,
}) => {
  const handleAddNote = () => {
    navigation.navigate("NewNote");
  };

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={[styles.noteItem, { backgroundColor: item.color || "yellow" }]}
      onPress={() => navigation.navigate("NewNote", { noteToEdit: item })}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteSubtitle}>{item.subtitle}</Text>
      <Text style={styles.noteDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Notes</Text>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No notes available. Tap "+" to create one.
          </Text>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#000",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#f39c12",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  list: {
    paddingBottom: 20,
  },
  noteItem: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  noteSubtitle: {
    fontSize: 18,
    color: "#333",
  },
  noteDescription: {
    fontSize: 14,
    color: "#333",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#f39c12",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default HomeScreen;
