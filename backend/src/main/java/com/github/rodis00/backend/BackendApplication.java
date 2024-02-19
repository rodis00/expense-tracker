package com.github.rodis00.backend;

import com.github.rodis00.backend.model.Earning;
import com.github.rodis00.backend.model.Expense;
import com.github.rodis00.backend.model.User;
import com.github.rodis00.backend.repository.EarningRepository;
import com.github.rodis00.backend.repository.ExpenseRepository;
import com.github.rodis00.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
	private final UserRepository userRepository;
	private final ExpenseRepository expenseRepository;
	private final EarningRepository earningRepository;
	private final PasswordEncoder passwordEncoder;

	public BackendApplication(
            UserRepository userRepository,
            ExpenseRepository expenseRepository,
            EarningRepository earningRepository, PasswordEncoder passwordEncoder
    ) {
		this.userRepository = userRepository;
		this.expenseRepository = expenseRepository;
		this.earningRepository = earningRepository;
        this.passwordEncoder = passwordEncoder;
    }

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (userRepository.findById(1).isEmpty()) {
			User user = new User();
			user.setEmail("user@example.com");
			user.setUsername("user");
			user.setPassword(passwordEncoder.encode("U$3r2024"));
			user.setExpenses(new ArrayList<>());
			user.setEarnings(new ArrayList<>());
			userRepository.save(user);

			Expense expense1 = new Expense();
			expense1.setTitle("new computer");
			expense1.setPrice(2500.99);
			expense1.setDate(new Date());
			expense1.setUser(user);
			expenseRepository.save(expense1);

			Expense expense2 = new Expense();
			expense2.setTitle("new car");
			expense2.setPrice(12000.0);
			expense2.setDate(new Date());
			expense2.setUser(user);
			expenseRepository.save(expense2);

			Earning earning1 = new Earning();
			earning1.setTitle("bitcoin");
			earning1.setAmount(5000.0);
			earning1.setDate(new Date());
			earning1.setUser(user);
			earningRepository.save(earning1);

			Earning earning2 = new Earning();
			earning2.setTitle("house sale");
			earning2.setAmount(28000.85);
			earning2.setDate(new Date());
			earning2.setUser(user);
			earningRepository.save(earning2);
		}
	}
}
