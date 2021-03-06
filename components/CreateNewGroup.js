import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image,} from "react-native";
import Constants from "expo-constants";
import { Container, Header, Title, Button, Icon, Content, InputGroup, Input } from 'native-base';
// import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';



export default class CreateNewGroup extends Component {


  state = {
    imageuri: 'https://sv1.picz.in.th/images/2020/02/26/xuP1s9.png',
    uploaduri: 'https://sv1.picz.in.th/images/2020/02/26/xuP1s9.png',
    txtButton: '',
    id: '',
    progress: 0,
    indeterminate: true,
    text: null,
  };

  componentDidMount() {

    this.animate();


  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }



  onFocusFunction = async () => {
    const email_store = await AsyncStorage.getItem('@email');

    this.setState({ id: email_store })

  }


  onPressOK = () => {
    database.uploadImage(this.state.id, this.state.imageuri, this.upload_success, this.upload_fail, this.uploading_status);
    console.log(this.state.imageuri)

  };

  upload_success = async (uri) => {
    this.setState({ uploaduri: uri });
    // url=await this.createURL()
    // await database.addImage(this.state.id,url,this.add_success,this.add_fail)
    // this.setState({txtButton:"Success"});

    this.addURL()

  }
  addURL = async () => {

    database.addImage(this.state.id, this.state.uploaduri, this.add_success, this.add_fail)
    this.setState({ txtButton: "Success" });
  }
  add_success = async (error) => {

    await AsyncStorage.setItem('@uri', this.state.uploaduri);
    Alert.alert("Add Avatar Success");
  }
  add_fail = async (error) => {
    Alert.alert("Add Avatar Fail");

  }

  upload_fail = async (error) => {
    Alert.alert(error);

  }

  uploading_status = async (progress) => {
    this.setState({ txtButton: progress });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ imageuri: result.uri });
    }

  };




  onPressBack(){
    this.props.navigation.navigate('Group')
 }
 onChangeText = text => this.setState({ text });

    render() {
        return (
            <Container>
            <Header >
              <View style = { styles.MainContainer1}>
                <Button transparent onPress={()=>this.onPressBack()}>
                    <Icon name='ios-arrow-back' style={{color:'#DBDBDB'}} />
                </Button>
              </View>
              <View style = { styles.MainContainer2 }>
                <Title>Create New Group</Title>
              </View>
              
              <TouchableOpacity>
                <View  style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginRight:'8%'}}>
                  {/* <Image style={{width: 20, height: 20}}source={{uri: 'https://sv1.picz.in.th/images/2020/01/26/RHjrif.png' }}/> */}
                  <Text style={{ fontSize: 15, color: '#4B15B8', textAlign: 'center' , fontWeight:"bold"}} >DONE</Text>
                </View>
              </TouchableOpacity>

            </Header>
            {/* <ActionButton buttonColor="rgba(75,21,184,2)" position="center"></ActionButton> */}
            {/* <TouchableOpacity
            
            onPress={this.onPressOK}>
            <Text style={{ fontSize: 15, color: '#4B15B8', textAlign: 'center' , fontWeight:"bold"}} >DONE</Text>
          </TouchableOpacity> */}




          <View style={{flex:1,flexDirection:'column',backgroundColor:'#F6F6F6', }} >

            <View  style={{flex:0.2,marginTop:'7%',backgroundColor:'#ffffff',justifyContent: 'center',flexDirection:'row'}}>
              <View style={{ alignItems: 'center'}}>
                <TouchableOpacity onPress={this.pickImage}>
                  <Image
                    style={styles.imgStyles}
                    source={{ uri: this.state.imageuri }}
                    source={{ uri: this.state.uploaduri }} />
                </TouchableOpacity>
              </View>
                    <TextInput style={styles.txtIn2} placeholder="Group Name" onChangeText={this.onChangeText} />
            </View>

            <View  style={{flex:0.3,marginTop:'7%',backgroundColor:'#ffffff'}}>
                    <TextInput style={styles.txtIn3} placeholder="Description..." onChangeText={this.onChangeText} />
            </View>
          



        </View>

        </Container>

    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //     alignItems:'flex-start',
  //     flex: 1,
  //     flexDirection: 'row',
  //     marginRight:16,
  //     marginTop: 5,
  //     marginBottom: 5,
  //     paddingTop: Constants.statusBarHeight
  // },

  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },

  title: {
      fontSize: 16,
      color: '#FFFFFF',
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      borderRadius:10,
      paddingLeft:5,
      justifyContent: 'center',
      backgroundColor:'#1F9BF1',
  },
  description: {
      fontSize: 11,
      fontStyle: 'italic',
      color: '#FFFFFF',
  },
  photo2: {
    height: 30,
    width: 30,
    marginRight:5,
    marginLeft:5,
    marginTop:5,
    borderWidth:1,
    borderRadius: 1,

  alignItems: 'center',
  justifyContent: 'center'

}, photo3: {
  height: 25,
    width: 25,
    marginRight:5,
    marginLeft:5,
    marginTop:5,
  alignItems: 'center',
  justifyContent: 'center'


},
  photo: {
      height: 45,
      width: 45,
      marginRight:5,
      marginLeft:5,
      marginTop:5,
      borderWidth:10,
      borderRadius: 50,
      flex:1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  Text:{
    color:"#000000",
    fontSize: 15,
    marginTop:5,
    marginLeft : 2,
    marginEnd : 2,
    alignItems: 'center',
    justifyContent: 'center'

  },Text2:{
    color:"#5B3E96",
    fontSize: 17,
    marginTop:5,
    marginLeft : 2,
    marginEnd : 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  MainContainer1:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    
  MainContainer2:{
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo4: {
    height: 18,
      width: 18,
      marginRight:20,
      flexDirection: 'row-reverse',
      alignItems:'center'

  
  
  },
  txtIn2: {
    justifyContent:'center',
    backgroundColor: 'transparent',
    flex:5,
    fontSize:24,
  },

  txtIn3: {
    backgroundColor: 'transparent',
    fontSize:22,
    flex:1,
    margin:13,
    
  },

  imgStyles: {
    width: 70,
    height: 70,
    alignItems: 'center',
    margin: '10%',
    flex:1,
    // backgroundColor:'black',
    // margin:20,
    padding:10,
    

  },


});
