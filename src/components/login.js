import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

// Login wrapper libraries
import KakaoLogins from '@react-native-seoul/kakao-login';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import dimen from '../res/dimen';
import colors from '../res/colors';

const LOGIN_ACCOUNT = {
  Kakao: 'Kakao',
  Google: 'Google',
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
      case LOGIN_ACCOUNT.Google:
        this.handleGoogleLogin();
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
    console.log('start Kakao login....');
    KakaoLogins.login()
      .then(result => {
        console.log(result);
        console.log(`Login Finished:${JSON.stringify(result)}`);
        console.log('start getting profile....');
        KakaoLogins.getProfile().then(result => {
          console.log(result);
        });
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
  handleGoogleLogin = () => {
    console.log('start Google login....');
    GoogleSignin.configure();
    (async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
      } catch (error) {
        console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    })();
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
