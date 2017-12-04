package com.dormitory.services;

import com.dormitory.entities.Student;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class StudentService {
    @PersistenceContext
    EntityManager entityManager;
    public List<Student> getAll() {
        TypedQuery<Student> query = entityManager.createQuery("SELECT c FROM Student c", Student.class);
        return query.getResultList();
    }
    public Student findById(String id) {
        return entityManager.find(Student.class, id);
    }

    public Student add(Student entity) {
        this.entityManager.persist(entity);
        this.entityManager.flush();
        return entity;
    }

    public Student userExists(Student stu) {
        String hql = "FROM Student as a WHERE a.id = ? ";
        List<Student> results = entityManager.createQuery(hql).setParameter(1, stu.getId())
                .getResultList();
        if (results.isEmpty())
            return null;
        else return results.get(0);
    }

    public void update(Student student) {
        Student stu = findById(student.getId());
        stu.setClassId(student.getClassId());
        stu.setRoomId(student.getRoomId());
        stu.setClubId(student.getClubId());
        stu.setAddress(student.getAddress());
        stu.setCourse(student.getCourse());
        stu.setDob(student.getDob());
        stu.setGender(student.getGender());
        stu.setName(student.getName());
        stu.setNation(student.getNation());
        stu.setPhone(student.getPhone());
        stu.setPob(student.getPob());
        stu.setReligion(student.getReligion());
        stu.setSsn(student.getSsn());
        entityManager.flush();
    }

    public void delete(Student student)
    {
        this.entityManager.remove(student);
    }
}
