import React from "react";
import { Text, HStack, Box, Checkbox, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TaskList = (props) => {
  const { data, onChecked, onItemPress } = props;

  return (
    <TouchableOpacity onPress={onItemPress}>
      <Box
        px={3}
        py={4}
        bg={data.isCompleted ? "#fff" : "red.700"}
      >
         <Image
          source={{ uri: data.image }}
          w={'100%'}
          h={240}
          marginBottom={'5'}
          alt="Thumbnail"
          />
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Checkbox
            isChecked={data.isCompleted}
            onChange={onChecked}
            value={data.title}
          />
          <Text
            width="100%"
            fontSize={16}
            flexShrink={1}
            textAlign="left"
            mx="10px"
          >
            {data.title}
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default TaskList;