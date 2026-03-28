import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabsLayout() {
    return(
        <Tabs screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:'red',
            tabBarShowLabel:false,
            tabBarInactiveTintColor:'black',
            tabBarStyle:{
                paddingTop:5,
            }
        }} >
            <Tabs.Screen name="index" options={{title:'Home',
                tabBarIcon:({color})=>(
                    <Entypo name="home" size={26} color={color} />
                )
            }} />
            <Tabs.Screen name="search" options={{title:'search',
                tabBarIcon:({color})=>(
                    <FontAwesome name="search" size={26} color={color} />
                )
            }} />
           
            <Tabs.Screen name="createPost" options={{title:'Create',
                tabBarIcon:({color})=>(
                    <AntDesign name="plus-circle" size={26} color={color} />
                )
            }} />
            <Tabs.Screen name="inbox" options={{title:'inbox',
                tabBarIcon:({color})=>(
                    <AntDesign name="message" size={26} color={color} />
                )
            }} />
             <Tabs.Screen name="account" options={{title:'Profile',
                tabBarIcon:({color})=>(
                    <Feather name="user" size={26} color={color} />
                ),
                 lazy: true
            }} />
        </Tabs>
    )
}