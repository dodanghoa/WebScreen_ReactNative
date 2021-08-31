import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Clipboard, ToastAndroid, Linking } from 'react-native';
import { Button } from "react-native-elements/dist/buttons/Button";
import { SimpleLineIcons } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { URL_adress } from './address_config';
import { AntDesign } from '@expo/vector-icons';
import OptionsMenu from "react-native-options-menu";
//device Height & device Width
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
//Icon options of top menu
const myIcon = (<SimpleLineIcons name="options-vertical" size={19} color="black" />)
class WebScreen extends Component {
  //WebVeiw properties to Reload
  webview = null;
  //constructor
  constructor(props) {
    super(props);
    this.state = { link: URL_adress }
  }
  //Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    this.setState({ link: URL_adress })
    this.Loading();
  }
  //Load the Header of WebScreen: Back button,title,options
  Loading = () => {
    this.props.navigation.setOptions({
      //set the tile with uri of website and slice it to fit the title
      title: <Text style={{ alignItems: 'center', fontSize: 13 }}>{this.state.link.length > 41 ? this.state.link.slice(0, 41) + "...." : this.state.link}</Text>,
      headerTitleAlign: "center",
      //Button back
      headerLeft: () => (
        <Button icon={<AntDesign name="close" size={24} color="black" />}
          onPress={() => { this.props.navigation.goBack(); }} />
      ),
      //Button option
      headerRight: () => (
        //using Option menu
        <OptionsMenu
          //set icon
          customButton={myIcon}
          destructiveIndex={1}
          //set display content
          options={["Sao chép liên kết", "Mở với trình duyệt", "Làm mới", "Ẩn"]}
          //set function corresponding to display content
          actions={[this.copyToClipboard, this.OpenBrower, this.Refesh, () => { }]} />
      ),
    })
  }

  //Refesh function
  Refesh = () => {
    this.webview.reload();
  }
  //OpenBrower function 
  OpenBrower = () => {
    Linking.openURL(this.state.link);
  }
  //copyToClipboard function
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

        <WebView 
        //Set style with deviceWidth and deviceHeight
        style={{width: deviceWidth, height: deviceHeight}} 
        //Set soure with URL_adress in address_config.js
        source={{ uri: URL_adress }}
        //Set WebVeiw properties
        ref={ref => (this.webview = ref)}
        //Function that is invoked when the WebView is loading. to get Current URL
        onLoadProgress={({ nativeEvent }) => {
            //get Current URL and reload the title 
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
