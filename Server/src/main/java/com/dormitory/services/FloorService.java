package com.dormitory.services;

import com.dormitory.entities.Floor;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class FloorService{
    @PersistenceContext
    EntityManager entityManager;
    public List<Floor> getAll() {
        TypedQuery<Floor> query = entityManager.createQuery("SELECT c FROM Floor c", Floor.class);
        return query.getResultList();
    }

    public Floor add(Floor entity) {
        this.entityManager.persist(entity);
        this.entityManager.flush();
        return entity;
    }
}
