package com.dormitory.services;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class GenericService<E> {
    @PersistenceContext
    EntityManager entityManager;

    private final Class<E> entityClass;

    public GenericService(Class<E> entityClass) {

        this.entityClass = entityClass;
    }

    public E findById(Integer id) {
        return entityManager.find(entityClass, id);
    }

    public E add(E entity) {
        this.entityManager.persist(entity);
        this.entityManager.flush();
        return entity;
    }

    public E update(E entity) {
        this.entityManager.merge(entity);
        this.entityManager.flush();
        return entity;
    }

    public void delete(E entity) {
        this.entityManager.remove(entity);
    }
}
