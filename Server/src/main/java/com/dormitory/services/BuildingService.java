package com.dormitory.services;

import com.dormitory.entities.Building;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class BuildingService {
    @PersistenceContext
    EntityManager entityManager;
    public List<Building> getAll() {
        TypedQuery<Building> query = entityManager.createQuery("SELECT c FROM Building c", Building.class);
        return query.getResultList();
    }

    public Building add(Building entity) {
        this.entityManager.persist(entity);
        this.entityManager.flush();
        return entity;
    }
}
