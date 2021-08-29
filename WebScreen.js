import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Clipboard, ToastAndroid, Linking } from 'react-native';
import { Button } from "react-native-elements/dist/buttons/Button";
import { SimpleLineIcons } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { URL_adress } from './address_config';
import { AntDesign } from '@expo/vector-icons';
import OptionsMenu from "react-native-options-menu";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const myIcon = (<SimpleLineIcons name="options-vertical" size={19} color="black" />)
class WebScreen extends Component {
  webview = null;
  constructor(props) {
    super(props);
    this.state = { link: URL_adress }
  }
  
  componentDidMount() {
    this.setState({ link: URL_adress })
    this.Loading();
  }
  Loading =()=>{
    this.props.navigation.setOptions({
      title: <Text style={{ alignItems: 'center', fontSize: 13 }}>{this.state.link.length > 41 ? this.state.link.slice(0, 41) + "...." : this.state.link}</Text>,
      headerTitleAlign: "center",
      headerLeft: () => (
        <Button icon={<AntDesign name="close" size={24} color="black" />}
          onPress={() => { this.props.navigation.goBack(); }} />
      ),
      headerRight: () => (
        <OptionsMenu
          customButton={myIcon}
          destructiveIndex={1}
          options={["Sao chép liên kết", "Mở với trình duyệt", "Làm mới","Ẩn"]}
          actions={[this.copyToClipboard, this.OpenBrower,this.Refesh, () => { }]} />
      ),
    })
  }
  Refesh =()=>{
    this.webview.reload();
  }
  OpenBrower = () => {
    Linking.openURL(this.state.link);
  }
  copyToClipboard = () => {
    Clipboard.setString(this.state.link);
    ToastAndroid.showWithGravity(
      "Liên kết đã được sao chép",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WebView style={{
          width: deviceWidth,
          height: deviceHeight
        }} source={{ uri: URL_adress }}
        ref={ref => (this.webview = ref)}
        onLoadProgress={({ nativeEvent }) => {
          this.state.link = nativeEvent.url;
          console.log(this.state.link)
          this.Loading()
        }}
        >
        </WebView>
        
      </SafeAreaView>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default WebScreen;
