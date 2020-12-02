package com.example.demo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.model.entity.PlayMessage;
import com.example.demo.model.entity.Player;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.ServerEndpoint;

import static com.example.demo.model.enums.StatusEnum.ONLINE;

@ServerEndpoint("/chat-room/{username}")
@RestController
public class ChatRoomServerEndpoint {
    // 检测到客户端创建连接成功了，我需要将该客户端添加到我们集合中（就是存在在线会话的集合）
    @OnOpen
    public void openSession(@PathParam("username") String username,
                            Session session) {
        Player user=WebSocketUtils.ONLINE_USER_SESSIONS.get(username);
        if (user==null){
            user=new Player();
            user.setUsername(username);
            user.setStatus(ONLINE);
        }
        user.setSession(session);
        WebSocketUtils.ONLINE_USER_SESSIONS.put(username, user);
        WebSocketUtils.sendAllRoom();
        WebSocketUtils.updateUserInfo(user);
    }

    @OnMessage
    public void onMessage(@PathParam("username") String username ,
                          String message,Session session)
    {
        if (message!=null&&message.length()!=0){
            PlayMessage playMessage=JSON.parseObject(message,PlayMessage.class);
            JSONObject jsonObject=null;
            if (playMessage.getContent()!=null){
                String content=playMessage.getContent();
                jsonObject=JSON.parseObject(content);
            }
            switch (playMessage.getType()){
                case VIEW_ROOM:
                    WebSocketUtils.sendAllRoom(); //实时刷新房间状态
                    break;
                case IN_ROOM:
                    if(jsonObject!=null) {
                        Long roomId = jsonObject.getLong("roomID");
                        WebSocketUtils.joinRoom(username, roomId);
                    }
                    break;
                case Start:
                    if(jsonObject!=null) {
                        Long roomID = jsonObject.getLong("roomID");
                        WebSocketUtils.startGame(roomID);
                    }
                    break;
                case UPLOAD:
                    if (jsonObject!=null){
                        JSONArray array=jsonObject.getJSONArray("current");
                        int[][] current=new int[4][4];
                        for (int i=0;i<array.size();i++){
                            JSONArray jsonArray=array.getJSONArray(i);
                            for (int j=0;j<jsonArray.size();j++){
                                current[i][j]=jsonArray.getIntValue(j);
                            }
                        }
                        Double score=jsonObject.getDouble("score");
                        Long roomID = jsonObject.getLong("roomID");
                        WebSocketUtils.updateCurrent(username,current,score,roomID);
                    }
                    break;
                case LEAVE:
                        WebSocketUtils.exitGame(username);
                    break;
                case GetInfo:
                    WebSocketUtils.sendUserInfo(username);
                    break;
                default:
            }
        }
    }

    @OnClose
    public void onClose(@PathParam("username") String username ,
                        Session session)
    {
        WebSocketUtils.ONLINE_USER_SESSIONS.remove(username);
        try {
            session.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        try {
            session.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
