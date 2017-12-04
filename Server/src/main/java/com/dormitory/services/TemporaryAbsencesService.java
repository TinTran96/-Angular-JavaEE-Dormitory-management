package com.dormitory.services;

import com.dormitory.entities.Class;
import com.dormitory.entities.Temporaryabsences;
import com.dormitory.entities.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;


@Stateless
public class TemporaryAbsencesService {
    @PersistenceContext
    EntityManager entityManager;
    public List<Temporaryabsences> getAll() {
        TypedQuery<Temporaryabsences> query = entityManager.createQuery("SELECT c FROM Temporaryabsences c", Temporaryabsences.class);
        return query.getResultList();
    }
    public Temporaryabsences add(Temporaryabsences abs) {
        this.entityManager.persist(abs);
        this.entityManager.flush();
        return abs;
    }

    public Temporaryabsences findById(int abs_id) {
        return entityManager.find(Temporaryabsences.class, abs_id);
    }

    public void update(Temporaryabsences absences) {
        Temporaryabsences abs = findById(absences.getId());
        abs.setNumofabsences(absences.getNumofabsences());
        abs.setStartdate(absences.getStartdate());
        abs.setStudentId(absences.getStudentId());
        abs.setReason(absences.getReason());
        entityManager.flush();
    }

    public void delete(Temporaryabsences absences)
    {
        this.entityManager.remove(absences);
    }
}
