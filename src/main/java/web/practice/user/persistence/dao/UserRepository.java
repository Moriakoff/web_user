package web.practice.user.persistence.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import web.practice.user.persistence.model.User;

public interface UserRepository extends JpaRepository<User,Integer> {
}
