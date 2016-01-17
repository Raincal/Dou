/**
 * Created by raincal on 16/1/17.
 */
import Util from './util'
import React, {
  StyleSheet,
  TextInput,
  View,
  Component
} from 'react-native'

export default class extends Component {
  render() {
    return (
      <View style={styles.flex_1}>
        <TextInput style={[styles.flex_1, styles.input]} {...this.props}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  flex_1: {
    flex: 1
  },
  input: {
    borderWidth: Util.pixel,
    height: 45,
    borderColor: '#DDDDDD',
    paddingLeft: 5
  }
});