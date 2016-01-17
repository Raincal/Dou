import Util from './../common/util'
import ServiceURL from './../common/service'
import BookItem from './book_item'
import Header from './../common/header'
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

export default class extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    var id = this.props.id;
    var that = this;
    var url = ServiceURL.book_search_id + '/' + id;
    Util.get(url, function (data) {
      that.setState({
        data: data
      });
    }, function (err) {
      alert(err);
    });
  }

  render() {
    return (
      <ScrollView style={{height: Dimensions.get('window').height}}>
        {
          this.state.data ?
            <View>
              <Header
                navigator={this.props.navigator}
                initObj={{
                    backName: '图书',
                    title: this.state.data.title
                }}/>
              <BookItem row={this.state.data}/>
              <View>
                <Text style={[styles.title]}>图书简介</Text>
                <Text style={styles.text}>{this.state.data.summary}</Text>
              </View>

              <View>
                <Text style={[styles.title]}>作者简介</Text>
                <Text style={styles.text}>{this.state.data.author_intro}</Text>
              </View>
              <View style={{height:50}}></View>
            </View>
            : Util.loading
        }
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    color: '#000D22'
  }
});