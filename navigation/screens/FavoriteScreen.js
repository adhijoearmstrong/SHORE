import React, { Component } from 'react';
import { Center, Text, Box, ScrollView, Icon, Spinner } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from '../TaskList';

class FavoriteScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completedListLength: 0,
      allList: [],
      isLoading: true,
    };
  }

  handleStatusChange = (index) => {
    const newList = this.state.allList;
    newList[index].isCompleted = !newList[index].isCompleted;
    this.setState({ allList: newList }, () => {
      try {
        AsyncStorage.setItem('@task-list', JSON.stringify(this.state.allList));
      } catch (e) {
        console.log('Error update status task: in task-completed.js');
        console.error(e.message);
      } finally {
        this.setState({
          completedListLength: this.state.allList.filter(
            (item) => item.isCompleted
          ).length,
        });
      }
    });
  };

  getTaskList = async () => {
    try {
      const value = await AsyncStorage.getItem('@task-list');
      if (value !== null) {
        const allData = JSON.parse(value);
        const completedData = allData.filter((item) => item.isCompleted).length;
        this.setState({ allList: allData, completedListLength: completedData });
      } else {
        console.log('No tasks');
      }
    } catch (e) {
      console.log('Error get task: in task-completed.js');
      console.error(e);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.getTaskList();
  }

  render() {
    const { allList, isLoading, completedListLength } = this.state;

    return (
      <Box mx={3} mt={3} flex={1}>
        {isLoading ? (
          <Center flex={1}>
            <Spinner size="lg" />
          </Center>
        ) : completedListLength === 0 ? (
          <Center flex={1}>
            <Icon
              as={AntDesign}
              name="frowno"
              size={82}
              color="primary.600"
              mb={2}
            />
            <Text fontSize={16} bold={true}>
              No Bookmarks listings yet
            </Text>
            <Text fontSize={16}>why don't you like my news?</Text>
          </Center>
        ) : (
          <ScrollView>
            {allList.map((item, index) => {
              if (item.isCompleted) {
                return (
                  <Box key={item.title + index.toString()}>
                    <TaskList
                      data={item}
                      onChecked={() => this.handleStatusChange(index)}
                      onItemPress={() => this.handleStatusChange(index)}
                    />
                  </Box>
                );
              }
            })}
          </ScrollView>
        )}
      </Box>
      //
    );
  }
}

export default FavoriteScreen;