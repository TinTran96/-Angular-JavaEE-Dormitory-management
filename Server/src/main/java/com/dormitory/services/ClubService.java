package com.dormitory.services;

import com.dormitory.entities.Club;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class ClubService {
    @PersistenceContext
    EntityManager entityManager;
    public List<Club> getAll() {
        TypedQuery<Club> query = entityManager.createQuery("SELECT c FROM Club c", Club.class);
        return query.getResultList();
    }

    public Club add(Club entity) {
        this.entityManager.persist(entity);
        this.entityManager.flush();
        return entity;
    }
}
