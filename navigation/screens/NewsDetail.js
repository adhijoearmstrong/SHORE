import React from "react";
import {
  Dimensions,
} from "react-native";
import { Text, Image, ScrollView } from 'native-base'
import Separator from "../separator";

const windowWidth = Dimensions.get("window").width;

const NewsDetail = ({ route }) => {
  const data = route.params.data;
  
  return (
    <ScrollView padding={5}>
      <Text bold fontSize={"20px"}>{data.name}</Text>
      <Separator height={10} />
      <Image 
        source={{ uri: data.image }} 
        w={"100%"}
        h={320}
        marginBottom={"5"}
        alt="Thumbnail" 
        />
      <ScrollView>
        <Text bold fontSize={"20px"}>${data.price}</Text>
        <Separator height={10} />
        <Text fontSize= {"16px"}>{data.description}</Text>
        <Separator height={20} />
      </ScrollView>
    </ScrollView>
  );
};

export default NewsDetail;