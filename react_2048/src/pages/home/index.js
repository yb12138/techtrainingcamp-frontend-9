/*
 * @Author: your name
 * @Date: 2020-11-24 20:52:26
 * @LastEditTime: 2020-11-27 00:47:56
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

class Home extends React.Component {


    render() {
        const status = this.props.status;
        if (status == "IN_GAME") {
            this.props.history.push('/play');
        }
        console.log("Home:", this.props);
        const rooms = this.props.rooms;


        return (
            <>
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