import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);


export default StyleSheet.create({
    /*regitser screen*/
    Scrollviewcontainer: {
        // flex : 1,
        // flexDirection :'column'
    },
    container: {
        flex: 1,
        flexDirection : 'column',
        margin :5,
        justifyContent : 'space-between'
    },
    header:{
        flex : 10/100,
        flexDirection : 'row',
        marginBottom : 3,
        //borderWidth : 1
    },
    body:{
        flex: 80/100,
        flexDirection : 'column',
        //borderWidth : 2,
        justifyContent : 'space-between',
        marginBottom : 6
    },
    footer:{
        flex: 10/100,
        //borderWidth : 1
    },
    /*Header*/
    searchbar:{
        flex : 80/100,
        flexDirection :'row',
        //borderWidth : 2,
        alignItems : 'center',
        marginTop : 8,
        marginLeft : 8,
        marginRight : 3,
        marginBottom : 8
    },
    icon:{
        flex : 10/100,
        //borderWidth : 2
    },
    searchContent:{
        flex :80/100,
        //borderWidth : 2
    },
    actionHeader:{
        flex : 10/100,
        //borderWidth : 2,
        marginTop : 10,
        marginLeft : 1,
        marginRight : 10,
        marginBottom : 8

    },
    Notification:{
        flex : 1,
    },
    /*end Header*/
    task:{
        flex : 1,
        //borderWidth : 2
    },
    listTask:{
        //flex : 1,
        borderWidth : 1,
        marginBottom : 2
    },
    tabs:{
        flex : 1,
        flexDirection : 'row',
        justifyContent: 'space-between',
        borderWidth : 1
    },
    iconfabs:{
        margin : 2,
    }
    /*end register screen*/
    //check rotation
    /*https://github.com/kkjdaniel/react-native-device-display*/
});
