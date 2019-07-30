import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet} from "react-native";

class Button extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.props.onPress()}>
                    <Text style={styles.button}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor:'#F5E201',
        color:'#333',
        textAlign:'center',
        paddingHorizontal:15,
        height:44,
        borderRadius:3,
        fontSize:15,
        fontWeight:'bold',
        textTransform:'uppercase',
        lineHeight:44,
        borderWidth:0.5,
        borderColor:'grey',
    }
});