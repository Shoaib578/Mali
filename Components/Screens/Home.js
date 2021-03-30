import React from 'react'
import main_styles from '../Style/main'
import {View,Text, ActivityIndicator,FlatList,TouchableOpacity,Dimensions,Image,TextInput, ScrollView,Keyboard,TouchableWithoutFeedback, Alert, Button,} from 'react-native'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import PushNotification from "react-native-push-notification";
import Pdf from 'react-native-pdf';


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  



class Home extends React.Component {


  



    state = {
   
     all_users:[],
     is_loading:true,
     user_info:'',
     lessons:[],
    notifications:[],
    network_error:'',

    }
  
    logout = async()=>{
      await AsyncStorage.removeItem('user')
      this.props.navigation.reset({
         index:0,
         routes:[{name:'GetStart'}]
     })
      
     }
    

check_user_found_or_not = async()=>{
  const user = await AsyncStorage.getItem('user')
  const parse = JSON.parse(user)
  Axios.get('https://mali-lingo.herokuapp.com/get_info_user?user_id='+parse.id)
  .then(res=>{
    console.log(res.data.msg)
    if(res.data.msg == 'found'){
      AsyncStorage.getItem('user')
      .then(data=>{
          const parse = JSON.parse(data)

          parse.user_name = res.data.user_info.user_name
          parse.email = res.data.user_info.email
          parse.gender = res.data.user_info.gender
          parse.phone_no = res.data.user_info.phone_no
          parse.first_name = res.data.user_info.first_name
          parse.last_name = res.data.user_info.last_name
          parse.course_level = res.data.user_info.course_level
          parse.age = res.data.user_info.age
          

          AsyncStorage.setItem( 'user', JSON.stringify( parse ) );
          
      }).done()
    }else{
      this.logout()
    }
  })
}


get_lessons = async()=>{
      const user = await AsyncStorage.getItem('user')
      const parse = JSON.parse(user)

      Axios.get('https://mali-lingo.herokuapp.com/get_lessons?my_course_level='+parse.course_level)
      .then(res=>{
        this.setState({lessons:res.data.lessons,is_loading:false})
        
      })
      .catch(err=>{
        if(err){
          this.setState({network_error:err})
        }
      })
}


reload_page = ()=>{
  this.setState({is_loading:true})

  setTimeout(()=>{
    this.get_lessons()
    
  },1500)
}
    
componentDidMount(){
  this.check_user_found_or_not()
  this.get_lessons()
  this.props.navigation.addListener('focus',()=>{
    this.get_lessons()
  })

  
  
  
  
}
   


   
    
   


    
    render(){
      

        if(!this.state.is_loading){

        return (
          
            <View style={{flex:1,alignItems:'center',backgroundColor:'#2E7588',
            alignContent:'center'}}>
              {this.state.lessons.length>0?<ScrollView>
                <View style={{marginBottom:60}}>
              <FlatList 
              
              data = {this.state.lessons}
              keyExtractor={(item)=>item.lesson_id}
              scrollEnabled={false}
              renderItem={({item})=>{
                
                if(item.lesson_image.split(".")[1].trim()=='pdf'){
             
             return <View style={{marginTop:50,width:Dimensions.get('window').width*2/2.1, borderRadius:4,backgroundColor:'#5EBEBD',}}>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{marginTop:10,left:20,marginBottom:5}} onPress={()=>this.props.navigation.navigate('View Lesson',{lesson_id:item.lesson_id,type:item.lesson_image.split(".")[1].trim()})}>
              <Text style={{color:'white',fontSize:18,}}>{item.lesson_title.substring(0,15)}{item.lesson_title.length>15?'...':null}</Text>
              </TouchableOpacity>
             <Text style={{color:'white',fontSize:12,top:15, left:'100%'}}>posted_date {item.posted_date}</Text>

              </View>

              <Text style={{height:0,width:'100%',borderColor:'#00ffff',borderWidth:.5,marginTop:5}}> </Text>
              <Text style={{color:'white',fontSize:16,marginTop:3,left:5,marginBottom:10}}>Contents: {item.lesson_text.substring(0,50)}{item.lesson_text.length>50?<TouchableOpacity onPress={()=>this.props.navigation.navigate('View Lesson',{lesson_id:item.lesson_id,type:item.lesson_image.split(".")[1].trim()})}><Text style={{color:'white',fontSize:15,top:3}}>.....Read More</Text></TouchableOpacity>:null}</Text>
                <Pdf
                horizontal
                source={{uri:'https://mali-lingo.herokuapp.com/lessonimages/'+item.lesson_image,caches:true}}
                style={{width:Dimensions.get('window').width*2/2.1, height:350,borderRadius:4,}}
               />
               
                </View>
                }else{
                  return <View style={{marginTop:50,width:Dimensions.get('window').width*2/2.1,borderRadius:4,backgroundColor:'#5EBEBD',}}>
                  <View style={{flexDirection:'row'}}>
                    
                  <TouchableOpacity style={{marginTop:10,left:20,marginBottom:5}} onPress={()=>this.props.navigation.navigate('View Lesson',{lesson_id:item.lesson_id,type:item.lesson_image.split(".")[1].trim()})}>
                <Text style={{color:'white',fontSize:15,}}>{item.lesson_title.substring(0,15)}{item.lesson_title.length>15?'...':null}</Text>
                </TouchableOpacity>
               <Text style={{color:'white',fontSize:12,top:15, left:'130%'}}>posted_date {item.posted_date}</Text>
  
                </View>
  
                <Text style={{height:0,width:'100%',borderColor:'#00ffff',borderWidth:.5,marginTop:5}}> </Text>
                <Text style={{color:'white',fontSize:16,marginTop:3,left:5,marginBottom:10}}>Contents: {item.lesson_text.substring(0,50)}{item.lesson_text.length>50?<TouchableOpacity onPress={()=>this.props.navigation.navigate('View Lesson',{lesson_id:item.lesson_id,type:item.lesson_image.split(".")[1].trim()})}><Text style={{color:'white',fontSize:15,top:3}}>.....Read More</Text></TouchableOpacity>:null}</Text>
                  <Image
                  horizontal
                  source={{uri:'https://mali-lingo.herokuapp.com/static/lessonimages/'+item.lesson_image}}
                  style={{width:Dimensions.get('window').width*2/2.1, height:400,borderRadius:4}}
                 />
                  </View>
              

                }



        }
              
      }
              
              />
              </View>
</ScrollView>:
<View>
  <TouchableOpacity style={{alignSelf:'center',marginTop:50}} onPress={()=>this.reload_page()}>
  <Icon name='refresh' color='white' size={30}/>
  </TouchableOpacity>

<Text style={{color:'white',fontSize:20,marginTop:30}}>{this.state.network_error?'Network Error':'You Dont Have Any Lessons yet'}</Text>
<Text style={{color:'white',fontSize:20,textAlign:'center'}}>Reload the Page</Text>

</View>
}
                 

            </View>
         
        )
    }else{
        return <View style={{flex:1,alignItems:'center',backgroundColor:'#2E7588',
        alignContent:'center'}}>
            
            <ActivityIndicator color='#00ffff' size={30} style={{marginTop:40}}/>
            </View>
            
    }

    }
}


export default Home