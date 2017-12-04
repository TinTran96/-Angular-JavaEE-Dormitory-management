/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dormitory.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Tín
 */
@Entity
@Table(name = "temporaryabsences")
@NamedQueries({
    @NamedQuery(name = "Temporaryabsences.findAll", query = "SELECT t FROM Temporaryabsences t")
    , @NamedQuery(name = "Temporaryabsences.findById", query = "SELECT t FROM Temporaryabsences t WHERE t.id = :id")
    , @NamedQuery(name = "Temporaryabsences.findByStartdate", query = "SELECT t FROM Temporaryabsences t WHERE t.startdate = :startdate")
    , @NamedQuery(name = "Temporaryabsences.findByNumofabsences", query = "SELECT t FROM Temporaryabsences t WHERE t.numofabsences = :numofabsences")
    , @NamedQuery(name = "Temporaryabsences.findByStudentId", query = "SELECT t FROM Temporaryabsences t WHERE t.studentId = :studentId")})
public class Temporaryabsences implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "startdate")
    @Temporal(TemporalType.DATE)
    private Date startdate;

    @Column(name = "numofabsences")
    private Integer numofabsences;

    @Column(name = "reason")
    private String reason;

    @Column(name = "student_id")
    private String studentId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Integer getNumofabsences() {
        return numofabsences;
    }

    public void setNumofabsences(Integer numofabsences) {
        this.numofabsences = numofabsences;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
