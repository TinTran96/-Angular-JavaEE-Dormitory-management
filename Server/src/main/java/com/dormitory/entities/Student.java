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
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Tín
 */
@Entity
@Table(name = "student")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Student.findAll", query = "SELECT s FROM Student s")
    , @NamedQuery(name = "Student.findById", query = "SELECT s FROM Student s WHERE s.id = :id")
    , @NamedQuery(name = "Student.findByClubId", query = "SELECT s FROM Student s WHERE s.clubId = :clubId")
    , @NamedQuery(name = "Student.findByClassId", query = "SELECT s FROM Student s WHERE s.classId = :classId")
    , @NamedQuery(name = "Student.findByGender", query = "SELECT s FROM Student s WHERE s.gender = :gender")
    , @NamedQuery(name = "Student.findByDob", query = "SELECT s FROM Student s WHERE s.dob = :dob")
    , @NamedQuery(name = "Student.findByCourse", query = "SELECT s FROM Student s WHERE s.course = :course")})
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "id")
    private String id;
    @Size(max = 10)
    @Column(name = "club_id")
    private String clubId;
    @Size(max = 10)
    @Column(name = "room_id")
    private String roomId;
    @Size(max = 10)
    @Column(name = "class_id")
    private String classId;
    @Lob
    @Size(max = 65535)
    @Column(name = "name")
    private String name;
    @Column(name = "gender")
    private Integer gender;
    @Column(name = "dob")
    @Temporal(TemporalType.DATE)
    private Date dob;
    @Lob
    @Size(max = 65535)
    @Column(name = "ssn")
    private String ssn;
    @Lob
    @Size(max = 65535)
    @Column(name = "address")
    private String address;
    // @Pattern(regexp="^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message="Invalid phone/fax format, should be as xxx-xxx-xxxx")//if the field contains phone or fax number consider using this annotation to enforce field validation
    @Lob
    @Size(max = 65535)
    @Column(name = "phone")
    private String phone;
    @Lob
    @Size(max = 65535)
    @Column(name = "pob")
    private String pob;
    @Lob
    @Size(max = 65535)
    @Column(name = "nation")
    private String nation;
    @Lob
    @Size(max = 65535)
    @Column(name = "religion")
    private String religion;
    @Column(name = "course")
    private Integer course;

    public Student() {
    }

    public Student(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClubId() {
        return clubId;
    }

    public void setClubId(String clubId) {
        this.clubId = clubId;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }
    
    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPob() {
        return pob;
    }

    public void setPob(String pob) {
        this.pob = pob;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public Integer getCourse() {
        return course;
    }

    public void setCourse(Integer course) {
        this.course = course;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Student)) {
            return false;
        }
        Student other = (Student) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.kytucxa.entity.Student[ id=" + id + " ]";
    }
    
}
