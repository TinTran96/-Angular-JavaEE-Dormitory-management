package com.dormitory.services;

import com.dormitory.entities.User;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class UserService {
    @PersistenceContext
    EntityManager entityManager;

    public User findByEmail(String email) {
        return entityManager.find(User.class, email);
    }

    public User add(User entity) {
        this.entityManager.persist(entity);
        this.entityManager.flush();
        return entity;
    }

    public User userExists(User user) {
        String hql = "FROM User as a WHERE a.email = ? AND a.password = ?";
        List<User> results = entityManager.createQuery(hql).setParameter(1, user.getEmail())
                .setParameter(2,user.getPassword())
                .getResultList();
        if (results.isEmpty())
            return null;
        else return results.get(0);
    }
}
