package com.revisecard.Model;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
public class Card {
    @Id
    private ObjectId id;
    private String name;
    private String Code;
    private String contentType;
    private String language;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }
    public String getIdAsString() {
        return id != null ? id.toString() : null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return Code;
    }

    public void setCode(String code) {
        Code = code;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Card(){}
    public Card(String name, String code, String contentType, String language) {
        this.name = name;
        Code = code;
        this.contentType = contentType;
        this.language = language;
    }

}
