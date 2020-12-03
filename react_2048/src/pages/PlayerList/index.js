/*
 * @Author: your name
 * @Date: 2020-12-02 10:17:48
 * @LastEditTime: 2020-12-02 20:53:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\pages\PlayerList\index.js
 */
import React from 'react'
import {Row, Col, List} from 'antd';
import SmellBoard from '../SmellBoard';
import {RedoOutlined} from '@ant-design/icons';

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rank: true,
        }
    }

    changeRank() {
        this.setState(Object.assign({}, this.state, {rank: !this.state.rank}))
    }

    render() {
        let title = '排行榜';
        let otherplays = [];
        let content = null;
        if (this.props.playerList) {
            otherplays = this.props.playerList; //排行榜
        }
        if (this.state.rank) {
            title = '房间内其余玩家情况';
            content = (otherplays.map((v, i) => {
                return <Col span={12}>
                    <SmellBoard style="text-align: center;" current={v.current} score={v.score} username={v.username}></SmellBoard>
                </Col>
            }));
        } else {
            content = (<>
                <List
                    bordered
                    dataSource={otherplays}
                    renderItem={item => (
                        <List.Item>
                            {item.username}目前得分{item.score}
                        </List.Item>
                    )}
                />
            </>)
        }
        return (
            <>
                <Row style={{marginTop: '10px'}}>
                    <Col span={22}>
                        <h3>{title}</h3>
                        {content}
                    </Col>
                    <Col span={2}>
                        <RedoOutlined onClick={() => this.changeRank()}/>
                    </Col>
                </Row>
                <Row>
                    {
                    }
                </Row>
            </>)
    }
}
const compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
}
