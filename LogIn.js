/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

//import CookieManager from 'react-native-cookies';
//var CookieManager = require('react-native-cookies');
var React = require('react-native');
var simpleAuthClient = require('./lib/simpleauthclient');
var secrets = require('./secrets');
var FBLogin = require('./FBLogin');

var FBSDKLogin = require('react-native-fbsdklogin');

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
    color: '#f2f4f8',
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

class GetInputDetails extends Component {
  render() {
    return (
      <View style={styles.container}>
         <Text style={styles.text}>
           Name: {this.props.name}
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
            {this.state.name}
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

  }
    /* //for AsyncStorage
    AsyncStorage.getItem("email").then((value) => {
      this.setState({"email": value});
    }).done();

    AsyncStorage.getItem("pword").then((value) => {
      this.setState({"pword": value});
    }).done();
  }

  saveEmail (value) {
        AsyncStorage.setItem("email", value);
        this.setState({"email": value});
  }

  savePword (value) {
        AsyncStorage.setItem("pword", value);
        this.setState({"pword": value});
  }*/

  /*componentWillMount () {
    CookieManager.getAll((cookie) => {
      let isAuthenticated;
      // If it differs, change `cookie.remember_me` to whatever the name for your persistent cookie is!!!
      if (cookie && cookie.remember_me) {
        isAuthenticated = true;
      }
      else {
        isAuthenticated = false;
      }

      this.setState({
        loggedIn: isAuthenticated,
        loadedCookie: true
      });
    });
  }*/

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

  _onLoginPressed() {
    this.props.navigator.push({
    title: 'Log In',
    component: LogInEmail,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.loginInput}
            onChangeText={(text) => this.saveEmail({text})}
            value=""
            />
        </View>

        <View>
          <TextInput
            style={styles.loginInput}
            onChangeText={(text) => this.savePword({text})}
            value=""
            //value={this.state.searchString}
            //onChange={this.onSearchTextChanged.bind(this)}
            /*placeholder='Password'*//>
        </View>

        <TouchableHighlight style={styles.button_red2} onPress={this._onLoginPressed.bind(this)}>
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
                alert('Logged in.');
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


module.exports = LogIn;
