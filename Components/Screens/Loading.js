import React, { useRef, useEffect } from 'react';
import {View,Text,Image,Animated} from 'react-native'
import main_styles from '../Style/main'
import logo from '../Images/logo.png'




const Loading = (props) => {


    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
    }, [fadeAnim])
  
    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }
  
  // You can then use your `FadeInView` in place of a `View` in your components:
  export default () => {
    return (
      <View style={main_styles.container}>
        <Loading>
        <Image source={logo} style={{width:220,height:220}} />
        </Loading>
      </View>
    )
  }





