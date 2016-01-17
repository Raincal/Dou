/**
 * Created by raincal on 16/1/17.
 */
import Util from './util'
import React, {
StyleSheet,
View,
Text,
Component
} from 'react-native'

export default class extends Component {
  render() {
    return (
      <View>
        <View style={styles.go}></View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  go: {
    borderLeftWidth: 4 * Util.pixel,
    borderBottomWidth: 4 * Util.pixel,
    width: 15,
    height: 15,
    transform: [{rotate: '45deg'}],
    borderColor: '#FFF',
    marginLeft: 10
  }
})