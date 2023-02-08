import React, { PureComponent } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { Pressable, FlatList, Box, Text, Image } from "native-base";

const windowWidth = Dimensions.get("window").width;

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
    };
  }

  async getNews() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/adhijoearmstrong/adhiaksa/main/articles.json"
      );
      const json = await response.json();
      this.setState({ data: json.articles });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getNews();
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <>
        <Pressable
          p={"20px"}
          backgroundColor='white'
          onPress={() => navigation.navigate("HomeDetail", { data: item })}
        >
          <Box>
            <Image
              source={{ uri: item.image }}
              w={"100%"}
              h={320}
              marginBottom={"5"}
              alt="Thumbnail"
            />
            <Text bold textAlign="center" fontSize={"20px"}>
              {item.title}
            </Text>
          </Box>
        <Box borderWidth={"1"} borderColor="#454545"></Box>
        </Pressable>
      </>
    );
  };

  onRefresh = () => {
    this.setState({ isFetching: true }, () => {
      this.fetchContent(this.state.activeCategory);
    });
  };

  render() {
    const { data, isLoading } = this.state;

    return (
      <Box flex={"1"} justifyContent="center">
        {isLoading ? (
          <ActivityIndicator size="large" color="#454545" />
        ) : (
          <FlatList
            data={data}
            refreshing={this.state.isLoading}
            onRefresh={()=>this.getNews()}
            keyExtractor={({ id }, index) => id}
            renderItem={this.renderItem}
          />
        )}
      </Box>
    );
  }
}

export default HomeScreen;