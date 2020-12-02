/*
 * @Author: your name
 * @Date: 2020-11-25 23:38:32
 * @LastEditTime: 2020-11-27 10:40:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\login\index.js
 */
import React from 'react'
//导入store
import store from '../../store'
import {connect} from '@giantmachines/redux-websocket';
import Home from '../home';

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
                <label>用户姓名 </label>
                <input id="in_user_name" value={this.state.username} onChange={(e) => {
                    this.setState({
                        username: e.target.value,
                    });
                }}/>
                <button id="user_join" onClick={this.handleClick}>进入游戏大厅</button>
            </>
        );
    }
}