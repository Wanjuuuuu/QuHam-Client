import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {LOGIN_ACCOUNT, Login} from './src/components/login';
import colors from './src/res/colors';
import strings from './src/res/strings';
import dimen from './src/res/dimen';

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.startGreeting}</Text>
          <Image
            style={styles.image}
            source={{
              uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
            }}
          />
        </View>
        <View style={styles.boxContainer}>
          <Login
            style={styles.kakaoButton}
            textStyle={styles.text}
            account={LOGIN_ACCOUNT.Kakao}
            text={strings.startWithKakao}></Login>
          <Login
            style={styles.loginButton}
            textStyle={styles.text}
            account={LOGIN_ACCOUNT.Naver}
            text={strings.startWithNaver}></Login>
          <Login
            style={styles.facebookButton}
            textStyle={styles.text}
            account={LOGIN_ACCOUNT.Facebook}
            text={strings.startWithFacebook}></Login>
        </View>
      </View>
    );
  }
}

const loginButton = {
  height: dimen.startWithAccountBox.height,
  width: dimen.startWithAccountBox.width,
  borderRadius: dimen.borderRadius,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: dimen.startWithAccountBox.marginBottom,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 2,
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: dimen.largeFontSize,
    fontWeight: 'bold',
    color: colors.blue,
    marginTop: dimen.startTitle.marginTop,
    textAlign: 'center',
  },
  image: {
    height: dimen.startAppImage.height,
    width: dimen.startAppImage.width,
    marginTop: dimen.startAppImage.marginTop,
  },
  loginButton,
  kakaoButton: {
    ...loginButton,
    backgroundColor: '#F8E71C',
  },
  facebookButton: {
    ...loginButton,
    backgroundColor: '#4267B2',
  },
  text: {
    fontSize: dimen.smallFontSize,
    color: colors.greyText,
  },
});
