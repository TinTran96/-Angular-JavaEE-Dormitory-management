package com.dormitory.resources;

import com.dormitory.entities.Club;
import com.dormitory.services.ClubService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Stateless
@Path("club")
public class ClubResource {
    @EJB
    private ClubService clubService;

    @GET
    @Path("all")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Club> getAll() {
        return clubService.getAll();
    }
}
