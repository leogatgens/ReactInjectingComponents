package com.Proyecto2.Lenguajes.models;


import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Image {
    @Id
    private int id;
    private String description;
    private String url;


    public Image() {
    }

    public Image(int id, String description, String url) {
        this.id = id;
        this.description = description;
        this.url = url;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
