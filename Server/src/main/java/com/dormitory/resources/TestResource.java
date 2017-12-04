package com.dormitory.resources;

import com.dormitory.entities.Floor;
import com.dormitory.services.FloorService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Stateless
@Path("test")
public class TestResource {
    @EJB
    private FloorService floorService;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Floor> getAll() {
        return floorService.getAll();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response add(Floor floor) {
        floorService.add(floor);
        return Response.ok().build();
    }
}
