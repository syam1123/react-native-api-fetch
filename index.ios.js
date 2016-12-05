import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View } from 'react-native';

class ListViewBasics extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.movies)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount(){
    const data = this.getMoviesFromApiAsync()
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
                <View>
                  <Text>{rowData.title}</Text>
                  <Text>{rowData.releaseYear}</Text>
                </View>
            )
          }
        }
        />
      </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent('AwesomeProject', () => ListViewBasics);