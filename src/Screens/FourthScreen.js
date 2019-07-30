import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';

class FourthScreen extends React.Component{
  
  static navigationOptions = {
    title: 'Fourth',
    headerStyle:{backgroundColor: 'green'}
  }
  render(){
    return(
      <TouchableOpacity style={styles} onPress={()=> this.props.navigation.navigate('Home')}>
        <Text> Screen 4 </Text>
        <Text> Go Back to Home </Text>
      </TouchableOpacity>
    )
  }
}

const styles = {
  flex:1, 
  justifyContent:'center', 
  alignItems:'center' 
}

export default FourthScreen;