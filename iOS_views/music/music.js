import Util from './../common/util'
import ServiceURL from './../common/service'
import Search from './../common/search'
import webView from './../common/webview'
import Dimensions from 'Dimensions'
import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ScrollView,
  ActivityIndicatorIOS,
  TouchableOpacity,
  Component
} from 'react-native'

export default class Music extends Component {
  // 构造
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // 初始状态
    this.state = {
      dataSource: ds.cloneWithRows([]),
      keywords: 'tell me why',
      show: false
    }
  }

  componentDidMount() {
    this._getData();
  }

  render() {
    return (
      <ScrollView style={{height: Dimensions.get('window').height}}>

        <View style={[styles.search, styles.row, {marginTop: 5}]}>
          <View style={styles.flex_1}>
            <Search placeholder="请输入歌曲/歌手名称" onChangeText={this._changeText.bind(this)}/>
          </View>
          <TouchableOpacity style={styles.btn} onPress={this._search.bind(this)}>
            <Text style={styles.fontFFF}>搜索</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.show ?
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
            />
            : Util.loading
        }

      </ScrollView>
    );
  }

  _changeText(val) {
    this.setState({
      keywords: val
    });
  }

  _search() {
    this._getData();
  }

  _renderRow(row) {
    return (
      <View style={styles.item}>
        <View style={styles.center}>
          <Image style={styles.img} source={{uri: row.image}}/>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.flex_1,{marginLeft:20}]} numberOfLines={1}>曲目：{row.title}</Text>
          <Text style={[styles.textWidth]} numberOfLines={1}>演唱：{row.author[0].name}</Text>
        </View>
        <View style={[styles.row]}>
          <Text style={[styles.flex_1, {marginLeft:20}]} numberOfLines={1}>时间：{row.attrs['pubdate']}</Text>
          <Text style={styles.textWidth} numberOfLines={1}>评分：{row['rating']['average']}</Text>
        </View>
        <View style={[styles.center]}>
          <TouchableOpacity style={[styles.goDou, styles.center]}
                            onPress={this._goDouBan.bind(this, row.title, row.mobile_link)}>
            <Text>详情</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _getData() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var that = this;
    var baseURL = ServiceURL.music_search + '?count=10&q=' + this.state.keywords;
    this.setState({
      show: false
    });
    Util.get(baseURL, function (data) {
      if (!data.musics || !data.musics.length) {
        return alert('音乐服务出错');
      }
      var musics = data.musics;
      console.log(musics);
      that.setState({
        dataSource: ds.cloneWithRows(musics),
        show: true
      });
    }, function (err) {
      alert(err);
    });
  }

  _goDouBan(title, url) {
    this.props.navigator.push({
      component: webView,
      passProps: {
        title: title,
        url: url,
        backName: '音乐'
      }
    });
  }
}

var styles = StyleSheet.create({
  flex_1: {
    flex: 1
  },
  search: {
    paddingLeft: 5,
    paddingRight: 5,
    height: 45
  },
  btn: {
    width: 50,
    backgroundColor: '#0091FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fontFFF: {
    color: '#fff'
  },
  row: {
    flexDirection: 'row'
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    marginTop: 10,
    borderTopWidth: Util.pixel,
    borderBottomWidth: Util.pixel,
    borderColor: '#ddd',
    paddingTop: 10,
    paddingBottom: 10
  },
  textWidth: {
    width: 120
  },
  goDou: {
    height: 35,
    width: 60,
    borderWidth: Util.pixel,
    borderColor: '#3082FF',
    borderRadius: 3
  }
})