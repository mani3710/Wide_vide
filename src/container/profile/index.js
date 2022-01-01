import React from 'react';
import { Text, View, Image } from 'react-native';
import colors from '../../../assets/colors';
import { Icon, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../../assets/images';
import { Dialog } from 'react-native-simple-dialogs';

import firebase from '../../firebase';   
import firestore from '@react-native-firebase/firestore';
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: "",
            name: "",
            email: "",
            isShowLogoutWarning:false,
            userId:""
        }
        AsyncStorage.getItem("@profileImage").then(  
            (photo) => {
                AsyncStorage.getItem("@userName").then(
                    (name) => {
                        AsyncStorage.getItem("@email").then(  
                            (email) => {
                                AsyncStorage.getItem("@userId").then(
                                    (id) => {
        console.log("idid",id);
                                        
                                        this.setState({ profile: photo, name: name, email: email,userId:id })
                                        this.getUserData();
                                    }
                                )
                               
                            }
                        )
                    }
                )
            }
        )
    }
    logoutFunc(){
        this.setState({isShowLogoutWarning:false})
        AsyncStorage.clear().then(()=>{
            this.props.navigation.replace("Splash")
        })
    }
    //  UNSAFE_componentWillMount(){
    //     this.getUserData()
    // }
  async  getUserData(){
      console.log("id",this.state.userId);
        const user = await firestore().collection('users').doc(`${this.state.userId}`);
        user.get().then(async (doc) => { 
            this.setState({
                profile:doc.__data.photo,
                name:doc.__data.name,
                email:doc._data.email        

            })
            });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>IT'S YOU</Text>
                <Image
                    source={images.profile}
                    style={{ width: 250, height: 200 }}

                />
                <Image
                    source={{ uri: this.state.profile }}
                    style={{ width: 100, height: 100, borderRadius: 150 / 2, borderWidth: 2, borderColor: colors.yellow }}
                />
                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}>{this.state.name}</Text>
                <Text>{this.state.email}</Text>
                <Button
                onPress={()=>{this.setState({isShowLogoutWarning:true})}}
                    title="LOGOUT"
                    containerStyle={{ backgroundColor: "transparent", marginTop: 35 }}
                    buttonStyle={{ backgroundColor: "transparent" }}
                    titleStyle={{ fontSize: 18, fontWeight: "bold", color: "#d32f2f", marginLeft: 10 }}
                    icon={<Icon name="power-settings-new" size={25} color="#d32f2f" />}
                    iconContainerStyle={{ marginRight: 10 }}

                />
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Icon name="language" size={15} color={colors.lightGray} containerStyle={{ marginRight: 5 }} />
                    <Text style={{ fontSize: 12, color: colors.lightGray }}>POWERED BY WIDEVIEW</Text>
                </View>
                <Dialog
                    visible={this.state.isShowLogoutWarning}
                    dialogStyle={{ borderRadius: 20 }}
                    onTouchOutside={() => { this.setState({ isShowLogoutWarning: false }) }}
                >
                    <View>


                    </View>

                    <View style={{ width: "100%", alignItems: "center" }}>


                        <Text style={{ color: "#000", fontSize: 20, fontWeight: 'bold' }}>Do you want logout ?</Text>
                        <Image
                            source={images.logout}
                            style={{ width: 150, height: 110 }}
                        />

                    </View>

  

                    <View style={{ alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
                        <Button

                            buttonStyle={{ backgroundColor: "white" }}
                            containerStyle={{ marginTop: 10, alignSelf: "center" }}
                            title="YES"
                            titleStyle={{ color: "#d32f2f", fontWeight: "bold" }}
                            onPress={() => { this.logoutFunc()  }}

                        />


                        <View
                            style={{ width: "20%" }}
                        ></View>
                        <Button
                           
                            buttonStyle={{ backgroundColor: "white" }}
                            containerStyle={{ marginTop: 10, alignSelf: "center" }}
                            title="No"
                            titleStyle={{ color: "#388E3C", fontWeight: "bold" }}
                            onPress={() => { this.setState({ isShowLogoutWarning: false }) }}         

                        />

                    </View>

                </Dialog>

            </View>
        );
    }
}
