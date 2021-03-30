import React from 'react'
import {View,Text, ActivityIndicator,FlatList,TouchableOpacity,Dimensions,Image,TextInput, ScrollView,Keyboard,TouchableWithoutFeedback, Alert, Button,} from 'react-native'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import PushNotification from "react-native-push-notification";
import Pdf from 'react-native-pdf';


class ViewLesson extends React.Component{
    state = {
        lesson:[]
    }

    componentDidMount(){
        Axios.get('https://mali-lingo.herokuapp.com/view_lesson_app?lesson_id='+this.props.route.params.lesson_id)
        .then(res=>{
            this.setState({lesson:res.data.lesson})
            console.log()
        })
        .catch(err=>console.log(err))
    }
    render(){
        return(
            <View style={{flex:1,alignItems:'center',backgroundColor:'#2E7588',
            alignContent:'center'}}>
           
            
        <View style={{marginTop:50,width:Dimensions.get('window').width*2/2.1,borderRadius:4,backgroundColor:'#5EBEBD',}}>
               <View style={{flexDirection:'row'}}>
              <Text style={{color:'white',fontSize:25,marginLeft:7}}>{this.state.lesson.lesson_title}</Text>
             
             </View>

              <Text style={{height:0,width:'100%',borderColor:'#00ffff',borderWidth:.5,marginTop:5}}> </Text>
              <Text style={{color:'white',fontSize:18,marginBottom:10,marginLeft:5}}>Contents: {this.state.lesson.lesson_text}</Text>
                {this.props.route.params.type == 'pdf'?<Pdf
                horizontal
                source={{uri:'https://mali-lingo.herokuapp.com/static/lessonimages/'+this.state.lesson.lesson_image,caches:true}}
                style={{width:Dimensions.get('window').width*2/2.1, height:460,borderRadius:4}}
               />:<Image
               horizontal
               source={{uri:'https://mali-lingo.herokuapp.com/static/lessonimages/'+this.state.lesson.lesson_image,caches:true}}
               style={{width:Dimensions.get('window').width*2/2.1, height:460,borderRadius:4}}
              />}
                </View>
             
                
                
               


            </View>
        )
    }

}

export default ViewLesson
