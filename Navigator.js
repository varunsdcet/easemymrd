import React, {Component} from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';

import Splash from './Splash'
import Slider from './Slider'
import Login from './Login'
import Signup from './Signup'
import Otp from './Otp'
import Location from './Location'
import Home from './Home'
import MyAccount from './MyAccount'
import ConsultNow from './ConsultNow'
import MyAccountEdit from './MyAccountEdit'
import AddMember from './AddMember'
import LoginViaEmail from './LoginViaEmail'
import MyConsultations from './MyConsultations'
import ConsultationDetails from './ConsultationDetails'
import MemberList from './MemberList'
import HelpCenter from './HelpCenter'
import Notification from './Notification'
import AddHealthProfile from './AddHealthProfile'
import FindAndBook from './FindAndBook'
import Agreement from './Agreement'
import SuccessScreen from './SuccessScreen'
import ViewNews from './ViewNews'
import Payment from './Payment'
import ChooseDoctor from './ChooseDoctor'
import MyMedReports from './MyMedReports'
import ChooseHospital from './ChooseHospital'
import Summary from './Summary'
import DoctorDetails from './DoctorDetails'
import ViewPdf from './ViewPdf'
import ViewAllDoctor from './ViewAllDoctor'
import ViewAllHospitals from './ViewAllHospitals'
import ViewAllSpeciality from './ViewAllSpeciality'
import ViewAllSymptoms from './ViewAllSymptoms'
import ViewAllNews from './ViewAllNews'
import Chat from './Chat'
import ShowMember from './ShowMember'
import VideoCall from './VideoCall'

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const anim = new Animated.Value(0)

const handleAnimation = () => {
        Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true
        }).start()

}


const Tab = createBottomTabNavigator();

function Tabs() {
  return (
      <Tab.Navigator
      shifting={true}
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let yesFoc;
            if (route.name === 'Home') {

              if(focused){
             yesFoc= <Animated.View style={{backgroundColor:'#1976D2', height:4, width:60, position:'absolute',top:-6, alignSelf:'center', borderRadius:5,
  transform: [
                            {
                                translateX: anim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 120]
                                })
                            },
          ]
       }}/>

              iconName=require('./resources/bottomtab/home_active.png')
              }else{
              iconName= require('./resources/bottomtab/home_inactive.png')
              }

            } else if(route.name === 'Consult Now'){

            return<Image
                            source={require('./resources/bottomtab/consult.png')}
                            style={{height:55, width:55, resizeMode:'contain', marginBottom:25}}
                        />;

              // iconName = focused
              // ? require('./resources/bottomtab/consult.png')
              // : require('./resources/bottomtab/consult.png')
            } else if(route.name === 'My Account'){
              if(focused){
              iconName=require('./resources/bottomtab/account_active.png')
                       yesFoc= <View style={{backgroundColor:'#1976D2', height:4, width:60, position:'absolute',top:-6, alignSelf:'center', borderRadius:5}}/>
              }else{
              iconName= require('./resources/bottomtab/account_inactive.png')
              }

              // iconName = focused
              // ? require('./resources/bottomtab/account_active.png')
              // : require('./resources/bottomtab/account_inactive.png')
            }
            // You can return any component that you like here!
            return(
            <View>
            {yesFoc}
            <Image
                source={iconName}
                style={{height:20, width:20, resizeMode:'contain',alignSelf:'center'}}
                />
            </View>)
          },
        })}
        tabBarOptions={{
          height: 80,
          activeTintColor: '#1976D2',
          inactiveTintColor: 'gray',
          activeBackgroundColor :'white',
          inactiveBackgroundColor :'white',
          labelStyle :{fontFamily: 'AvenirLTStd-Heavy'}
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Consult Now" component={ConsultNow}
         />
        <Tab.Screen name="My Account" component={MyAccount}
        listeners={{
    tabPress: e => {
      // Prevent default action
      console.log('ji')
    },
  }} />
      </Tab.Navigator>

  );
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>




        <Stack.Screen
        name="Splash" component={Splash} />

        <Stack.Screen
        name="Slider" component={Slider} />


        <Stack.Screen name="Tab" component={Tabs} />


        <Stack.Screen
        name="Otp" component={Otp}/>

        <Stack.Screen
        name="Login" component={Login} />


        <Stack.Screen
        name="Signup" component={Signup} />


        <Stack.Screen
        name="MyAccountEdit" component={MyAccountEdit}/>

        <Stack.Screen
        name="AddMember" component={AddMember}/>

        <Stack.Screen
        name="ShowMember" component={ShowMember}/>


        <Stack.Screen
        name="Chat" component={Chat} />


        <Stack.Screen
        name="VideoCall" component={VideoCall}/>

        <Stack.Screen
        name="LoginViaEmail" component={LoginViaEmail}/>

        <Stack.Screen
        name="MyConsultations" component={MyConsultations}/>

        <Stack.Screen
        name="ConsultationDetails" component={ConsultationDetails}/>

        <Stack.Screen
        name="MemberList" component={MemberList}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}/>

        <Stack.Screen
        name="HelpCenter" component={HelpCenter}/>

        <Stack.Screen
        name="Location" component={Location} />

        <Stack.Screen
        name="Notification" component={Notification}/>

        <Stack.Screen
        name="AddHealthProfile" component={AddHealthProfile}/>

        <Stack.Screen
        name="FindAndBook" component={FindAndBook}/>

        <Stack.Screen
        name="Agreement" component={Agreement}/>

        <Stack.Screen
        name="SuccessScreen" component={SuccessScreen}/>

        <Stack.Screen
        name="ViewNews" component={ViewNews}/>

        <Stack.Screen
        name="Payment" component={Payment}/>

        <Stack.Screen
        name="ChooseDoctor" component={ChooseDoctor}/>

        <Stack.Screen
        name="ChooseHospital" component={ChooseHospital} />

        <Stack.Screen
        name="MyMedReports" component={MyMedReports} />

        <Stack.Screen
        name="ConsultNow" component={ConsultNow} />

        <Stack.Screen
        name="Summary" component={Summary} />

        <Stack.Screen
        name="ViewPdf" component={ViewPdf} />

        <Stack.Screen
        name="DoctorDetails" component={DoctorDetails} />

        <Stack.Screen
        name="ViewAllDoctor" component={ViewAllDoctor} />

        <Stack.Screen
        name="ViewAllHospitals" component={ViewAllHospitals} />

        <Stack.Screen
        name="ViewAllSpeciality" component={ViewAllSpeciality} />

        <Stack.Screen
        name="ViewAllSymptoms" component={ViewAllSymptoms} />

        <Stack.Screen
        name="ViewAllNews" component={ViewAllNews} />



      </Stack.Navigator>



    </NavigationContainer>
  );
}


export default App;
