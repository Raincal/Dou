import Util from './../common/util'
import ServiceURL from './../common/service'
import Search from './../common/search'
import BookItem from './book_item'
import BookDetail from './book_detail'
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

export default class extends Component {
  // 构造
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // 初始状态
    this.state = {
      dataSource: ds.cloneWithRows([]),
      keywords: 'react',
      show: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <ScrollView style={{height: Dimensions.get('window').height}}>

        <View style={[styles.search, styles.row, {marginTop: 5}]}>
          <View style={styles.flex_1}>
            <Search placeholder="请输入图书的名称" onChangeText={this._changeText.bind(this)}/>
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

  //渲染图书列表项
  _renderRow(row) {
    return (
      <BookItem row={row} onPress={this._loadPage.bind(this, row.id)}/>
    );
  }

  _changeText(val) {
    this.setState({
      keywords: val
    });
  }

  _search() {
    this.getData();
  }

  //根据关键字查询
  getData() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var that = this;
    var baseURL = ServiceURL.book_search + '?count=10&q=' + this.state.keywords;
    //开启loading
    this.setState({
      show: false
    });
    Util.get(baseURL, function (data) {
      if (!data.books || !data.books.length) {
        return alert('图书服务出错');
      }
      var books = data.books;
      that.setState({
        dataSource: ds.cloneWithRows(books),
        show: true
      });
    }, function (err) {
      alert(err);
    });
  }

  _loadPage(id) {
    this.props.navigator.push({
      component: BookDetail,
      passProps: {
        id: id
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
  }
});
