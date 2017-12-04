package com.dormitory.resources;

import com.dormitory.entities.Room;
import com.dormitory.services.RoomService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
@Stateless
@Path("room")
public class RoomResource {
    @EJB
    private RoomService roomService;

    @GET
    @Path("all")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Room> getAll() {
        return roomService.getAll();
    }

    @POST
    @Path("create")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response add(Room room) {
        roomService.add(room);
        return Response.ok().build();
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Room get(@PathParam("id") String id) {
        return roomService.findByRoomId(id);
    }

    @PUT
    @Path("update")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response update(Room room) {
        roomService.update(room);
        return Response.ok().build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        Room roomEntity = roomService.findByRoomId(id);
        roomService.delete(roomEntity);
        return Response.noContent().build();
    }
}
