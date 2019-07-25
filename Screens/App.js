import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { RectButton, Button } from 'react-native-gesture-handler';


class App extends Component{

  render(){
    return (
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <Button title="Reload"/>
        </View>
    )
  }
}
export default App;