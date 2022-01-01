import React from 'react';
import { Text, View, Dimensions, Image, ActivityIndicator } from 'react-native';
import colors from '../../../assets/colors';
import Carousel from 'react-native-snap-carousel';
import { Card } from 'react-native-elements';
import images from '../../../assets/images';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../../firebase';
import firestore from '@react-native-firebase/firestore';
const screenWith = Dimensions.get("screen").width;
const id = "852484979646-3tfso5k9955das1lmm59d7kt9pncptr8.apps.googleusercontent.com"
const imagesList = [
    { image: images.chart, text: "Analysis the Content" },
    { image: images.travel, text: "Know about the others opinions" },
    { image: images.statistics, text: "Know which side have more power" },

]
export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowSpinner: true
        }
        this.carousel = {}
    }
    UNSAFE_componentWillMount() {
        setTimeout(() => {
            AsyncStorage.getItem("@userId").then(
                (e) => {
                    if (e) {
                        this.props.navigation.replace("MainBottomNav")
                    } else {
                        this.setState({ isShowSpinner: false })
                    }
                }
            )
        }, 1000)
    }
    async UpdateUserInfo(data) {

        const user = await firestore().collection('users').doc(`${data.user.id}`);
        user.get().then(async (doc) => {
            if (doc._exists) {
                console.log("User Already Present");
                this.setState({ isShowSpinner: false }, () => {
                    this.props.navigation.replace("MainBottomNav")
                })

            } else {
                console.log("User not Present");

                await firestore().collection('users').doc(`${data.user.id}`).set({
                    name: data.user.name,
                    email: data.user.email,
                    photo: data.user.photo,


                });
                this.setState({ isShowSpinner: false }, () => {
                    this.props.navigation.replace("MainBottomNav")
                })
            }



        }).catch(function (error) {
            console.log("Error getting document:", error);
            this.setState({ isShowSpinner: false })
        });


    }
    signIn = async () => {
        try {
            this.setState({ isShowSpinner: true })
            GoogleSignin.configure({
                webClientId: id,
                offlineAccess: true,

            });
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
            }
            await GoogleSignin.hasPlayServices();
            const data = await GoogleSignin.signIn();
            console.log("info", data);
            // this.UpdateUserInfo(data)
            // this.setState({ userData: data })
            //data.user.id  data.user.photo
            AsyncStorage.setItem("@userId", data.user.id).then(() => {
                AsyncStorage.setItem("@profileImage", data.user.photo).then(() => {

                    AsyncStorage.setItem("@userName", data.user.name).then(() => {

                        AsyncStorage.setItem("@email", data.user.email).then(() => {
                            // this.props.navigation.replace("MainBottomNav")
                            this.UpdateUserInfo(data)
                            // this.setState({showSpinner:false})
                            // this.props.navigation.replace("MainBottomNav")

                        });

                    });

                });
            });


        } catch (error) {
            this.setState({ showSpinner: false, errorMsg: error.message })
            console.log(error.message)
        }
    };
    renderCarouselItem = ({ item, index }) => {

        return (
            <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <Image
                    source={item.image}
                    style={{ width: "90%", height: 230, alignSelf: "center", marginTop: 20 }}
                    resizeMode="contain"

                />
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>{item.text}</Text>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ alignSelf: "center", fontSize: 30, fontWeight: "bold", marginTop: 22, borderBottomColor: colors.yellow, borderBottomWidth: 2, }}>VIEW POINT</Text>
                <Text style={{ color: "gray", fontSize: 9, marginTop: 2, marginBottom: 50 }}>
                    (Place to know the real facts)
                </Text>
                <View style={{ height: 280, width: "100%" }}>
                    <Carousel style={{ width: "100%", }}
                        data={imagesList}
                        renderItem={this.renderCarouselItem}
                        itemWidth={screenWith}
                        sliderWidth={screenWith}
                        autoplay={true}
                        autoplayInterval={2000}
                        autoplayDelay={1000}
                        automaticallyAdjustContentInsets
                        loop


                        ref={(c) => { this.carousel = c; }}
                        //onSnapToItem={itemIndex => this.onSnapToItem(itemIndex)}       
                        inactiveSlideOpacity={0.8}
                        enableSnap={true}

                        extraData={this.state}
                    // firstItem={this.state.featureList[2]}                   




                    />
                </View>

                <View style={{ marginTop: 100, width: "100%", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>Debate with your fingers</Text>
                    {this.state.isShowSpinner ?
                        <ActivityIndicator
                            size={40}
                            color={colors.yellow}
                            style={{ alignSelf: "center", marginTop: 15 }}
                        /> :
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <GoogleSigninButton
                                style={{ width: 250, height: 50, marginTop: 25, alignSelf: "center" }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={() => { this.signIn() }}
                            />
                            <Text style={{ color: "gray", fontSize: 10, marginTop: 2 }}>
                                Authenticate by Google
                </Text>
                        </View>
                    }
                </View>

            </View>
        );
    }
} 