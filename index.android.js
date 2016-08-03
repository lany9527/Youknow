/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';

let windowSize = Dimensions.get('window');

class Youknow extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      IMG_URI: "",
      IMG_NAME: "",
      captcha: "",
    }
  }



  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./images/bg.jpg')} style={styles.bgImg} />
        <View style={styles.loginBox}>
          <View
            style={{marginBottom: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: 40, height: 40}}
              source={require('./images/login.png')} />
          </View>
          <View>
            <TextInput
              textAlignVertical='center'
              style={styles.userName}
              placeholder="QQ号/手机号/邮箱"
              autoFocus={false}
              underlineColorAndroid={'transparent'}
              textAlign='center'
              onChangeText={(username) => this.setState({username})}
              value={this.state.username} />
          </View>
          <View style={{height:1, backgroundColor: '#eee'}}></View>
          <View>
            <TextInput
              textAlignVertical='center'
              style={styles.pwd}
              placeholder="密码"
              secureTextEntry={true}
              autoFocus={false}
              underlineColorAndroid={'transparent'}
              textAlign='center'
              onChangeText={(password) => this.setState({password})}
              value={this.state.password} />
          </View>
          <View style={{height:1, backgroundColor: '#eee'}}></View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              textAlignVertical='center'
              style={styles.captcha}
              placeholder="验证码"
              autoFocus={false}
              underlineColorAndroid={'transparent'}
              textAlign='center'
              onChangeText={(captcha) => this.setState({captcha})}
              value={this.state.captcha} />
              <Image
                style={{flex:1, width:96, height:32, backgroundColor: '#fff'}}
                source={{uri:this.state.IMG_URI}} />
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                ToastAndroid.show('登陆按钮按钮被点击了', ToastAndroid.SHORT);
                let POST_URL='http://155.94.202.101:1009/api/v1/user/signin?captcha='+this.state.IMG_NAME+"."+this.state.captcha;//TODO 1.怎么把函数移到外部，但是加载页面也不会发生调用  2.动态加入验证码。
                console.log(POST_URL);
                fetch(POST_URL, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: "1154279940@qq.com",
                    password: "123123",
                  })
                })
                  .then((response) => response.json())
                  .then((responseData) => {
                   console.log("ok");
                    console.log(responseData);
                  })
                  .catch((error) => {
                    console.log("not ok");
                    console.log(error.data);
                  }).done();
              }}
              style={styles.login} >
              <Text style={styles.loginText}>点击登陆</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.login,{marginTop:10,backgroundColor:'#20b2aa'}]}
              onPress={() => {
                ToastAndroid.show('正在获取验证码......', ToastAndroid.SHORT);
                let REQUEST_URL = 'http://155.94.202.101:1009/api/v1/captcha/id';
                  fetch(REQUEST_URL)
                    .then((response) => response.json())
                    .then((responseJson) => {
                      this.setState({
                        IMG_URI: "http://155.94.202.101:1009/api/v1/captcha/file/dynamic/"+responseJson.data+".png",
                        IMG_NAME: responseJson.data,
                      });
                      console.log(responseJson.data);
                      console.log(this.state.IMG_URI);
                    })
                    .done();
              }}>
              <Text style={styles.loginText}>获取验证码</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.unlogin}>无法登陆?</Text>
            <Text style={styles.register}>注册新用户</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  loginBox: {
    flex: 1,
    justifyContent: 'center',
    marginTop:60,
    marginLeft: 10,
    marginRight: 10
  },
  userName: {
    // flex:1,
    // backgroundColor: '#fff',
    // marginTop: 10,
    // height: 40,
    color: '#666',
    borderRadius: 10,
    // textAlign: 'center',
  },
  pwd: {
    borderRadius: 25,
    alignItems: 'center',
    color: '#666',
    // backgroundColor: '#fff',
    // textAlign: 'center',
    // height: 35
  },
  captcha: {
    flex: 5,
    borderRadius: 5,
    // backgroundColor: '#fff',
    // height: 35
  },
  login: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    backgroundColor: '#56abe4'
  },
  loginText: {
    color: '#fff',
  },
  bottom: {
    flex:1,
    flexDirection:'row',
    alignItems: 'flex-end',
    bottom: 10
  },
  unlogin:{
    fontSize:12,
    color:'#63B8FF',
    marginLeft:10,
  },
  register:{
    fontSize:12,
    color:'#63B8FF',
    marginRight:10,
    alignItems:'flex-end',
    flex:1,
    flexDirection:'row',
    textAlign:'right',
  }
});

AppRegistry.registerComponent('Youknow', () => Youknow);
