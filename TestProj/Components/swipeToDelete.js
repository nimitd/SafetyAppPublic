//Code adpated from: https://github.com/jemise111/react-native-swipe-list-view/blob/master/docs/SwipeListView.md

import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

//import {styles} from '../styles/main_styles';
//import {home_styles} from '../styles/home_styles';
import {profile_styles} from '../styles/profile_styles';

export default function SwipeToDelete(props) {

    var arr = props.array;

    console.log("In swipe.");
    console.log(arr);

    var rowTranslateAnimatedValues = {};
    
    Array(arr.length).fill('').forEach((_, i) => {
        rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

    var [listData, setListData] = useState(
        Array(props.array.length)
            .fill('')
            .map((_, i) => ({ key: `${i}`, text: props.array[i] }))
    );

    const onSwipeValueChange = swipeData => {
        var { key, value } = swipeData;
        if (
            value < -Dimensions.get('window').width &&
            !this.animationIsRunning
        ) {
            this.animationIsRunning = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
            }).start(() => {
                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                setListData(newData);
                this.animationIsRunning = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                styles.rowFrontContainer,
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 70],
                    }),
                },
            ]}
        >
            <TouchableHighlight
                onPress={() => console.log('You touched me')}
                style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <View>
                    <Text style={profile_styles.frontText}>{data.item.text}</Text>
                </View>
            </TouchableHighlight>
        </Animated.View>
        
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                disableRightSwipe
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange={onSwipeValueChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: 'black',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'grey',
        borderBottomColor: 'black',
        borderBottomWidth: 20,
        justifyContent: 'center',
        height: 70,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderBottomColor: 'black',
        borderBottomWidth: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
