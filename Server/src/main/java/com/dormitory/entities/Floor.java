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
@Table(name = "floors")
public class Floor implements Serializable {

    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "id")
    private String id;
    @Size(max = 10)
    @Column(name = "building_id")
    private String buildingId;

    public Floor() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setBuildingId(String id)
    {
        this.buildingId = id;
    }
    public String getBuildingId(){return this.buildingId;}
}
