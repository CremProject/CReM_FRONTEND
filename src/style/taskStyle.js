import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);
export default StyleSheet.create({
	/*Task style*/
	taskContainer:{
        flex: 1,
        flexDirection : 'column',
        margin :5,
        justifyContent : 'space-between'
	},
	taskHeader:{
		//flex: 35/100,
		flexDirection : 'column',
        //borderWidth : 0.5,
        marginBottom : 3
	},
	taskContent:{
		//flex : 45/100,
		flexDirection : 'column',
        // borderWidth : 0.5,
        marginBottom : 2
	},
	taskFooter:{
		flex:20/100,
		flexDirection : 'column',
        // borderWidth : 0.5
	},

	/*task header*/
	taskPriory:{
		marginBottom : 3,
        flexDirection : 'row',
        //borderWidth : 1
	},
	rowtaskTitle:{
		// flex : 1,
		flexDirection : 'row',
		marginBottom : 3,
        //borderWidth : 1
	},
	taskTitle:{
		flex :55/100,
        borderWidth : 0.5,
        borderRadius : 5,
        marginRight : 2
	},
	taskDate:{
		flex :45/100,
        borderWidth : 0.5,
        borderRadius : 5,
        marginRight : 2
	},
	iconCalendar:{
		flex :15/100,
        //borderWidth : 0.5,
        //borderRadius : 5

	},
	taskAssign:{
        flex : 40/100,
        borderWidth : 0.5,
        borderRadius : 5
	},
	/*end task header*/

	/*task content*/
	taskDescription:{
        flex : 1,
        borderWidth : 0.5,
        borderRadius : 5,
	},
	taskAction:{
        flex : 1,
        flexDirection : 'row',
        ////borderWidth : 2
	},
	taskOptional:{
        flex : 1,
        ////borderWidth : 2,
        flexDirection : 'row'
	},
	/*childe of taskOptional*/
	taskChecklist:{
        flex :1,
        flexDirection :'column',
        ////borderWidth : 2
	},
	taskAttachments:{
        flex :1,
        flexDirection :'row',
        ////borderWidth : 2
	},

	/*child of taskAction*/
	actionSave:{
        flex :1

	},
	actionCancel:{
        flex :1,
	},
    buttonSave:{
        backgroundColor :'skyblue',
        alignSelf :'flex-start',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8,
        width : 80,
        height : 40
    },
    buttonCancel:{
        backgroundColor :'rgb(152, 138, 137)',
        alignSelf :'flex-start',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 8,
        width : 80,
        height : 40
    },
	/*end task content*/

	/*task footer*/
	commentArea:{
        flex : 1,
        flexDirection : 'column',
        marginBottom : 2
	},
	commentLabel:{

	},
	commentContentArea:{
        flex : 1,
        flexDirection : 'column',
        borderWidth : 0.5,
        borderRadius : 5
	},
	commentContent:{
	},
	iconAddon:{
        alignSelf :'flex-end',
        flexDirection : 'row'
	},
	/*end of taskFooter*/
	/*end Task style*/

});
