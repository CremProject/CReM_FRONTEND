import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
  constructor(props){
    super(props);
    // var date = this.props.date;
    this.state = {date:this.props.datevalue};
    console.log("o date picker"+this.state.date);
  }

  render(){
    return (
      <DatePicker
        date={this.state.date}
        mode="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        minDate="2016-05-01"
        maxDate="2086-12-01"
        showIcon = {true}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date)=>this.onDateChange(date)}
      />
    )
  }
  onDateChange(date){
      this.setState({
          date : date
      });
      this.props.onChange(date);
      console.log("date da nhap la  : " + this.state.date);
  }

}
MyDatePicker.propTypes = {
  datevalue: React.PropTypes.object,
  onChange : React.PropTypes.func
};
