import React from 'react'
import {View,Text,Dimensions, FlatList} from 'react-native'
import Axios from 'axios'
import main_styles from '../Style/main'
import AsyncStorage from '@react-native-async-storage/async-storage'


class Notifications extends React.Component {

    state ={
        exam_notifications:[],
        class_notifcation:[]
    }
    get_notifications = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)

        Axios.get('https://mali-lingo.herokuapp.com/get_exam_notifications?my_course_level='+parse.course_level)
        .then(res=>{
            this.setState({exam_notifications:res.data.exam_notifications})
            console.log(this.state.exam_notifications)
        })
        .catch(err=>console.log(err))



        Axios.get('https://mali-lingo.herokuapp.com/get_class_notifications?my_course_level='+parse.course_level)
        .then(res=>{
            this.setState({class_notifcation:res.data.class_notification})
        })
        .catch(err=>console.log(err))

    }

    componentDidMount(){
    
        this.get_notifications()

    
    }

    render() {
        return (
            <View style={main_styles.get_start_page}>
            
            {this.state.exam_notifications.is_end == 'no'?<View style={{width:Dimensions.get('window').width*2/2.3,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:80,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:15,}}>Your Exams Start at {this.state.exam_notifications.exam_start_at} Come and Join the Exam</Text>
                 </View>
                 </View>:null}

                 {this.state.class_notifcation.is_end == 'no'?<View style={{width:Dimensions.get('window').width*2/2.3,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:15,}}>Your Class Start at {this.state.class_notifcation.class_start_at} Come and Join the Class</Text>
                 </View>
                 </View>:null}

                

            </View>
        )
    }
}


export default Notifications