package com.github.rodis00.backend;

import com.github.rodis00.backend.model.Earning;
import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.model.User;
import com.github.rodis00.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
	private final UserRepository userRepository;

	public BackendApplication(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (userRepository.findById(1).isEmpty()) {
			Expense expense1 = new Expense();
			expense1.setTitle("new computer");
			expense1.setPrice(2500.99);
			expense1.setDate(new Date());

			Expense expense2 = new Expense();
			expense2.setTitle("new car");
			expense2.setPrice(12000.0);
			expense2.setDate(new Date());

			Earning earning1 = new Earning();
			earning1.setTitle("bitcoin");
			earning1.setAmount(5000.0);
			earning1.setDate(new Date());

			Earning earning2 = new Earning();
			earning2.setTitle("house sale");
			earning2.setAmount(28000.85);
			earning2.setDate(new Date());

			User user = new User();
			user.setEmail("user@example.com");
			user.setUsername("user");
			user.setPassword("user123");
			user.setExpenses(new ArrayList<>());
			user.setEarnings(new ArrayList<>());

			user.addExpense(expense1);
			user.addExpense(expense2);
			user.addEarning(earning1);
			user.addEarning(earning2);
			userRepository.save(user);
		}
	}
}
