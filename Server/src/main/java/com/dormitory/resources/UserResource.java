package com.dormitory.resources;

import com.dormitory.entities.Floor;
import com.dormitory.entities.Student;
import com.dormitory.entities.User;
import com.dormitory.services.UserService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Stateless
@Path("users")
public class UserResource {
    @EJB
    private UserService userService;

    @POST
    @Path("login")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response login(User user) {
        User innerUser = userService.userExists(user);
        if (innerUser != null) {
            return Response.ok().entity(innerUser).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @POST
    @Path("signup")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response add(User user) {
        userService.add(user);
        return Response.ok().build();
    }
}
