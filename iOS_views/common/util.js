/**
 * Created by raincal on 16/1/17.
 */
import Dimensions from 'Dimensions';
import React, {
  PixelRatio,
  ActivityIndicatorIOS,
} from 'react-native'

export default {
  pixel: 1 / PixelRatio.get(),

  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  get: (url, successCallback, failCallback) => {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText))
      })
      .catch((err) => {
        failCallback(err)
      })
  },

  loading: <ActivityIndicatorIOS color="#3E00FF"
                                 style={{ marginTop: 64 }}/>
};