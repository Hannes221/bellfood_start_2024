import { StyleSheet, ActivityIndicator, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
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

export default function TabOneScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState(false);
  let [messageCounter, setMessageCounter] = useState(1);

  function createMessage(messageCounterArg: number, text: string): Message {
    return {
      _id: messageCounterArg,
      text,
      createdAt: new Date(),
      user: {
        _id: "bot",
      },
    };
  }

  async function handleSend(newMessage: Message[] = []) {
    setLoading(true);
    const newMessages = newMessage.map((message) => {
      const counter = messageCounter++;
      setMessageCounter(messageCounter);
      return {
        ...message,
        _id: counter,
        user: { _id: "user" },
      };
    });

    setMessages((existingMessages) =>
      GiftedChat.append(existingMessages, newMessages)
    );

    axios
      .post("http://localhost:8000/message", {
        input_str: newMessage[0].text,
        user_id: "1",
      })
      .then((response) => {
        const answer = createMessage(messageCounter++, response.data);
        setMessageCounter(messageCounter);
        setMessages((existingMessages) =>
          GiftedChat.append(existingMessages, [answer])
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{
          _id: "user",
        }}
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
