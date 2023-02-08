import React from "react";
import {
  Dimensions,
  Linking,
} from "react-native";
import { Pressable, Box, Image, Text, ScrollView} from "native-base";
import Separator from "../separator";

const windowWidth = Dimensions.get("window").width;

const HomeDetail = ({ route }) => {
  const data = route.params.data;
  
  return (
    <ScrollView padding={5} flex={50}>
      <Text bold fontSize={"20px"}>{data.title}</Text>
      <Separator height={20} />
      <Image 
      source={{ uri: data.image }} 
        w={"100%"}
        h={320}
        marginBottom={"5"}
        alt="Thumbnail"  />
      <Separator height={20} />
      <ScrollView>
        <Text fontSize= {"16px"}>{data.deskripsi}</Text>
        <Separator height={100} />
      </ScrollView>
      <Pressable onPress={() => Linking.openURL('https://wa.me/6282337292233')}>
          <Box
            alignItems="center"
            backgroundColor="#34B7F1"
            p={'15px'}>
            <Text>
              Order
            </Text>
          </Box>
        </Pressable>
    </ScrollView>
  );
};

export default HomeDetail;