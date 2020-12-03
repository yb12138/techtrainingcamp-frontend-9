/*
 * @Author: your name
 * @Date: 2020-11-25 23:38:32
 * @LastEditTime: 2020-12-02 22:11:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\login\index.js
 */
import React from 'react'
//导入store
import store from '../../store'
import {connect} from '@giantmachines/redux-websocket';
import Home from '../home';
import '../login/login.css'
import { Button} from 'antd';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    handleClick = () => {
        let history = this.props.history;
        let name = this.state.username;
        store.dispatch(connect('ws://localhost:8080/chat-room/' + name));
        history.push('/home');

    };

    render() {

        return (
            <>
               <div className="mainbody middle">
                    
                <form className="form-box multiplayer">
                <div id="gametitle" style={{color:'white'}}>2048</div>
                <div>
                    <input className="input-normal" placeholder="请输入用户名" value={this.state.username} type="text" onChange={(e) => {
                    this.setState({
                        username: e.target.value,
                    });
                }} />
                    <Button className="btn-submit" type="submit" onClick={this.handleClick}>
                    开始游戏
                    </Button>
                </div>      
                </form>
                </div>
            </>
        );
    }
}