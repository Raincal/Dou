/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import Navigation from './iOS_views/common/navigation'
import Book from './iOS_views/book/book_list'
import Music from './iOS_views/music/music'
import Movie from './iOS_views/movie/movie'
import React, {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  ScrollView,
  StatusBarIOS,
  Component
} from 'react-native'

StatusBarIOS.setHidden(true);
class Dou extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      selectedTab: '图书'
    };
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="图书"
          selected={this.state.selectedTab === '图书'}
          icon={require('image!book')}
          onPress={() => {
            this.setState({
              selectedTab: '图书'
            })
          }}>
          <Navigation component={Book}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="电影"
          selected={this.state.selectedTab === '电影'}
          icon={require('image!book')}
          onPress={() => {
            this.setState({
              selectedTab: '电影'
            })
          }}>
          <Navigation component={Movie}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="音乐"
          selected={this.state.selectedTab === '音乐'}
          icon={require('image!book')}
          onPress={() => {
            this.setState({
              selectedTab: '音乐'
            })
          }}>
          <Navigation component={Music}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

AppRegistry.registerComponent('Dou', () => Dou);
