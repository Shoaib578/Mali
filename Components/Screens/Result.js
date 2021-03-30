import React from 'react'
import {View,Text,Image,Dimensions} from 'react-native'
import Axios from 'axios'
import main_styles from '../Style/main'
import AsyncStorage from '@react-native-async-storage/async-storage'


class Result extends React.Component{

    state ={
        result:[]
    }
    get_result = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        Axios.get('https://mali-lingo.herokuapp.com/get_result?my_id='+parse.id)
        .then(res=>{
         this.setState({result:res.data.result})
        
        })
        .catch(err=>console.log(err))
    }

  componentDidMount(){
     this.get_result()
        
    }

    render() {
        return (
            <View style={main_styles.get_start_page}>
            
                {this.state.result.length>0? this.state.result.map(data=>(
                    <View>
                    <Text style={{color:'white',fontSize:20,marginTop:50}}>{data.user_name} Your Result is Here</Text>

                    <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>GE Marks : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{data.ge_marks}</Text>
                  </View>

                 </View>



                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>DIP Marks : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{data.dip_marks}</Text>
                  </View>

                 </View>




                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>SC Marks : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{data.sc_marks}</Text>
                  </View>

                 </View>



                 <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,backgroundColor:'#5EBEBD',fontSize:15,flexDirection:'row'}}>
                 
                 <View style={{bottom:6}}>
                 <Text style={{color:'white',fontSize:20,}}>Course Level : </Text>
                 </View>

                     <View style={{bottom:6}}>
                         
                  <Text style={{color:'white',fontSize:20,left:5}}>{data.course_level}</Text>
                  </View>

                 </View>








                    </View>
                )):<Text style={{color:'white',fontSize:25,marginTop:50}}>We Did'nt get your Result</Text>}
            </View>
        )
    }
}

export default Result