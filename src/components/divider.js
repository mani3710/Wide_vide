import React  from 'react';
import {Text,View} from 'react-native';
export default class Divider extends React.Component{
    render(){
        return(
            <View style={{backgroundColor:"#BDBDBD",height:this.props.height,width:"100%"}}>
            </View>
        );
    }
}
