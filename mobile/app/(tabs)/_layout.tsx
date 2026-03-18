import { Tabs } from "expo-router";

export default function TabsLayout() {
    return(
        <Tabs screenOptions={{headerShown:false}} >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="account" />
            <Tabs.Screen name="createPost"/>
            <Tabs.Screen name="myPosts"/>
        </Tabs>
    )
}