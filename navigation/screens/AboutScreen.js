import * as React from 'react';
import { Linking } from 'react-native';
import {
  Text,
  ScrollView,
  Box,
  Heading,
  Center,
  Pressable,
  Divider,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView bg={'#F2F3F4'}>
      <Box bgColor={'#FFFFFF'} rounded={'xl'} p={'50px'} m={'20px'}>
        <Center mb={'15px'}>
          <Ionicons
            name="ios-information-circle-outline"
            color={'#132552'}
            size={50}
          />
          <Heading>About This Application</Heading>
        </Center>
        <Box>
          <Text fontSize={'14px'} textAlign={'center'}>
            Aplikasi ini dirancang untuk sebagai projek pembelajaran mata kuliah
            Pengembangan Aplikasi Bergerak (PAB) Program Studi Sistem Informasi
            ITTelkom Surabaya.
          </Text>
        </Box>

        <Box>
          <Text fontWeight={'bold'} textAlign={'center'} mt={'15px'}>
            Info Tim Pengembang :
          </Text>
          <Divider mt="15px" mb="10px" />
          <Text textAlign={'center'}>Adhiaksa Bima Ramadhani 1204200056</Text>
          <Divider mt="15px" mb="10px" />
          <Text textAlign={'center'}>
            Fitrah Arjuna Brilianur Rahman 1204200204
          </Text>
          <Divider mt="15px" mb="10px" />
          <Text textAlign={'center'}>Muhammad Fardandy Martino 1204200165</Text>
          <Divider mt="15px" mb="10px" />
          <Text textAlign={'center'}>Agha Rizky Fatchur Rahman 1204200041</Text>
          <Divider mt="15px" mb="10px" />
          <Text textAlign={'center'}>M Reza Ramadhana P 1204200136</Text>
          <Divider mt="15px" mb="10px" />
          <Pressable
            onPress={() =>
              Linking.openURL(
                'https://rapidapi.com/kaushiksheel9/api/shoes-collections/'
              )
            }>
            <Text fontWeight={'bold'} textAlign={'center'} mt={'15px'}>
              API : https://rapidapi.com/kaushiksheel9/api/shoes-collections/
            </Text>
          </Pressable>
        </Box>
      </Box>
    </ScrollView>
  );
}