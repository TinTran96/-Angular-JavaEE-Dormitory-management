package com.dormitory.resources;

import com.dormitory.entities.Floor;
import com.dormitory.services.FloorService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Stateless
@Path("floor")
public class FloorResource {
    @EJB
    private FloorService floorService;

    @GET
    @Path("all")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Floor> getAll() {
        return floorService.getAll();
    }
}
