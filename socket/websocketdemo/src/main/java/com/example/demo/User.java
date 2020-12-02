package com.example.demo;

import javax.websocket.Session;
import java.util.List;

public class User {
    private String username;
    private int[][] current;
    private Session session;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int[][] getCurrent() {
        return current;
    }

    public void setCurrent(int[][] current) {
        this.current = current;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}
