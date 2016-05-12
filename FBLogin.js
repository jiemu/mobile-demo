/**
 * Sample React Native App using react-native-simple-auth.
 * To run on a mac from the project home dir:
 *
 * 1. Create secrets.js from secrets.example.js template
 * 2. `npm install`
 * 3. `pod install`
 * 3. `open ./ReactNativeSimpleAuth.xcworkspace/`
 * 4. Then in xcode hit cmd + r
 *
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');
let simpleAuthClient = require('./lib/simpleauthclient');
let secrets = require('./secrets');

var {
  View,
  TouchableHighlight, 
  Component,
  StyleSheet,
  Text,
} = React;


class Profile extends Component {

  constructor(props) {
    props.token = props.info.token;
    delete props.info.token;
    super(props);
    this.state = {
      //name: this.getName(props.provider),
      picture: this.getPictureLink(props.provider)
    };
  }

  render() {
    return (
      <View style={styles.content}>
        <React.Image style={styles.pic} source={{uri: this.state.picture }} />
        <Text style={styles.header}>{this.state.name}</Text>
        <View style={styles.scroll}>
          <Text style={styles.mono}>{JSON.stringify(this.props.info, null, 4)}</Text>
        </View>
      </View>
    )
  }

  getPictureLink(provider) {
    switch (provider) {
      case 'facebook':
        return `http://graph.facebook.com/${this.props.info.id}/picture?type=square`
      case 'twitter':
        return this.props.info.profile_image_url;
    }
  }

}

class FBLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    simpleAuthClient.configure(secrets);
  }

  render() {
    return (
      <View style={styles.content}>
        {
          this.state.loading ? null : this.props.authProviders.map(provider => {
            return (
              <TouchableHighlight
                style={[styles.button, styles[provider]]}
                onPress={this.onBtnPressed.bind(this, provider)}>
                <Text style={[styles.buttonText]}>{provider.split('-')[0]}</Text>
              </TouchableHighlight>
            );
          })
        }
        <React.ActivityIndicatorIOS
            animating={this.state.loading}
            style={[styles.loading]}
            size='large' />
      </View>
    );
  }

  onBtnPressed(provider) {
    this.setState({
      loading: true
    });
    simpleAuthClient.authorize(provider)
      .then(info => {
        this.props.navigator.push({
          title: provider,
          component: Profile,
          passProps: {
            info: info,
            provider: provider
          }
        });
        this.setState({
          loading: false
        });
      })
      .catch(error => {
          React.AlertIOS.alert(
              'Authorize Error',
              error && error.description || 'Unknown');
        this.setState({
          loading: false
        });
      });
  }

}

/*class FBLogin extends Component {

  constructor(props) {
    super(props);
  }

   _onFBloginPressed() {
    this.props.navigator.push({
    title: 'FB Log In',
    component: Login,
    passProps: {
      authProviders: [
              'google-web',
              'facebook',
              'twitter',
              'instagram',
              'tumblr',
              'linkedin-web'
            ]
    }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button_black} onPress={this._onFBloginPressed.bind(this)}>
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableHighlight> 
      </View>

      /*<React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Simple Auth',
          component: Login,
          passProps: {
            authProviders: [
              'google-web',
              'facebook',
              'twitter',
              'instagram',
              'tumblr',
              'linkedin-web'
            ]
          }
        }}/>
    );
  }
}
*/

let styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    marginTop: 80,
    marginRight: 10,
    marginLeft: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  },
  pic: {
    width: 100,
    height: 100
  },
  mono: {
    fontFamily: 'Menlo',
    paddingTop: 10
  },
  scroll: {
    marginTop: 0,
    paddingTop: 0,
    backgroundColor: '#f2f2f2',
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row'
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  facebook: {
    backgroundColor: '#3b5998'
  },
  twitter: {
    backgroundColor: '#48BBEC'
  },
  button_black: {
    height: 20,
    width: 45,
    marginRight: 5,
    backgroundColor: '#000000',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

//React.AppRegistry.registerComponent('ReactNativeSimpleAuth', () => ReactNativeSimpleAuth);
module.exports = FBLogin;
