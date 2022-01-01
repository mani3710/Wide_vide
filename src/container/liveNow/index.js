import React from 'react';
import { Text, View, FlatList, Image, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import colors from '../../../assets/colors';
import images from '../../../assets/images';
import { Divider } from '../../components';
import Ticker from "react-native-ticker";
import moment from "moment";
import PollData from '../../dummyData/pollData';
import * as Progress from 'react-native-progress'
import { Icon } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle'
import firebase from '../../firebase';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export default class LiveNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("dddd DD MMMM"),
            refreshing: false,
            userEmail: "",
            pollDataList: []

        }
        AsyncStorage.getItem("@email")
            .then(email => {
                this.state.userEmail = email;
                this.getLivePollData();
            })

    }
    getCountOfVoted() {

        return 2;
    }
    async getLivePollData() {

        const user = await firestore().collection('pollList').where("isEnded", "==", false)
        user.get().then(async (doc) => {
            if (doc._docs.length) {
                var data = [];
                doc.forEach((doc) => {


                    try {
                        var i = doc.data();

                        i.id = doc.id;
                        for (var val of doc.data().voters) {
                            if (val.email == this.state.userEmail) {
                                i.isVoted = true,
                                    i.voteFor = val.votedFor

                            }
                        }
                    } catch (e) {
                        console.log("error", e)
                        i.isVoted = false,
                            i.voteFor = 0
                    }
                    data.push(i);
                });

                this.setState({ pollDataList: data })
                console.log("data", data)
            } else {
                console.log("No data");
            }
        });
    }
    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        progressViewOffset={50}
                        refreshing={this.state.refreshing}

                    />
                }
                scrollEnabled
                style={{ flex: 1, backgroundColor: "white" }}>
                <Text style={{ alignSelf: "center", fontSize: 30, fontWeight: "bold", marginTop: 22, borderBottomColor: colors.yellow, borderBottomWidth: 2, marginBottom: 20 }}>VIEW POINT</Text>
                <Divider
                    height={0.3}
                />
                <View style={{ width: "100%", marginVertical: 10, alignItems: "center" }}>
                    <Text style={{ fontSize: 23, fontWeight: "bold", }}>Fire Poll On</Text>
                    <Text style={{ color: "gray", fontSize: 10 }}>({this.state.date})</Text>

                </View>
                <Divider
                    height={0.3}
                />
                {/* <View style={{ width: "100%", flexDirection: "row", marginVertical: 10, marginHorizontal: 15 }}>
                    <View style={{ flex: 3 }}>
                        <Text style={{ color: "gray" }}>{this.state.date}</Text>
                        <Text style={{ fontSize: 23, fontWeight: "bold", }}>Your Daily Polls</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: colors.brightGreen,
                                opacity: 0.6
                            }}
                        >Voted</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Ticker

                                duration={1000}
                                textStyle={{
                                    fontSize: 20,
                                    color: colors.brightGreen,
                                    opacity: 0.8,
                                    fontWeight: "bold"
                                }}
                            >
                                {"" + this.getCountOfVoted()}
                            </Ticker>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: colors.newBlack,
                                    marginTop: 2

                                }}
                            >/3</Text>
                        </View>

                    </View>
                </View> */}

                <FlatList
                    style={{ flex: 1 }}
                    ListFooterComponent={() => (
                        <View style={{ height: 20 }} />

                    )}
                    data={this.state.pollDataList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("PollDetails", { data: item, getLivePollData: this.getLivePollData.bind(this) })
                                }}
                                style={{ width: "100%", borderBottomColor: colors.lightGray, borderBottomWidth: 0.5, paddingHorizontal: 20, marginTop: 30, paddingBottom: 20 }}>
                                <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
                                    <View style={{ width: "98%" }}>
                                        <Text
                                            numberOfLines={3}
                                            style={{ fontWeight: "bold", fontSize: 16 }}
                                        >{item.title}</Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{ fontSize: 13, color: "gray", opacity: 0.6, marginTop: 5 }}
                                        >{item.description}</Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{ fontSize: 9, color: "gray", opacity: 0.6, alignSelf: "center" }}
                                        >(Source : {item.source})</Text>
                                    </View>
                                    {/* <View style={{ width: "25%", marginLeft: 15 }}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ width: 80, height: 80, borderRadius: 10 }}
                                        />
                                    </View> */}
                                </View>
                                <View style={{ width: "100%", marginLeft: 15, marginTop: 5 }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: "90%", height: 150, borderRadius: 10 }}
                                        resizeMode='cover'
                                    />
                                </View>


                                {!item.isVoted ?
                                    null
                                    :

                                    <View style={{ width: "100%", padding: 15, flexDirection: "row", justifyContent: "space-around" }}>
                                        <ProgressCircle
                                            percent={66}
                                            radius={50}
                                            borderWidth={8}
                                            color={colors.yellow}
                                            shadowColor={colors.lightGray}
                                            bgColor="#fff"
                                        >
                                            <Text numberOfLines={2} style={{ fontSize: 7, paddingHorizontal: 5, textAlign: "center" }}>{item.pollingOption[0].title}</Text>
                                            <Ticker

                                                duration={1000}
                                                textStyle={{
                                                    fontSize: 20,
                                                    color: colors.black,
                                                    opacity: 0.8,
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {parseInt((item.pollVotes.yellow / item.pollVotes.total) * 100)}%
</Ticker>
                                        </ProgressCircle>
                                        <Text style={{ color: "gray", fontSize: 10 }}>You voted for  <Text style={{ color: item.voteFor == 1 ? colors.yellow : colors.black }}>{item.voteFor == 1 ? "Yellow" : "Black"}</Text></Text>
                                        <ProgressCircle
                                            percent={34}
                                            radius={50}
                                            borderWidth={8}
                                            color={colors.black}
                                            shadowColor={colors.lightGray}
                                            bgColor="#fff"
                                        >
                                            <Text numberOfLines={2} style={{ fontSize: 7, paddingHorizontal: 5, textAlign: "center" }}>{item.pollingOption[1].title}</Text>
                                            <Ticker

                                                duration={1000}
                                                textStyle={{
                                                    fontSize: 20,
                                                    color: colors.yellow,
                                                    opacity: 0.8,
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {parseInt((item.pollVotes.black / item.pollVotes.total) * 100)}%
</Ticker>
                                        </ProgressCircle>
                                    </View>

                                }
                                <View style={{ width: "100%", marginTop: 20, flexDirection: "row", justifyContent: "flex-end" }}>

                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 10 }}>GET DETAILS & VOTE NOW  </Text>
                                        <Icon
                                            name="arrow-right-alt"
                                            size={15}
                                            color={colors.black}
                                        />
                                    </View>
                                </View>


                            </TouchableOpacity>
                        );
                    }}

                />

            </ScrollView>
        );
    }
}
