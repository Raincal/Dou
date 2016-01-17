import Search from './../common/search'
import Util from './../common/util'
import ServiceURL from './../common/service'
import webView from './../common/webview'
import Dimensions from 'Dimensions'
import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity,
  Component
} from 'react-native'

export default class Movie extends Component {
  // 构造
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // 初始状态
    this.state = {
      dataSource: ds.cloneWithRows([]),
      keywords: 'Harry Potter',
      show: false
    };
  }

  componentDidMount() {
    this._getData();
  }

  render() {
    return (
      <ScrollView style={{height: Dimensions.get('window').height}}>

        <View style={[styles.search, styles.row, {marginTop: 5}]}>
          <View style={styles.flex_1}>
            <Search placeholder="请输入电影名称" onChangeText={this._changeText.bind(this)}/>
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
    var casts = row.casts;
    var names = [];
    for (var i in casts) {
      names.push(casts[i].name);
    }

    return (
      <View style={[styles.row,styles.item]}>
        <View>
          <Image style={styles.img} source={{uri: row.images.medium}}/>
        </View>
        <View>
          <Text style={styles.textWitdh} numberOfLines={1}>
            名称：{row.title}
          </Text>
          <Text style={styles.textWitdh} numberOfLines={1}>
            演员：{names}
          </Text>
          <Text style={styles.textWitdh} numberOfLines={1}>
            评分：{row.rating.average}
          </Text>
          <Text style={styles.textWitdh} numberOfLines={1}>
            时间：{row.year}
          </Text>
          <Text style={styles.textWitdh} numberOfLines={1}>
            标签：{row.genres}
          </Text>
          <TouchableOpacity style={styles.goDou} onPress={this._goDouBan.bind(this, row.title, row.alt)}>
            <Text>详情</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _getData() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var that = this;
    var baseURL = ServiceURL.movie_search + '?count=10&q=' + this.state.keywords;
    this.setState({
      show: false
    });
    Util.get(baseURL, function (data) {
      if (!data.subjects || !data.subjects.length) {
        return alert('电影服务出错');
      }
      var subjects = data.subjects;
      that.setState({
        dataSource: ds.cloneWithRows(subjects),
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
        backName: '电影',
        title: title,
        url: url
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
    width: 80,
    height: 110,
    resizeMode: Image.resizeMode.contain
  },
  textWitdh: {
    width: 200,
    marginLeft: 10
  },
  item: {
    marginTop: 10,
    height: 140,
    paddingTop: 15,
    paddingLeft: 10,
    borderBottomWidth: Util.pixel,
    borderTopWidth: Util.pixel,
    borderColor: "#ddd"
  },
  goDou: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 60,
    borderWidth: Util.pixel,
    borderColor: '#3C9BFD',
    marginLeft: 30,
    marginTop: 10,
    borderRadius: 3
  }
})