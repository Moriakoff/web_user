package web.practice.user.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.practice.user.persistence.dao.UserRepository;
import web.practice.user.persistence.model.User;
import web.practice.user.web.dto.UserDto;

import java.util.List;

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

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam Integer id) {
        userRepository.deleteById(id);
    }

    @GetMapping("/get_all")
    public List <User> getAll() {
        return userRepository.findAll();
    }


}
