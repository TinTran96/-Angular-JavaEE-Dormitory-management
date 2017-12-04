package com.dormitory.resources;

import com.dormitory.entities.Student;
import com.dormitory.services.StudentService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Stateless
@Path("student")
public class StudentResource {
    @EJB
    private StudentService studentService;

    @GET
    @Path("all")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Student> getAll() {
        return studentService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Student get(@PathParam("id") String id) {
        return studentService.findById(id);
    }

    @POST
    @Path("create")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response add(Student student) {
        studentService.add(student);
        return Response.ok().build();
    }

    @PUT
    @Path("update")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response update(Student student) {
        studentService.update(student);
        return Response.ok().build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        Student studentEntity = studentService.findById(id);
        studentService.delete(studentEntity);
        return Response.noContent().build();
    }
}
