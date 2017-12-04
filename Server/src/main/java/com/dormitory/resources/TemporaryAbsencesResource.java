package com.dormitory.resources;

import com.dormitory.entities.Temporaryabsences;
import com.dormitory.services.TemporaryAbsencesService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Stateless
@Path("tmpAbsences")
public class TemporaryAbsencesResource {
    @EJB
    private TemporaryAbsencesService tmpAbsencesService;

    @GET
    @Path("all")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Temporaryabsences> getAll() {
        return tmpAbsencesService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Temporaryabsences get(@PathParam("id") int id) {
        return tmpAbsencesService.findById(id);
    }

    @POST
    @Path("create")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response add(Temporaryabsences tmp) {
        tmpAbsencesService.add(tmp);
        return Response.ok().build();
    }

    @PUT
    @Path("update")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response update(Temporaryabsences tmp) {
        tmpAbsencesService.update(tmp);
        return Response.ok().build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") int id) {
        Temporaryabsences absencesEntity = tmpAbsencesService.findById(id);
        tmpAbsencesService.delete(absencesEntity);
        return Response.noContent().build();
    }
}
