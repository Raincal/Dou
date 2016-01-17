/**
 * Created by raincal on 16/1/17.
 */
import React, {
  StyleSheet,
  Text,
  View,
  Navigator,
  Component
} from 'react-native';

export default class extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{name: '', component: this.props.component, index: 0}}
        configureScene={() => {return Navigator.SceneConfigs.FloatFromBottom}}
        renderScene={(route, navigator) => {
          const Component = route.component;
          return (
            <View>
              <Component navigator={navigator} route={route} {...route.passProps}/>
            </View>
          )
        }}>
      </Navigator>
    )
  }
}