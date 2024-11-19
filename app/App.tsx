import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AddNewNote from "./AddNewNote";

type RootStackParamList = {
  Home: undefined;
  NewNote: { noteToEdit?: Note } | undefined;
};

type Note = {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSaveNote = (newNote: Note) => {
    const updatedNotes = notes.find((note) => note.id === newNote.id)
      ? notes.map((note) => (note.id === newNote.id ? newNote : note))
      : [...notes, newNote];
    setNotes(updatedNotes);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} notes={notes} />}
      </Stack.Screen>
      <Stack.Screen name="NewNote">
        {(props) => <AddNewNote {...props} onSaveNote={handleSaveNote} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default App;
