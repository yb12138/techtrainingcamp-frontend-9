package com.example.demo.model.entity;


import com.example.demo.model.enums.StatusEnum;

import javax.websocket.Session;
import java.io.Serializable;

public class Player implements Serializable {

    private long userid;                    // Id

    private String username;            // 用户名/昵称

    private String password;            // 密码

    private String sex;                 // 性别

    private double score;               // 实时分数

    private double maxScore;            // 最高分数

    private StatusEnum status;          // 在线状态

    private Session session;           //会话状态

    private int[][] current; //棋盘状态

    private long roomID;

    public Player(long userid, String username, String password, String sex, double score, double maxScore, StatusEnum status, Session session, int[][] current, long roomID) {
        this.userid = userid;
        this.username = username;
        this.password = password;
        this.sex = sex;
        this.score = score;
        this.maxScore = maxScore;
        this.status = status;
        this.session = session;
        this.current = current;
        this.roomID = roomID;
    }

    public Player(long userid, String username, String password, String sex, double score, double maxScore, StatusEnum status, Session session, int[][] current) {
        this.userid = userid;
        this.username = username;
        this.password = password;
        this.sex = sex;
        this.score = score;
        this.maxScore = maxScore;
        this.status = status;
        this.session = session;
        this.current = current;
    }

    public Player(String username, String password, String sex, double score, double maxScore, StatusEnum status, Session session) {
        this.username = username;
        this.password = password;
        this.sex = sex;
        this.score = score;
        this.maxScore = maxScore;
        this.status = status;
        this.session = session;
    }

    public Player() {

    }

    @Override
    public String toString() {
        return "Player{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", sex='" + sex + '\'' +
                ", score=" + score +
                ", maxScore=" + maxScore +
                ", status=" + status +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public double getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(double maxScore) {
        this.maxScore = maxScore;
    }

    public StatusEnum getStatus() {
        return status;
    }

    public void setStatus(StatusEnum status) {
        this.status = status;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public int[][] getCurrent() {
        return current;
    }

    public void setCurrent(int[][] current) {
        this.current = current;
    }

    public long getUserid() {
        return userid;
    }

    public long getRoomID() {
        return roomID;
    }

    public void setRoomID(long roomID) {
        this.roomID = roomID;
    }

    public void setUserid(long userid) {
        this.userid = userid;
    }

}