import React from 'react'
import main_styles from '../Style/main'
import {View,Text,TextInput,Dimensions,Image,TouchableOpacity,Alert,TouchableWithoutFeedback,Keyboard,
     ScrollView,Picker} from 'react-native'
import AwesomeButton from "react-native-really-awesome-button";
import pick_account_image from '../Images/pick_account_image.png'
import Axios from 'axios'
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

class Register extends React.Component {
   
   

    
    state = {
        username:'',
        email:'',
        password:'',
        profile_pic: pick_account_image,
        phone_no:'',
        age:'',
        course_level:'',
        first_name:'',
        last_name:'',
        gender:'',
        level_count:[ 1, 2, 3, 4, 5, 6, 7, 8, 9,'special course level'],
        age_count:[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],

        //Errors
        phone_no_error_state:'',
        first_name_error_state:'',
        last_name_error_state:'',
        age_error_state:'',
        course_level_error_state:'',
        gender_error_state:'',
        username_error_state:'',
        email_error_state:'',
        password_error_state:'',
       
    }







 //<--------Start Validation----------->

 validate = () =>{
    let username_error = ''
    let email_error = ''
    let password_error = ''
  
    let phone_no_error = ''
    let first_name_error = ''
    let last_name_error = ''
    let course_level_error = ''
    let age_error = ''
    let gender_error = ''
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.username.length<=8){
        username_error = 'Username Must Be at least 8 characters'
    }


    if(this.state.course_level.length<1){
        course_level_error = 'Please Select your Course Level'
    }

    if(this.state.age.length<1){
     age_error = 'Please Select Your Age'
    }

    if(this.state.gender.length<1){
        gender_error = 'Please Select our Gender'
    }

    if(this.state.first_name.length<5){
        first_name_error = 'First Name Must Be at least 5 characters'
    }

    if(this.state.last_name.length<5){
        last_name_error = 'Last Name Must Be at least 5 characters'
    }


    if(reg.test(this.state.email) == false){
     email_error = 'Invalid Email'
    }

    var phoneno = /^\d{10}$/;
    if(phoneno.test(this.state.phone_no) == false){
        phone_no_error ='Invalid Phone Number'
    }

    if(this.state.password.length<=8){
        password_error = 'Password Must Be at least 8 characters'
    }

    if(username_error || email_error || password_error  || phone_no_error || gender_error || first_name_error || last_name_error || age_error || course_level_error){
        this.setState({username_error_state: username_error, email_error_state: email_error,
            password_error_state: password_error, 
            phone_no_error_state:phone_no_error,gender_error_state:gender_error,first_name_error_state:first_name_error,
            last_name_error_state:last_name_error,age_error_state:age_error,course_level_error_state:course_level_error


        
        })
        return false
    }

    return true


}

//<--------End Validation----------->







//<-----Register User Start------->

Register = (event)=>{
    
    let is_validate = this.validate()
    if(is_validate){
    this.setState({ username_error_state:'',
    email_error_state:'',
    password_error_state:'',
   
    phone_no_error_state:'',
    first_name_error_state:'',
    last_name_error_state:'',
    age_error_state:'',
    course_level_error_state:'',
    gender_error_state:'',



})

    
    let formData = new FormData()
    formData.append('username',this.state.username)
    formData.append('email',this.state.email)
    formData.append('password',this.state.password)
    formData.append('first_name',this.state.first_name)
    formData.append('last_name',this.state.last_name)
    formData.append('age',this.state.age)
    formData.append('phone_no',this.state.phone_no)
    formData.append('course_level',this.state.course_level)
    formData.append('gender',this.state.gender)

    
    
    Axios.post('https://mali-lingo.herokuapp.com/register_user',formData)
    .then(res=>{
        if(res.data == 'You are Registered Successfully'){
            this.setState({email:'',password:'',username:'',profile_pic:pick_account_image,
            phone_no:'',
            age:'',
            course_level:0,
            first_name:'',
            last_name:'',
            gender:'',
        
            })
           
        }
           
        
       
        Alert.alert(res.data)
        
    })
    .catch(err=>console.log(err))
    
    }
}



