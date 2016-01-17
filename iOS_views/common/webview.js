/**
 * Created by raincal on 16/1/17.
 */
import Util from './util'
import Header from './header'
import Dimensions from 'Dimensions'
import React, {
  View,
  WebView,
  Component
} from 'react-native'

export default class extends Component {
  render() {
    return (
      <View>
        <Header
          navigator={this.props.navigator}
          initObj={{
            backName: this.props.backName,
            title: this.props.title
          }}/>
        <WebView
          contentInset={{top: -40}}
          startInLoadingStart={true}
          style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 50}}
          url={this.props.url}>
        </WebView>
      </View>
    )
  }
}