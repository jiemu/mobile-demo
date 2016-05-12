'use strict';

var React = require('react-native');
var ddpClient = require('./ddp');  

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

class LoggedIn extends Component {

  handleSignOut() {
    ddpClient.logout(() => {
      this.props.changedSignedIn(false)
    });
  }

	render() {
    	return (
    		<View style={styles.container}>
    			 <Text style={styles.description} >Logged In</Text>

           <TouchableHighlight style={styles.button_red2} onPress={this.handleSignOut.bind(this)}>
          <Text style={styles.buttonText}>
            Log Out
          </Text>
        </TouchableHighlight> 
        
    		</View>
    	)
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
  button_red2: {
    height: 25,
    width: 250,
    backgroundColor: '#FF0000',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    fontWeight:'bold',
  },
});

module.exports = LoggedIn;