import React from 'react'
import {View,Text,TouchableOpacity,Image,Dimensions, ScrollView} from 'react-native'
import Axios from 'axios'
import main_styles from '../Style/main'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AwesomeButton from "react-native-really-awesome-button";
import Icon from 'react-native-vector-icons/FontAwesome'
class Account extends React.Component {

   state = {
       user_info:[]
   }

    UserInfo = async()=>{
    const user = await AsyncStorage.getItem('user')
    const parse = JSON.parse(user)
    this.setState({user_info:parse})
    
    }

    logout = async()=>{
     await AsyncStorage.removeItem('user')
     this.props.navigation.reset({
        index:0,
        routes:[{name:'GetStart'}]
    })
     
    }

    async componentDidMount(){
      await  this.UserInfo()
       
    }
    render(){
        return (
            <ScrollView>
            <View style={{flex:1,alignItems:'center',backgroundColor:'#2E7588',
            alignContent:'center',}}>
                   
            
                
                {/* First Name */}
                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:80,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>First Name : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{this.state.user_info.first_name}</Text>
                  </View>

                 </View>


                 {/* Last Name */}

                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>Last Name : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{this.state.user_info.last_name}</Text>
                  </View>

                 </View>

                 {/* User Name */}



                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>User Name : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{this.state.user_info.user_name}</Text>
                  </View>

                 </View>

               

                 {/* Gender */}

                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>Gender : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{this.state.user_info.gender}</Text>
                  </View>

                 </View>

                 {/* Age */}

                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>Age : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{this.state.user_info.age}</Text>
                  </View>

                 </View>


                 {/* Course Level */}

                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:18,}}>Course Level : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:18,left:5}}>{this.state.user_info.course_level}</Text>
                  </View>

                 </View>







                 <AwesomeButton
                        style={{alignSelf:'center',marginTop:30,left:'4.5%',marginBottom:60}}
                        
                        width={'90%'}
                        backgroundShadow={null}
                        onPress={this.logout}
                        backgroundColor='#5EBEBD'
                        backgroundDarker='#5EBEBD'
                        >
                        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Logout</Text>
                        </AwesomeButton>
                

            </View>
            </ScrollView>
        )
    }
}

export default Account