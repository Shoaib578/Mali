import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {View,Image,Text,TouchableOpacity,TextInput,Keyboard} from 'react-native'

import main_styles from '../Style/main'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import GetStart from './GetStart'

import Account from './Account'
import Icon from 'react-native-vector-icons/FontAwesome';
import Notifications from './notifications'
import Loading from './Loading'
import ViewLesson from './ViewLesson'
import Result from './Result'
import Axios from 'axios';



const LoggedinStack = createStackNavigator()
const WithoutLoggedinStack = createStackNavigator()
const HomeStack = createStackNavigator()



class Routes extends React.Component{
   
    state = {
        is_loggedin : false,
        is_loading : true,
        profile_pic :'',
        user_id:'',
        have_notifications:false
     
    }

    
    CheckUserLoggedIn = async()=>{
      const user = await AsyncStorage.getItem('user')
      const parse = JSON.parse(user)
     
      if(parse == null){
          this.setState({is_loggedin:false})
      }else{
          this.setState({is_loggedin:true,profile_pic:parse.profile_pic,user_id:parse.user_id})
      }
    }


    check_for_notificatiots = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        Axios.get('https://mali-lingo.herokuapp.com/get_exam_notifications?my_course_level='+parse.course_level)
        .then(res=>{
            if(res.data.exam_notifications.is_end == 'no'){

                this.setState({have_notifications:true})
            }
            
        })
        .catch(err=>console.log(err))


        Axios.get('https://mali-lingo.herokuapp.com/get_class_notifications?my_course_level='+parse.course_level)
        .then(res=>{
            if(res.data.class_notification.is_end == 'no'){
                this.setState({have_notifications:true})
            }
        })
        .catch(err=>console.log(err))





    }



     componentDidMount(){
        
        setTimeout(()=>{
            this.setState({is_loading:false})
        },1200)
       
         this.CheckUserLoggedIn()

  
         this.check_for_notificatiots()

        
         



    }
  
    header_right = (navigation)=>(
        
   
        
        <View style={{flexDirection:'row'}}>

       <TouchableOpacity style={{marginRight:10}} onPress={()=>navigation.navigate('Notifications')}>
        <Icon name='bell' color='#5EBEBD' size={35} style={{marginRight:20}} />
        {this.state.have_notifications?<Text style={{width:10,height:10,borderRadius:100,backgroundColor:'#006400',left:20}}></Text>:null}
        </TouchableOpacity>
        
       <TouchableOpacity style={{marginRight:10}} onPress={()=>navigation.navigate('Result')}>
        <Icon name='list-alt' color='#5EBEBD' size={35} style={{marginRight:20}} />
        
        </TouchableOpacity>

  <TouchableOpacity style={{marginRight:10}} onPress={()=>navigation.navigate('Account',{user_id:this.state.user_id})}>
        <Icon name='user-circle' color='#5EBEBD' size={35} style={{marginRight:20}} />
        
        </TouchableOpacity>

        </View>
       
    )




 

    

  HomeStackScreen = ({navigation})=>(
      <HomeStack.Navigator  screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
      <HomeStack.Screen name='Home' component={Home} options={{headerTransparent:false,headerTintColor:'white',headerRight:()=>this.header_right(navigation),headerStyle:{backgroundColor:'#2E7588'}}}/>
      <HomeStack.Screen name='Account' component={Account} options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#2E7588'}}}/>
     
      <HomeStack.Screen name='View Lesson' component={ViewLesson} options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#2E7588'}}}/>
      <HomeStack.Screen name='Result' component={Result} options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#2E7588'}}}/>
      <HomeStack.Screen name='Notifications' component={Notifications} options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#2E7588'}}}/>
     
    
     {/* After Logout */}
      <WithoutLoggedinStack.Screen name='GetStart' component={GetStart} options={{headerShown:false}}/>
      <WithoutLoggedinStack.Screen name='Register' component={Register} options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#2E7588'}}}/>
      <WithoutLoggedinStack.Screen name='Login' component={Login} options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#2E7588'}}}/>

      </HomeStack.Navigator>
  )


  
    render(){
        if(!this.state.is_loading){

        return (
        <NavigationContainer>
        {this.state.is_loggedin ?
        //If User Was Logged In Then Run This Thing
        <LoggedinStack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
         <LoggedinStack.Screen name='Home' component={this.HomeStackScreen} options={{headerTransparent:false,headerTintColor:'white',headerShown:false,}}/>
         
         

        </LoggedinStack.Navigator>

        //Else Run This Thing
       :
       <WithoutLoggedinStack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}>
      <WithoutLoggedinStack.Screen name='GetStart' component={GetStart} options={{headerShown:false}}/>
      <WithoutLoggedinStack.Screen name='Register' component={Register} options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#2E7588'}}}/>
      <WithoutLoggedinStack.Screen name='Login' component={Login} options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#2E7588'}}}/>
     {/* After Login */}

     <LoggedinStack.Screen name='Home' component={this.HomeStackScreen} options={{headerTransparent:false,headerTintColor:'white',headerShown:false}}/>

       </WithoutLoggedinStack.Navigator>
        }
        </NavigationContainer>
        )
    }else{
        return <Loading />
    }

    }
}

export default Routes