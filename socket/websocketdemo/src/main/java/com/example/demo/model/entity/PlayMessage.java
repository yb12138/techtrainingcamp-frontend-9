package com.example.demo.model.entity;

import java.io.Serializable;

public class PlayMessage implements Serializable {
    private static final long serialVersionUID = 6762300101092577096L;
    private MessageType type;
    private String content;
    private String sender;

    public enum MessageType {
        UPLOAD,//上传自身数据
        VIEW_ROOM,//查看房间信息
        VIEW_PLAYERS,//查看当前房间玩家游戏状况
        LEAVE, //退出连接
        IN_ROOM,//加入房间
        Start //该玩家已准备
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
