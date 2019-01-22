import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  View,
  Button,
  RefreshControl,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends Component {

    constructor(props){
     super(props)
     this.state = {
         dataqr:'',
         status:'Ready'
     };
    }
  onSuccess(e) {
      this.setState({
          dataqr:this.state.dataqr+', '+e.data,
          status:this.setState({status:'Ready'})
      })

   /* Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));*/
      Alert.alert(
          'QR Code', 
          'code : '+e.data,
          [
             {text: 'OK' , onPress: () => console.log('OK Pressed')}, 
          ],
          { cancelable : false}

      )
  }
  _onRefresh(){
      this.setState({refreshing:true});
  }

  render() {
    return (
        <View style = {styles.conMain}>
       <View style = {styles.conHeader}>
          <Text style = {styles.textHeader}>Clz mate QR Code scanner</Text>
       </View>
       <View style = {styles.conQR}>
        <QRCodeScanner
         onRead={this.onSuccess.bind(this)}
         ref = {(node) => {this.scanner = node}}
        
        topContent={
            <View>

          <Text style={styles.centerText}>
             <Text style={styles.textBold}></Text> 
          </Text>
         
        
          </View>  
        }
        bottomContent={
          <View>
              <Text>code {this.state.dataqr}</Text>
          </View>
        }
      />
      </View>
      <View style = {styles.button}>
          <Button
            onPress = {()=> {
                this.scanner.reactivate()
                this.setState({status:'Ready'})
            }
        }
          
            title = {this.state.status}
            />
            </View>
            <View>
                <Button style = {styles.button1} 
                <RefreshControl
                refreshing = {this.state.refreshing}
                onRefresh = {this._onRefresh.bind(this)}
                />
                />
            </View>
         </View>
      
    );
  }
}

const styles = StyleSheet.create({
  conMain: {
    flex: 1,
   
  },
 conHeader: {
    flex: 1,
    backgroundColor:'rgb(0,0,0)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader: {
    fontSize: 18,
    color: 'rgb(255,255,255)',
    
  },
 conQR: {
     flex: 8,
    padding: 5,
  },
  centerText:{
      fontSize: 12,
      color: '#777',
  },
  button:{
      padding:20,


  },
});

AppRegistry.registerComponent('default', () => ScanScreen);