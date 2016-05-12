/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
/* 
'use strict';

var React = require('react-native');
//var AdPage = require('./AdPage');
var LogIn = require('./LogIn');
//var FBLogin = require('./FBLogin');

var {
  View,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TextArea,
  TouchableHighlight,
  NavigatorIOS,
} = React;

var styles = StyleSheet.create({
  container: {
    //padding: 30,
    marginTop: 20,
    flex: 1,
    //alignItems: 'center'
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  component_account: {
    marginTop: 260,
    marginLeft: 50,
    flexDirection: 'row',
  },
  component_search: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  component_placead: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  button_red: {
    height: 20,
    width: 110,
    marginRight: 5,
    backgroundColor: '#FF0000',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  button_red2: {
    height: 25,
    width: 45,
    backgroundColor: '#FF0000',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  button_red3: {
    height: 25,
    width: 45,
    backgroundColor: '#FF0000',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1
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
  buttonText: {
    fontSize: 9,
    color: 'white',
    alignSelf: 'center',
    fontWeight:'bold',
  },
  searchInput: {
    height: 25,
    padding: 4,
    flex: 5,
    fontSize: 10,
    borderWidth: 1,
    color: '#48BBEC'
  },
  scene: {
        padding: 10,
        paddingTop: 74,
        flex: 1
  },
});


class YouSell extends React.Component {

  render() {
    return (

      <NavigatorIOS ref="nav" style={styles.container} initialRoute={{
        component: HomeScene,
        title: 'Home',
        //rightButtonTitle: 'MORE!',
        //onRightButtonPress: this.onRightButtonPress
      }} />

    ); //end of return
  } //end of render()
}

var HomeScene = React.createClass({

  _onLogInPressed() {
    this.props.navigator.push({
    title: 'Log In',
    component: LogIn
    //component: FBLogin
    })
  },

    render() {
        return (
            <View style={styles.container}>

            <View style={styles.component_search}>
              <TextInput
              style={styles.searchInput}
              //value={this.state.searchString}
              //onChange={this.onSearchTextChanged.bind(this)}
              placeholder='Type Keyword'/>
              <TouchableHighlight style={styles.button_red2} >
                <Text style={styles.buttonText}>SEARCH</Text>
              </TouchableHighlight> 
            </View>

            <View style={styles.component_account}>
              <TouchableHighlight style={styles.button_red} >
                <Text style={styles.buttonText}>POST AN AD FOR FREE</Text>
              </TouchableHighlight> 

              <TouchableHighlight style={styles.button_black} onPress={this._onLogInPressed.bind(this)}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableHighlight> 

              <TouchableHighlight style={styles.button_black} >
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableHighlight> 
            </View>

            <View style={styles.component_placead}>
               <TouchableHighlight style={styles.button_red3} >
                <Text style={styles.buttonText}>+ Place an ad</Text>
              </TouchableHighlight> 
            </View>

          </View>
        );
    }
});

var ForRightScene = React.createClass({
    render() {
        return (
            <View style={[styles.scene, {backgroundColor: '#FFF1E8'}]}>
                <Text>You came here from the "right" button!</Text>
            </View>
        );
    }
});

var ForTouchScene = React.createClass({
    render() {
        return (
            <View style={[styles.scene, {backgroundColor: '#ECF6E8'}]}>
                <Text>You came here from the TouchableHighlight!</Text>
            </View>
        );
    }
});


AppRegistry.registerComponent('YouSell', () => YouSell);*/

'use strict';

var React = require('react-native');
var {
  AppRegistry
} = React;

var YouSell = require('./App/YouSell')
AppRegistry.registerComponent('YouSell', () => YouSell);
