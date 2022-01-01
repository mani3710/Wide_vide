import React from 'react';
import { Text, View, FlatList, Image, ScrollView, RefreshControl, TouchableOpacity, Share } from 'react-native';
import colors from '../../../assets/colors';
import images from '../../../assets/images';
import { Divider } from '../../components';
import Ticker from "react-native-ticker";
import moment from "moment";
import * as Progress from 'react-native-progress'
import { Icon, SearchBar } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle'
import PollData from '../../dummyData/endedPollDummy';

export default class Ended extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            refreshing: false,
            searchText: ""

        }
    }
    getCountOfVoted() {

        return 2;
    }
    onShare = async (item) => {
        try {
            let text = `
            poll title : ${item.title}\n  image:${item.image}
            \n description: ${item.description}
            \n option1:${item.pollingOption[0].title} \n option2:${item.pollingOption[1].title}
            \n Which side you choose ? \n Download the App https://play.google.com/store/apps/details?id=com.wideview  
            `
            const result = await Share.share({
                message: text,
                url: item.image

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
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
                style={{ flex: 1, backgroundColor: colors.white }}>
                <Text style={{ alignSelf: 'flex-start', fontSize: 30, fontWeight: "bold", marginTop: 22, marginBottom: 10, marginLeft: 20 }}>Ended polls</Text>
                <SearchBar
                    placeholder="Search the poll"
                    containerStyle={{ borderRadius: 20, width: "90%", alignSelf: "center", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "transparent", borderBottomWidth: 0, borderTopWidth: 0 }}
                    inputContainerStyle={{ borderRadius: 20, height: 50, borderColor: "transparent" }}
                    value={this.state.searchText}
                    onChangeText={(e) => { this.setState({ searchText: e }) }}
                    inputStyle={{ color: colors.white }}
                />
                <FlatList
                    style={{ flex: 1 }}
                    ListFooterComponent={() => (
                        <View style={{ height: 20 }} />

                    )}
                    data={PollData}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("PollDetails", { data: item })
                                }}
                                style={{ width: "100%", borderBottomColor: colors.lightGray, borderBottomWidth: 0.5, paddingHorizontal: 20, marginTop: 30, paddingBottom: 10 }}>
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
                                            {"66%"}
                                        </Ticker>
                                    </ProgressCircle>
                                    <View style={{ width: 100 }}>
                                        <Text style={{ color: "gray", fontSize: 10, display: item.voteFor == 0 ? "none" : "flex" }}>You voted for  <Text style={{ color: item.voteFor == 1 ? colors.yellow : colors.black }}>{item.voteFor == 1 ? "Yellow" : "Black"}</Text></Text>
                                    </View>
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
                                            {"33%"}
                                        </Ticker>
                                    </ProgressCircle>
                                </View>
                                <TouchableOpacity style={{ flexDirection: "row", alignSelf: "center", marginTop: 10, paddingBottom: 10 }}>
                                    <Text
                                        onPress={() => { this.onShare(item) }}
                                        style={{ marginRight: 10 }}>SHARE POLL</Text>
                                    <Icon
                                        name="share"
                                        size={20}
                                    />
                                </TouchableOpacity>


                                {/* <View style={{ width: "100%", marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                                   
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 10 }}>GET DETAILS & VOTE NOW  </Text>
                                        <Icon
                                            name="arrow-right-alt"
                                            size={15}
                                            color={colors.black}
                                        />
                                    </View>
                                </View> */}


                            </TouchableOpacity>
                        );
                    }}

                />
            </ScrollView>
        );
    }
} 