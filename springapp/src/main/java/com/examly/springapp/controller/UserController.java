package com.examly.springapp.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserRole;
import com.examly.springapp.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/signup")
    public User createUser(@RequestBody User user) throws Exception {

        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleId(2L);
        role.setRoleName("USER");

        UserRole userRole = new UserRole();
        userRole.setRole(role);
        userRole.setUser(user);
        roles.add(userRole);
        return this.userService.createUser(user, roles);
    }

    @GetMapping("/email/{email}")
    public User getUser(@PathVariable("email") String email) {
        return this.userService.getUser(email);

    }

    @GetMapping("/getStudentId")
    public String getStudentId(@RequestParam String userEmail) {
        Query queryGetStudentIdOfAUser = entityManager.createNativeQuery("select student_id "
                + "from students as s "
                + "where s.student_email = :userEmail");

        queryGetStudentIdOfAUser = queryGetStudentIdOfAUser.setParameter("userEmail", userEmail);

        List result = queryGetStudentIdOfAUser.getResultList();

        System.out.println("------------------------------------------");
        System.out.println(result);
        System.out.println("------------------------------------------");

        entityManager.clear();
        entityManager.close();

        if (result.size() > 0) {
            return result.get(0).toString();
        }

        return "null";
    }

}
