import React, { PureComponent } from 'react';
import { ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { Box, Pressable, Image, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

class NewsScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      list: [],
    };
  }

  handleAddTask = (data) => {
    const prevList = this.state.list;
    const dataname = data.name;
    const iddata = data.id;
    const dataimage = data.image

    this.setState(
      {
        list: [...prevList, { id: iddata, title: dataname, image: dataimage, isCompleted: true }],
      },
      () => {
        try {
          console.log('try to add');
          console.log(this.state.list);
          AsyncStorage.setItem('@task-list', JSON.stringify(this.state.list));
        } catch (e) {
          console.log('Error add task: in task-all.js');
          console.error(e.message);
        }
      }
    );
  };

  handleDeleteTask = (index) => {
    const deletedList = this.state.list.filter(
      (list, listIndex) => listIndex !== index
    );
    this.setState({ list: deletedList }, () => {
      try {
        AsyncStorage.setItem('@task-list', JSON.stringify(this.state.list));
        console.log('delete item');
        console.log(this.state.list);
      } catch (e) {
        console.log('Error delete task: in task-all.js');
        console.error(e.message);
      }
    });
  };

  getTaskList = async () => {
    try {
      const value = await AsyncStorage.getItem('@task-list');
      if (value !== null) {
        console.log(value);
        this.setState({ list: JSON.parse(value) });
      } else {
        console.log('No Tasks');
      }
    } catch (e) {
      console.log('Error get task: in task-all.js');
      console.error(e);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async getNews() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '3c4a894390msh7923713dcbbd55ap1bd2e3jsn269c73c57e99',
		      'X-RapidAPI-Host': 'shoes-collections.p.rapidapi.com'
        },
      };
      const response = await fetch(
        'https://shoes-collections.p.rapidapi.com/shoes/',
        options
      );
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getNews();
  }

  findItemIndex = (data, item) => {
    return data.findIndex((el) => el.id == item);
  };

  findItemID = (data, item) => {
    return !!data.find((el) => el.id == item);
  };

  handleWhislist = (data, item) => {
    const isItemInList = this.findItemID(data, item.id);

    console.log(isItemInList);

    // jika item ada dalam whislist maka hapus item tersebut
    if (isItemInList) {
      const indexItem = this.findItemIndex(data, item.id);
      this.handleDeleteTask(indexItem);
      return;
    }

    // jika belum ada maka tambahkan item
    this.handleAddTask(item);
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <>
        <Pressable
          p={'20px'}
          backgroundColor="white"
          onPress={() => navigation.navigate('NewsDetail', { data: item })}>
          <Box>
            <Image
              source={{ uri: item.image }}
              w={'100%'}
              h={320}
              marginBottom={'5'}
              alt="Thumbnail"
            />
            <Pressable
              onPress={() => this.handleWhislist(this.state.list, item)}>
              <MaterialCommunityIcons
                name={
                  this.findItemID(this.state.list, item.id)
                    ? 'bookmark'
                    : 'bookmark-outline'
                }
                size={25}
                color={
                  this.findItemID(this.state.list, item.id) ? 'black' : 'black'
                }
              />
            </Pressable>
            <Text bold fontSize={'16px'}>
              {item.name}
            </Text>
          </Box>
        </Pressable>
        <Box borderWidth={'1'} borderColor="#454545"></Box>
      </>
    );
  };

  render() {
    const { data, isLoading } = this.state;

    return (
      <Box flex={'1'} justifyContent="center">
        {isLoading ? (
          <ActivityIndicator size="large" color="#454545" />
        ) : (
          <FlatList
            data={data}
            refreshing={this.state.isLoading}
            onRefresh={() => this.getNews()}
            keyExtractor={({ id }, index) => id}
            renderItem={this.renderItem}
          />
        )}
      </Box>
    );
  }
}

export default NewsScreen;