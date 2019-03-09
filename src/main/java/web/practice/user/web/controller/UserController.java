package web.practice.user.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import web.practice.user.persistence.dao.UserRepository;
import web.practice.user.persistence.model.User;
import web.practice.user.web.dto.UserDto;

@RestController
@CrossOrigin // need for CORS
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/add_user")
    public User saveUser(@RequestBody UserDto userDto) {
        User user = User.builder()
                .id(userDto.getId())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .email(userDto.getEmail())
                .build();

        return userRepository.save(user);
    }


}
