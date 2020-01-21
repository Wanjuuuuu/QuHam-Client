import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

// Login wrapper libraries
import KakaoLogins from '@react-native-seoul/kakao-login';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import dimen from '../res/dimen';
import colors from '../res/colors';

const LOGIN_ACCOUNT = {
  Kakao: 'Kakao',
  Naver: 'Naver',
  Facebook: 'Facebook',
};

class Login extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  render() {
    const {style, textStyle, account, text} = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          this.handleLogin(account);
        }}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
  handleLogin = account => {
    switch (account) {
      case LOGIN_ACCOUNT.Kakao:
        this.handleKakaoLogin();
        break;
      case LOGIN_ACCOUNT.Naver:
        break;
      case LOGIN_ACCOUNT.Facebook:
        this.handleFacebookLogin();
        break;
      default:
        console.log('Invalid Login Account');
        break;
    }
  };
  handleKakaoLogin = () => {
    KakaoLogins.login()
      .then(result => {
        console.log(result);
        console.log(`Login Finished:${JSON.stringify(result)}`);
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log(`Login Cancelled:${error.message}`);
        } else {
          console.log(`Login Failed:${error.code} ${error.message}`);
        }
      });
  };
  handleFacebookLogin = () => {
    console.log('start Facebook login....');
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_birthday',
    ])
      .then(result => {
        console.log(result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            `Login success with permissions: ${result.grantedPermissions.toString()}`,
          );
          AccessToken.getCurrentAccessToken().then(data => {
            if (data) {
              console.log(data.accessToken.toString());
            } else {
              console.log('There is no accessToken');
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export {LOGIN_ACCOUNT, Login};
