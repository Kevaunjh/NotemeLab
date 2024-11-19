import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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

type AddNewNoteProps = NativeStackScreenProps<RootStackParamList, "NewNote">;

const AddNewNote: React.FC<
  AddNewNoteProps & { onSaveNote: (note: Note) => void }
> = ({ navigation, route, onSaveNote }) => {
  const [title, setTitle] = useState(route.params?.noteToEdit?.title || "");
  const [subtitle, setSubtitle] = useState(
    route.params?.noteToEdit?.subtitle || ""
  );
  const [description, setDescription] = useState(
    route.params?.noteToEdit?.description || ""
  );
  const [color, setColor] = useState(
    route.params?.noteToEdit?.color || "yellow"
  );

  const colors = ["#FFC1E3", "#ADD8E6", "#90EE90", "#FFD580", "#FFFACD"];

  const saveNote = () => {
    if (!title) {
      Alert.alert("Error", "Title is required!");
      return;
    }

    const newNote: Note = {
      id: route.params?.noteToEdit?.id || Date.now(),
      title,
      subtitle,
      description,
      color,
    };

    onSaveNote(newNote);
    navigation.navigate("Home");
  };

  const cancelNote = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}
      overScrollMode="always"
    >
      <View style={[styles.section, styles.header]}>
        <Text style={styles.headerText}>
          {route.params?.noteToEdit ? "Edit Note" : "New Note"}
        </Text>
      </View>

      <View style={[styles.section, styles.inputContainer]}>
        <TextInput
          style={[styles.input, styles.largeInput]}
          placeholder="Title"
          placeholderTextColor="#ccc"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.largeInput]}
          placeholder="Subtitle"
          placeholderTextColor="#ccc"
          value={subtitle}
          onChangeText={setSubtitle}
        />
        <TextInput
          style={[styles.input, styles.largeTextArea]}
          placeholder="Description"
          placeholderTextColor="#ccc"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={[styles.section, styles.colorPicker]}>
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorOption,
              { backgroundColor: c },
              c === color && styles.selectedColor,
            ]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      <View style={[styles.section, styles.buttonRow]}>
        <TouchableOpacity style={styles.cancelButton} onPress={cancelNote}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
          <Text style={styles.buttonText}>
            {route.params?.noteToEdit ? "Save Changes" : "Create Note"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flexGrow: 1,
    overflowY: "scroll",
    alignItems: "center",
    paddingVertical: 20,
  },
  section: {
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#000",
    padding: 30,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#f39c12",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 10,
    marginVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
  },
  largeInput: {
    height: 80,
    fontSize: 22,
  },
  largeTextArea: {
    height: 175,
    textAlignVertical: "top",
    fontSize: 22,
    paddingTop: 10,
  },
  colorPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: "#fff",
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#FF6F61",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddNewNote;
