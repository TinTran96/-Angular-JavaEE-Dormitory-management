package com.dormitory.services;

import com.dormitory.entities.Class;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class ClassService {
    @PersistenceContext
    EntityManager entityManager;
    public List<Class> getAll() {
        TypedQuery<Class> query = entityManager.createQuery("SELECT c FROM Class c", Class.class);
        return query.getResultList();
    }

    public Class add(Class entity) {
        this.entityManager.persist(entity);
        this.entityManager.flush();
        return entity;
    }
}
