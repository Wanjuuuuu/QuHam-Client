import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import PropTypes from 'prop-types';

import dimen from '../res/dimen';
import colors from '../res/colors';

export default class Login extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  render() {
    const {style, text} = this.props;
    return (
      <TouchableOpacity style={style} onPress={this.handleFacebookLogin}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
  handleFacebookLogin = () => {
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

const styles = StyleSheet.create({
  text: {
    fontSize: dimen.regularFontSize,
    color: colors.greyText,
  },
});
