package com.example.demo;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.model.entity.PlayRoom;
import com.example.demo.model.entity.Player;
import com.example.demo.model.entity.Result;
import com.example.demo.model.enums.StatusEnum;
import com.example.demo.util.JsonUtil;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.stream.Collectors;

import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;

import static com.example.demo.model.enums.StatusEnum.IN_GAME;

public class WebSocketUtils {
    // 创建一个集合，里面存放所有的在线用户
    public static final Map<String, Player> ONLINE_USER_SESSIONS = new ConcurrentHashMap<>();
    public static final List<PlayRoom> rooms=new CopyOnWriteArrayList<>();

    public static final Map<String,List<String>> room_user=new ConcurrentHashMap<>();
    //初始化添加一个房间
    static {
        PlayRoom playRoom=new PlayRoom();
        playRoom.setRoomId(1001);
        playRoom.setMaxPlayerNumber(5);
        playRoom.setPlayerList(new ArrayList<>());
        rooms.add(playRoom);
    }
    // 给客户端发送信息
    public static void sendMessage( Session session , String message )
    {
        // 如果会话是空的，则什么也不干
        if( session == null )
        {
            return ;
        }

        // 如果不是空，我要创建远端的客户端断点，进行消息发送
        final RemoteEndpoint.Basic basic = session.getBasicRemote();
        if( basic == null )
        {
            return;
        }

        try {
            basic.sendText(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //给客户端返回所有房间信息
    public static  void  sendAllRoom(){
        List<PlayRoom> playRooms=new ArrayList<>();
        for (PlayRoom playRoom:rooms){
            PlayRoom temp=new PlayRoom();
            List<Player> players=playRoom.getPlayerList();
            copRoomList(temp, playRoom, players);
            playRooms.add(temp);
        }
        String roomstring= JSON.toJSONString(playRooms);
        Result result=new Result(Result.Type.Rooms,roomstring);
        sendAllMessage(JSON.toJSONString(result));
    }

    public static void joinRoom(String username,Long RoomID){
        Player user=ONLINE_USER_SESSIONS.get(username);
        if(user==null||user.getSession()==null){
            return;
        }
        for (PlayRoom playRoom:rooms){
            if (playRoom.getRoomId()==RoomID){
                List<Player> players=playRoom.getPlayerList();
                for (Player player:players){
                    if (player.getUsername().equals(username)){
                       return ;  //该用户断线重连，无需操作
                    }
                }
                user.setStatus(IN_GAME);
                user.setCurrent(new int[4][4]);
                user.setScore(0.0);
                user.setRoomID(RoomID);
                players.add(user);
                playRoom.setPlayerList(players);
            }
        }
        sendAllRoom();
        updateUserInfo(user);
    }

    public static void updateUserInfo(Player user) {
        if(user==null||user.getSession()==null){
            return;
        }
        Player data=new Player();
        data.setScore(user.getScore());
        data.setCurrent(user.getCurrent());
        data.setUsername(user.getUsername());
        data.setStatus(user.getStatus());
        data.setUserid(user.getUserid());
        data.setRoomID(user.getRoomID());
        Result result=new Result(Result.Type.USERINFO,JSON.toJSONString(data));
        sendMessage(user.getSession(),JSON.toJSONString(result));
    }


    // 群发信息给所有在线的人（在线的人在集合里面）
    public static void sendAllMessage(String message)
    {
        for (Player user:ONLINE_USER_SESSIONS.values()){
            sendMessage(user.getSession() , message);
        }

    }

    public static void startGame(Long roomID) {
        List<PlayRoom> playRoomList=rooms.stream().filter(item->item.getRoomId()==roomID).collect(Collectors.toList());
        if (playRoomList.size() == 1){
            PlayRoom playRoom=playRoomList.get(0);
            int oldcount=playRoom.getPreNumber();
            int playersize=playRoom.getPlayerList().size();
            if(oldcount+1==playersize){
                //房间内所有人都已经准备就绪，开始游戏
                Result result=new Result(Result.Type.START,null);
                String resultstr=JSON.toJSONString(result);
                for (Player player:playRoom.getPlayerList()){
                    Session session=player.getSession();
                    sendMessage(session,resultstr);
                }
            }
            playRoom.setPreNumber(oldcount+1);
        }
    }

    public static void updateCurrent(String username, int[][] current, Double score, Long roomID) {
         //更新用户信息
         Player player=ONLINE_USER_SESSIONS.get(username);
         if (player==null||player.getSession()==null){
             return;
         }
         player.setCurrent(current);
         player.setScore(score);
         double maxScore=player.getMaxScore();
         if (maxScore<score){
             player.setMaxScore(score);
         }
         //更新房间内用户信息
        List<PlayRoom> playRoomList=rooms.stream().filter(item->item.getRoomId()==roomID).collect(Collectors.toList());;
        if (playRoomList.size() == 1){
            PlayRoom playRoom=playRoomList.get(0);
            List<Player> players=playRoom.getPlayerList();
            for (Player player1:players){
                if (player1.getUsername().equals(player.getUsername())){
                    player1.setCurrent(current);
                    player1.setScore(score);
                    player1.setMaxScore(player.getMaxScore());
                }
            }
        }
        sendRoomUserInfo(roomID);
    }
    public static void sendRoomUserInfo(Long roomID){
        List<PlayRoom> playRoomList=rooms.stream().filter(item->item.getRoomId()==roomID).collect(Collectors.toList());
        if(playRoomList.size() == 1){
            PlayRoom temp=new PlayRoom();
           PlayRoom playRoom=playRoomList.get(0);
            List<Player> players=playRoom.getPlayerList();
            copRoomList(temp, playRoom, players);
            String roomstring= JSON.toJSONString(temp);
            Result result=new Result(Result.Type.RoomInfo,roomstring);
            String resultstr=JSON.toJSONString(result);
            for (Player player:playRoom.getPlayerList()){
                sendMessage(player.getSession(),resultstr);
            }
        }
    }

    private static void copRoomList(PlayRoom temp, PlayRoom playRoom, List<Player> players) {
        List<Player> playersResult=new ArrayList<>();
        for (Player player:players){
            Player player1=new Player();
            player1.setCurrent(player.getCurrent());
            player1.setStatus(player.getStatus());
            player1.setUsername(player.getUsername());
            player1.setScore(player.getScore());
            player1.setMaxScore(player.getMaxScore());
            playersResult.add(player1);
        }
        temp.setPlayerList(playersResult);
        temp.setRoomId(playRoom.getRoomId());
        temp.setMaxPlayerNumber(playRoom.getMaxPlayerNumber());
        temp.setWinner(playRoom.getWinner());
        temp.setMaxScore(playRoom.getMaxScore());
        temp.setActualPlayerNumber(playRoom.getActualPlayerNumber());
    }
}
