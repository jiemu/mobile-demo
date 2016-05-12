/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

//import CookieManager from 'react-native-cookies';
//var CookieManager = require('react-native-cookies');
var React = require('react-native');
var simpleAuthClient = require('../lib/simpleauthclient');
var secrets = require('../secrets');
var FBLogin = require('./FBLogin');

var ddpClient = require('./ddp');  
var LoggedIn = require('./LoggedIn');  

var FBSDKLogin = require('react-native-fbsdklogin');
var FBSDKCore = require('react-native-fbsdkcore');

var {
  FBSDKAccessToken,
} = FBSDKCore;

var {
  FBSDKLoginButton,
} = FBSDKLogin;

//for react-native login
/*var express = require('express')
  , passport = require('passport')
  , flash = require('connect-flash')
  , utils = require('./utils')
  , LocalStrategy = require('passport-local').Strategy
  , RememberMeStrategy = require('passport-remember-me').Strategy;*/

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TextArea,
  View,
  Component,
  TouchableHighlight,
  AsyncStorage,
} = React;


class GetInputDetails extends Component {

  render() {
    return (
      <View style={styles.container}>
         <Text style={styles.text}>
           Name: {this.props.username}
         </Text>
      </View>
    )
  }
}

class LogInEmail extends Component {

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Bye {this.state.username}
          </Text>

          <Text style={styles.welcome}>
            You are authenticated!
          </Text>

          <TouchableHighlight style={styles.button_black} >
            <Text style={styles.buttonText}>
              Log Out
            </Text>
          </TouchableHighlight> 
       </View>
    )
  }
}

class LogIn extends Component {
  
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      username: '',
      password: '',
    }; 
  }

  componentDidMount() {
    // Grab the token from AsyncStorage - if it exists then attempt to login with it.
    AsyncStorage.getItem('loginToken')
      .then((res) => {
        if (res) {
          ddpClient.loginWithToken(res, (err, res) => {
            if (res) {
              this.props.changedSignedIn(true);
            } else {
              this.props.changedSignedIn(false);
            }
          });
        }
      });
  }

  handleSignIn() {
    let { username, password } = this.state;
    ddpClient.loginWithEmail(username, password, (err, res) => {
      ddpClient.onAuthResponse(err, res);
      if (res) {
        this.props.changedSignedIn(true);
      } else {
        this.props.changedSignedIn(false);
      }
    });

    // Clear the input values on submit
    this.refs.username.setNativeProps({text: ''}); this.refs.password.setNativeProps({text: ''});
  }

  handleSignUp() {
    let { username, password } = this.state;
    ddpClient.signUpWithEmail(username, password, (err, res) => {
      ddpClient.onAuthResponse(err, res);
      if (res) {
        this.props.changedSignedIn(true);
      } else {
        this.props.changedSignedIn(false);
      }
    });

    // Clear the input values on submit
    this.refs.username.setNativeProps({text: ''});
    this.refs.password.setNativeProps({text: ''});
  }

  _onFBloginPressed() {
    this.props.navigator.push({
    title: 'FB Log In',
    component: FBLogin,
    passProps: {
      authProviders: [
        'facebook',
        'twitter',
      ]
    }
    })
  }

  onLoginPressed() {
    this.props.navigator.push({
    username: this.state.username,
    title: 'Log In',
    component: LogInEmail,
    })
  }

  onButtonPressed() {
    this.props.navigator.push({
    title: 'Logged In',
    component: LoggedIn
    })
  }

  render() {

    return (

      <View style={styles.container}>
        <View>
          <TextInput
            ref = "username"
            placeholder = {"Username"}
            style={styles.loginInput}
            value={this.state.username}
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType='next'
            onChangeText={(username) => this.setState({username: username})}
          />
        </View>

        <View>
          <TextInput
            ref = "password"
            placeholder = {"Password"}
            secureTextEntry={true}
            style={styles.loginInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.password}
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType='done'
            onChangeText={(password) => this.setState({password: password})}
           />
        </View>

        <TouchableHighlight style={styles.button_red2} onPress={this.handleSignIn.bind(this)}>
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </TouchableHighlight> 

        <Text style={styles.description}>
          or
        </Text>

        <FBSDKLoginButton
          style={styles.fbLoginButton}
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                //alert('Logged in.')
                FBSDKAccessToken.getCurrentAccessToken((token) => {
                  console.log(token.tokenString);
                })
                /*go to dashboard or wherever*/
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={[]}/>

        <TouchableHighlight style={[styles.button, styles.twitter]} >
          <Text style={styles.buttonText}>Twitter</Text>
        </TouchableHighlight> 
      </View>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 65,
    padding: 30,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  loginInput: {
    height: 25,
    width: 250,
    padding: 4,
    marginBottom: 10,
    fontSize: 10,
    borderWidth: 1,
    borderColor: '#d1cbda',
    //color: '#f2f4f8',
    color: '#000000',
  },
  button_red2: {
    height: 25,
    width: 250,
    backgroundColor: '#FF0000',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  button_black: {
    height: 25,
    width: 250,
    marginRight: 5,
    backgroundColor: '#000000',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  button: {
    height: 25,
    width: 250,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    fontWeight:'bold',
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  facebook: {
    backgroundColor: '#3b5998'
  },
  twitter: {
    backgroundColor: '#48BBEC'
  },
  fbLoginButton: {
    height: 25,
    width: 250,
    marginBottom: 10,
  },

});


module.exports = LogIn;
