import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';

class ThirdScreen extends React.Component{
  
  static navigationOptions = {
    title: 'Third',
    headerStyle:{backgroundColor: 'yellow'}
  }

  render(){
    return(
      <TouchableOpacity style={styles} onPress={()=> this.props.navigation.navigate('Screen4')}>
        <Text> Screen 3 </Text>
      </TouchableOpacity>
    )
  }
}


const styles = {
  flex:1, 
  justifyContent:'center', 
  alignItems:'center' 
}

export default ThirdScreen;