/*
 * @Author: your name
 * @Date: 2020-11-24 20:52:26
 * @LastEditTime: 2020-12-02 16:37:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\pages\home\index.js
 */
import React from 'react'
//导入store
import {connect} from 'react-redux';

import {Col, Row} from 'antd';
import 'antd/dist/antd.css';
import Room from '../../pages/Room';
import { Layout } from 'antd';

const { Header, Content } = Layout;

class Home extends React.Component {


    render() {
        const status = this.props.status;
        if (status === "IN_GAME") {
<<<<<<< HEAD
            console.log("出发了");
=======
>>>>>>> e548c1142444f073e11b5c6f7afe5d3d5a37e0e8
            this.props.history.push('/play');
            
        }
        console.log("Home:", this.props);
        const rooms = this.props.rooms;


        return (
            <>
                <Header >
                    <h1 style={{color:'white'}}> 游戏大厅</h1></Header>
                <Row gutter={16}>
                    {
                        rooms.map((v, i) => {
                            return <Col key={i} className="gutter-row" span={6}>
                                <Room room={v} history={this.props.history}/>
                            </Col>
                        })
                    }
                </Row>
            </>
        );
    }
}

const mapStateToProps = (state) => {

    return state;
}

export default connect(mapStateToProps)(Home)