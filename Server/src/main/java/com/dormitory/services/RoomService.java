package com.dormitory.services;

import com.dormitory.entities.Room;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class RoomService {
    @PersistenceContext
    EntityManager entityManager;
    public List<Room> getAll() {
        TypedQuery<Room> query = entityManager.createQuery("SELECT c FROM Room c", Room.class);
        return query.getResultList();
    }

    public Room add(Room entity) {
        this.entityManager.persist(entity);
        this.entityManager.flush();
        return entity;
    }

    public Room findByRoomId(String room_id) {
        return entityManager.find(Room.class, room_id);
    }

    public void update(Room _room) {
        Room room = findByRoomId(_room.getId());
        room.setFloorId(_room.getFloorId());
        room.setCapacity(_room.getCapacity());
        entityManager.flush();
    }

    public void delete(Room room)
    {
        this.entityManager.remove(room);
    }
}
