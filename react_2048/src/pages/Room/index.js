/*
 * @Author: your name
 * @Date: 2020-11-25 17:25:27
 * @LastEditTime: 2020-12-03 14:51:48
 * @LastEditors: Please set LastEditors
 * @Description: 房间组件，一个房间四个人
 * @FilePath: \src\pages\Room\index.js
 */

import React from 'react'
//导入store
import {Card, List, Avatar, Button} from 'antd';
import {send} from '@giantmachines/redux-websocket';
import 'antd/dist/antd.css';
import store from '../../store'


export default class Room extends React.Component {

    //加入房间
    joinRoom(val) {
        store.dispatch(send({type: "IN_ROOM", content: JSON.stringify({"roomID": val})}));
    }


    render() {
        const room = this.props.room;
        const lists = room.playerList;
        const roomtitle = "房间号:" + room.roomId;
        const inRomm = (room.status === 0) ? (
            <div style={{textAlign: 'center'}}><Button onClick={() => this.joinRoom(room.roomId)}>加入房间</Button>
            </div>) : (<div style={{textAlign: 'center'}}><Button>围观</Button></div>)

        return (<Card title={roomtitle} style={{width: 300}}>
            <List
                itemLayout="horizontal"
                dataSource={lists}
                footer={inRomm}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={<a href="https://ant.design">{item.username}</a>}

                            description={item.status==='IN_ROOM'?'未准备':(item.status==='PRE'?'已准备':'游戏中,当前分数为'+item.score)}
                        />
                    </List.Item>
                )}
            />,
        </Card>)
    }
}


