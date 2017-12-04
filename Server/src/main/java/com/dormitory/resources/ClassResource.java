package com.dormitory.resources;

import com.dormitory.entities.Class;
import com.dormitory.services.ClassService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Stateless
@Path("class")
public class ClassResource {
    @EJB
    private ClassService classService;

    @GET
    @Path("all")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Class> getAll() {
        return classService.getAll();
    }
}
