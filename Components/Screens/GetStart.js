import React from 'react'
import {View,Text, Button,Dimensions, TouchableWithoutFeedback,Image} from 'react-native'
import main_styles from '../Style/main'
import AwesomeButton from "react-native-really-awesome-button";
import logo from '../Images/logo.png'
class GetStart extends React.Component {
    render() {
        return(
            <View style={main_styles.get_start_page}>
                <Image source={logo} style={{width:200,height:200,marginTop:150}} />



                        
                        <AwesomeButton
                        style={{left:18,marginTop:30,}}
                        
                        width={'90%'}
                        backgroundShadow={null}
                        onPress={()=>this.props.navigation.navigate('Register')}
                        backgroundColor='#5EBEBD'
                        backgroundDarker='#5EBEBD'
                        >
                        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Start</Text>
                        </AwesomeButton>


                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Login')} >
                            <Text style={{color:'white',fontSize:21,top:40,fontWeight:'bold'}}>Already Have An Account</Text>
                        </TouchableWithoutFeedback>
                
            </View>
        )
    
    }
}

export default GetStart