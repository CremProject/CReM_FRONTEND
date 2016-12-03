import React,{Component} from 'react';
import {
	View,StyleSheet
}
from 'react-native'
import {
	Button,Icon
} from 'native-base';

export default class StarRating extends Component{
	constructor(props){
		super(props);

		let status = {};
		let selected = this.props.selected ;
		for(let i = 1 ; i <= this.props.numOfStar ; i++){
			status['star'+i] = (i <= selected) ? true : false;
		}
		console.log("mang status la"+status);
		this.state= {
			status : status,
			selected : this.props.selected,
		};
	}
	static propTypes = {
        numOfStar: React.PropTypes.number,
        selected : React.PropTypes.number,
		onClick : React.PropTypes.func,
    };
	render(){
		let numOfStar = this.props.numOfStar;
		let star = [];
		for(let i = 1 ; i <= numOfStar ; i++){
			let status = this.state.status['star'+i];
			console.log("status o dong "+ i +" la : " + status);
			star.push(
				<View key = {i}>
					<Button transparent onPress = {()=>this._handleClick(i)}>
						<Icon name = { (status === true ) ? "ios-star":"ios-star-outline"}/>
					</Button>
				</View>
			);
		}
		return (
			<View style = {style.row}>
				{star}
			</View>
		);
	}
	_handleClick(index){
		let status = this.state.status;
		let statusAtIndex = this.state.status['star'+index];

		console.log("ban da click index " + index + " co status la : " + status);
		/*
		if status of index is true de-select the behind elenment
		if status of index is false select from the first to the current element
		and deselect the behind element
		*/
		if(index === 1){
			status['star'+index] = !(statusAtIndex);
		}
		for(let i = 1 ; i <= this.props.numOfStar ; i++){
			let status_i = status['star'+i];
			if(statusAtIndex){
				if(i > index ){
					status['star'+i] =  !(statusAtIndex);
				}
			}else{
				if(i > index ){
					status['star'+i] =  (statusAtIndex);
				}else{
					status['star'+i] =  !(statusAtIndex);
				}
			}
		}
		this.setState({
			status : status,
			selected : index,
		});
		//xu ly ham truyen vao
		this.props.onClick(index);
	}
}
StarRating.defaultProps = {
  numOfStar : 4,
  selected : 0,
};
const style = StyleSheet.create({
	row : {
		flex : 1,
		flexDirection : 'row',
	},
});
