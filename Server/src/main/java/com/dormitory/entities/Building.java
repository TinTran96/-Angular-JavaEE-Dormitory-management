/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dormitory.entities;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Tín
 */
@Entity
@Table(name = "building")
@NamedQueries({
    @NamedQuery(name = "Building.findAll", query = "SELECT b FROM Building b")
    , @NamedQuery(name = "Building.findById", query = "SELECT b FROM Building b WHERE b.id = :id")})
public class Building implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "id")
    private String id;

    public Building() {
    }

    public Building(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