//<-----Register User End------->













    render(){



        let ageItems = this.state.age_count.map( (s, i) => {
            return <Picker.Item key={i} value={s.toString()} label={s.toString()} />
        });

        let levelItems = this.state.level_count.map( (s, i) => {
            return <Picker.Item key={i} value={s.toString()} label={s.toString()} />
        });

       


        return (
            <DismissKeyboard>
                <ScrollView>
            <View style={{flex:1,alignItems:'center',backgroundColor:'#2E7588',
            alignContent:'center'}}>
             

         


           <TextInput placeholder='First Name' placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:30,padding:15,color:'white',backgroundColor:'#5EBEBD',fontSize:15}} onChangeText={(val)=>this.setState({first_name:val})} value={this.state.first_name}/>

           <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.first_name_error_state}</Text>


           <TextInput placeholder='Last Name'  placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,padding:15,color:'white',backgroundColor:'#5EBEBD',fontSize:15}} onChangeText={(val)=>this.setState({last_name:val})} value={this.state.last_name}/>

           <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.last_name_error_state}</Text>

           
           <TextInput placeholder='Username' placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,padding:15,color:'white',backgroundColor:'#5EBEBD',fontSize:15}} onChangeText={(val)=>this.setState({username:val})} value={this.state.username}/>
           <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.username_error_state}</Text>
           <TextInput placeholder='Email' placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,padding:15,color:'white',backgroundColor:'#5EBEBD',fontSize:15}} onChangeText={(val)=>this.setState({email:val})} value={this.state.email}/>

           <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.email_error_state}</Text>

           <TextInput placeholder='Password' secureTextEntry placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,padding:15,color:'white',backgroundColor:'#5EBEBD',fontSize:15}} onChangeText={(val)=>this.setState({password:val})} value={this.state.password}/>

           <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.password_error_state}</Text>







           <TextInput placeholder='Phone Number'  placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,padding:15,color:'white',backgroundColor:'#5EBEBD',fontSize:15}} onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.phone_no}/>

           <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.phone_no_error_state}</Text>


           <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,color:'white',backgroundColor:'#5EBEBD',fontSize:15}}>

            <Picker selectedValue={this.state.course_level} onValueChange={(val)=>this.setState({course_level:val})}  style={{fontSize:15,color:'white'}} >
            <Picker.Item label='Select Your Course Level' value=''/>

            {levelItems}
            

            </Picker>
            </View>

           <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.course_level_error_state}</Text>


           <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,color:'white',backgroundColor:'#5EBEBD',fontSize:15}}>

            <Picker selectedValue={this.state.gender} onValueChange={(val)=>this.setState({gender:val})}  style={{fontSize:15,color:'white'}} >
            <Picker.Item label='Select  Your Gender' value=''/>
            <Picker.Item label='Male' value='Male'/>
            <Picker.Item label='Female' value='Female'/>
            

            </Picker>
            </View>

           <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.gender_error_state}</Text>


           <View style={{width:Dimensions.get('window').width*2/2.5,height:50,borderRadius:4,borderColor:'#5EBEBD',borderWidth:.5,marginTop:20,color:'white',backgroundColor:'#5EBEBD',fontSize:15}}>

        <Picker selectedValue={this.state.age} onValueChange={(val)=>this.setState({age:val})}  style={{fontSize:15,color:'white'}} >
        <Picker.Item label='Choose Your Age' value='' style={{color:'white'}}/>

        {ageItems}


        </Picker>
        </View>

        <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.age_error_state}</Text>

           <AwesomeButton
                        height={50}
                        style={{top:30,marginBottom:100}}
                        width={Dimensions.get('window').width*2/2.5}
                        backgroundShadow={null}
                        onPress={this.Register}
                        backgroundColor='#5EBEBD'
                        backgroundDarker='#5EBEBD'
                        >
                        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>Register</Text>
                        </AwesomeButton>
                        
            </View>
            </ScrollView>
            </DismissKeyboard>
        )
    }
}


export default Register