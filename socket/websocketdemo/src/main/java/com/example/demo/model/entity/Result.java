package com.example.demo.model.entity;

public class Result {
    private Type type;
    private String content;

    public enum Type {
        Rooms,//返回房间数
        USERINFO, //返回用户信息
        START, //开始游戏标志
        RoomInfo, //返回房间信息
        TempInfo
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Result(Type type, String content) {
        this.type = type;
        this.content = content;
    }

    public Result() {
    }
}
