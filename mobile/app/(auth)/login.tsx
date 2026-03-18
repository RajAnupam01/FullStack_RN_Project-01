import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';
import React, { useState } from 'react';
import Screen from '@/components/Screen';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from 'expo-router';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);


  const handleRegister = () => {
    setLoading(true);
    try {
      if (!email || !password) {
        alert('All fields are necessary to register');
        return;
      }
      console.log(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          <ImageBackground
            source={{
              uri: 'https://i.pinimg.com/originals/69/ce/06/69ce06ac82f09617e4ce7e9babc69a13.png'
            }}
            style={styles.header}
            imageStyle={{ opacity: 0.2 }} 
          >
            <View style={styles.headerContent}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5PrH8T969Xabc4RqVzfW_V8ZPMp7sM8cSyg&s'
                }}
                style={styles.img}
              />
              <Text style={styles.txtheader}>PinSphere</Text>
            </View>
          </ImageBackground>


          <View style={styles.main}>
            <Text style={styles.txtmain}>Welcome Back</Text>

          </View>


          <View style={styles.form}>


            {/* Email */}
            <View
              style={[
                styles.inputContainer,
                focusedInput === 'email' && styles.focused
              ]}
            >
              <MaterialCommunityIcons name="email-outline" size={18} color="#666" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"

              />
            </View>

            {/* Password */}
            <View
              style={[
                styles.inputContainer,
                focusedInput === 'password' && styles.focused
              ]}
            >
              <Entypo name="lock" size={18} color="#666" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}

              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={18}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={[styles.submitBtn, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.submitBtnTxt}>
                {loading ? 'Please wait...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Link href="/register" style={styles.footertxt}>
            Don't have an account
            <Text style={styles.loginTxt}> Sign Up</Text>
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20
  },
  header: {
    marginTop: 10,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerImage: {
    borderRadius: 20,
  },

  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },

  txtheader: {
    
    fontSize: 20,
    fontWeight: '900',
  },

  main: {
    marginTop: 70,
    marginBottom: 10
  },

  txtmain: {
    fontWeight: '700',
    fontSize: 34,
    textAlign: 'center',
    color: '#222'
  },

  form: {
    marginTop: 20
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 18,
    borderRadius: 14,
    paddingHorizontal: 14,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },

  focused: {
    borderWidth: 1,
    borderColor: '#e60023'
  },

  textInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#333'
  },

  submitBtn: {
    marginTop: 30,
    backgroundColor: '#e60023',
    paddingVertical: 16,
    borderRadius: 14,

    shadowColor: '#e60023',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },

  submitBtnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },

  footertxt: {
    marginTop: 25,
    fontSize: 14,
    textAlign: 'center',
    color: '#555'
  },

  loginTxt: {
    color: '#e60023',
    fontWeight: '700'
  }
});