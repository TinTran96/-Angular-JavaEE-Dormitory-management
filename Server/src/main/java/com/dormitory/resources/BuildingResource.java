package com.dormitory.resources;

import com.dormitory.entities.Building;
import com.dormitory.services.BuildingService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Stateless
@Path("building")
public class BuildingResource {
    @EJB
    private BuildingService buildingService;

    @GET
    @Path("all")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Building> getAll() {
        return buildingService.getAll();
    }
}
