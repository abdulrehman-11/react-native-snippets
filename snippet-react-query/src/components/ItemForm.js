/** @format */

import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const ItemForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [body, setBody] = useState(initialData.body || "");

  const handleSubmit = () => {
    onSubmit({ title, body });
  };

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Body" value={body} onChangeText={setBody} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ItemForm;
