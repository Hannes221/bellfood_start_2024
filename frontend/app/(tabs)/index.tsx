import { StyleSheet, ActivityIndicator } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import TextInputComponent from "../../components/TextInput";
import { useState } from "react";
import axios from "axios";

interface Message {
  _id: number | string;
  text: string;
  createdAt: Date | number;
  user: {
    _id: number | string;
  };
}

function createMessage(text: string): Message {
  return {
    _id: -1, // Use message counter
    text,
    createdAt: new Date(),
    user: {
      _id: 0,
    },
  };
}

export default function TabOneScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState(false);
  // Create dynamic/reactive element

  async function handleSend(newMessage: Message[] = []) {
    setLoading(true);
    setMessages((existingMessages) => GiftedChat.append(newMessage, existingMessages));
    axios.post("http://localhost:8000/message", {
        "input_str": newMessage[0].text, "user_id": "1"
    }).then((response) => {
        const answer = createMessage(response.data);
        setMessages((existingMessages) => GiftedChat.append(existingMessages, [answer]));
        setLoading(false);
        //Increment message counter
    }).catch((error) => {
        console.error(error);
        setLoading(false);
    })
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
