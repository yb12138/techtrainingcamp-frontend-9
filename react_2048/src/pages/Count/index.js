/*
 * @Author: your name
 * @Date: 2020-12-03 15:24:20
 * @LastEditTime: 2020-12-03 16:53:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\pages\Count\index.js
 */

import React, {Component} from 'react'
import Clock from '../Clock/Clock'

export default class countDown extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      minute: 0,
      second: 0
    }
  }
  componentDidMount() {
      
    if(this.props.endTime){
      this.countFun(this.props.endTime);
    }
  }
  //组件卸载取消倒计时
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  childEvent = childDate => {
    this.$child = childDate;
  };
  
  countFun = (time) => {
    let sys_second = time;
    this.timer = setInterval(() => {
    //防止倒计时出现负数
      if (sys_second > 1000) {
        sys_second -= 1000;
        let minute = Math.floor((sys_second / 1000 / 60) % 60);
        let second = Math.floor(sys_second / 1000 % 60);
        this.setState({
          minute:minute < 10 ? "0" + minute : minute,
          second:second < 10 ? "0" + second : second
        })
      } else {
        clearInterval(this.timer);
        //倒计时结束时触发父组件的方法
        //this.$child.handleOpen();
        this.props.gameOver();
      }
    }, 1000);
  }
  render() {
    return (
        <>
        <Clock childEvent={this.childEvent}/>
      <span>{this.state.minute}分:{this.state.second}秒</span>
      </>
    )
  }
}

