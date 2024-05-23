package com.github.rodis00.backend;

import com.github.rodis00.backend.earning.Earning;
import com.github.rodis00.backend.earning.EarningRepository;
import com.github.rodis00.backend.expense.Expense;
import com.github.rodis00.backend.expense.ExpenseRepository;
import com.github.rodis00.backend.user.User;
import com.github.rodis00.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;
    private final EarningRepository earningRepository;
    private final PasswordEncoder passwordEncoder;

    public BackendApplication(
            UserRepository userRepository,
            ExpenseRepository expenseRepository,
            EarningRepository earningRepository,
            PasswordEncoder passwordEncoder
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
        if (userRepository
                .findById(1)
                .isEmpty()) {
            User user = new User();
            user.setEmail("user@example.com");
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("User@2024"));
            user.setExpenses(new ArrayList<>());
            user.setEarnings(new ArrayList<>());
            userRepository.save(user);

            List<Expense> expenses = new ArrayList<>();
            List<Earning> earnings = new ArrayList<>();

            int year = 2021;
            for (int y = 0; y < 5; y++) {
                for (int m = 0; m < 12; m++) {
                    for (int d = 0; d < 2; d++) {
                        Expense expense = new Expense();
                        expense.setTitle("new expense - " + d);
                        expense.setPrice(getPrice());
                        expense.setDate(getDate(year, m + 1));
                        expense.setUser(user);
                        expenses.add(expense);

                        Earning earning = new Earning();
                        earning.setTitle("new earning - " + d);
                        earning.setAmount(getPrice());
                        earning.setDate(getDate(year, m + 1));
                        earning.setUser(user);
                        earnings.add(earning);
                    }
                }
                year++;
            }

            earningRepository.saveAll(earnings);
            expenseRepository.saveAll(expenses);
        }
    }

    public LocalDateTime getDate(
            int year,
            int month
    ) {
        Random random = new Random();
        return LocalDateTime.of(
                year,
                month,
                random.nextInt(28) + 1,
                random.nextInt(24),
                random.nextInt(60),
                random.nextInt(60),
                random.nextInt(999999999)
        );
    }

    public double getPrice() {
        double price = new Random().nextDouble(2500) + 1;
        return BigDecimal
                .valueOf(price)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
