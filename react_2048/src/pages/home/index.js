/*
 * @Author: your name
 * @Date: 2020-11-24 20:52:26
 * @LastEditTime: 2020-12-03 15:06:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\pages\home\index.js
 */
import React from 'react'
//导入store
import {connect} from 'react-redux';
import {PieChartOutlined,} from '@ant-design/icons';
import store from '../../store'
import {Col, Row} from 'antd';
import 'antd/dist/antd.css';
import Room from '../../pages/Room';
import { Layout ,Menu} from 'antd';
import { send } from '@giantmachines/redux-websocket/dist';
const { SubMenu } = Menu;

const { Header, Content,Sider } = Layout;

class Home extends React.Component {

    addRoom(){
        store.dispatch(send({type: "Add_Room"}));
    }

    render() {
        const status = this.props.status;
        if (status === "IN_ROOM") {
            
            this.props.history.push('/play'); 
        }
        const rooms = this.props.rooms;


        return (
            <>
                <Header >
                    <h1 style={{color:'white'}}> 游戏大厅</h1></Header>
                    <Layout style={{ height: '100%' }}>
                    <Sider width={200}  style={{ height: '100%' }}  className="site-layout-background">
                    <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
        >
         <Menu.Item  onClick={this.addRoom} key="1" icon={<PieChartOutlined />}>
              增加房间
            </Menu.Item>
        </Menu>
                    </Sider>
                    <Content>
                        <Row gutter={16}>
                            {
                            rooms.map((v, i) => {
                                return <Col key={i} className="gutter-row" span={3}>
                                 <Room room={v} history={this.props.history}/>
                              </Col>
                          })
                         }
                         </Row>
                </Content>
                </Layout>
            </>
        );
    }
}

const mapStateToProps = (state) => {

    return state;
}

export default connect(mapStateToProps)(Home)