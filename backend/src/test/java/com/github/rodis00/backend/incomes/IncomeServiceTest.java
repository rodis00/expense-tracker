package com.github.rodis00.backend.earning;

import com.github.rodis00.backend.exception.EarningNotFoundException;
import com.github.rodis00.backend.page.GlobalPage;
import com.github.rodis00.backend.user.User;
import com.github.rodis00.backend.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class EarningServiceTest {

    @Mock
    private EarningRepository earningRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private EarningService earningService;

    private User user;

    private Earning earning;

    private GlobalPage page;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("test");
        user.setPassword("test123");
        user.setEmail("test@test.com");
        user.setEarnings(null);
        user.setExpenses(null);

        earning = new Earning();
        earning.setId(1);
        earning.setUser(user);
        earning.setAmount(100.0);
        earning.setTitle("earning");
        earning.setDate(LocalDateTime.of(2024, 5, 24, 14, 54));

        page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortBy("date");
        page.setSortDirection(Sort.Direction.DESC);
    }

    @Test
    void shouldSaveEarning() {
        when(userService.getUserById(1)).thenReturn(user);
        when(earningRepository.save(earning)).thenReturn(earning);

        Earning savedEarning = earningService.saveEarning(earning, 1);

        assertNotNull(savedEarning);
        assertEquals(earning.getId(), savedEarning.getId());
        assertEquals(earning.getTitle(), savedEarning.getTitle());
        assertEquals(earning.getAmount(), savedEarning.getAmount());
        assertEquals(earning.getDate(), savedEarning.getDate());
        assertEquals(earning.getUser(), savedEarning.getUser());

        verify(earningRepository, times(1)).save(earning);
    }

    @Test
    void shouldGetEarningById() {
        when(earningRepository.findById(1)).thenReturn(Optional.of(earning));

        Earning existingEarning = earningService.getEarningById(1);

        assertNotNull(existingEarning);
        assertEquals(earning.getId(), existingEarning.getId());
        assertEquals(earning.getTitle(), existingEarning.getTitle());

        verify(earningRepository, times(1)).findById(1);
    }

    @Test
    void shouldThrowExceptionIfEarningNotFound() {
        when(earningRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(EarningNotFoundException.class, () -> {
            earningService.getEarningById(1);
        });

        verify(earningRepository, times(1)).findById(1);
    }

    @Test
    void shouldUpdateEarning() {
        LocalDateTime newDate = LocalDateTime.of(2024, 6, 12, 12, 23);
        String newTitle = "newTitle";
        double newAmount = 200.0;

        Earning updatedEarning = new Earning();
        updatedEarning.setId(1);
        updatedEarning.setTitle(newTitle);
        updatedEarning.setAmount(newAmount);
        updatedEarning.setDate(newDate);
        updatedEarning.setUser(user);

        when(earningRepository.findById(1)).thenReturn(Optional.of(earning));
        when(earningRepository.save(updatedEarning)).thenReturn(updatedEarning);

        Earning earning = earningService.updateEarning(1, updatedEarning);

        assertNotNull(earning);
        assertEquals(earning.getId(), updatedEarning.getId());
        assertEquals(newTitle, earning.getTitle());
        assertEquals(newAmount, earning.getAmount());
        assertEquals(newDate, earning.getDate());
        assertEquals(earning.getUser(), updatedEarning.getUser());

        verify(earningRepository, times(1)).findById(1);
        verify(earningRepository, times(1)).save(earning);
    }

    @Test
    void shouldReturnAllEarnings() {
        List<Earning> expectedEarnings = List.of(earning);

        when(earningRepository.findAll()).thenReturn(expectedEarnings);

        List<Earning> earnings = earningService.getAllEarnings();

        assertNotNull(earnings);
        assertEquals(1, earnings.size());
        assertEquals(expectedEarnings, earnings);

        verify(earningRepository, times(1)).findAll();
    }

    @Test
    void shouldReturnAllUserEarnings() {
        List<Earning> expectedEarnings = List.of(earning);

        when(userService.getUserById(1)).thenReturn(user);
        when(earningRepository.findAllByUserId(1)).thenReturn(expectedEarnings);

        List<Earning> userEarnings = earningService.getAllUserEarnings(1);

        assertNotNull(userEarnings);
        assertEquals(1, userEarnings.size());

        verify(userService, times(1)).getUserById(1);
        verify(earningRepository, times(1)).findAllByUserId(1);
    }

    @Test
    void shouldDeleteEarningById() {
        when(earningRepository.findById(1)).thenReturn(Optional.of(earning));
        doNothing()
                .when(earningRepository)
                .delete(earning);

        earningService.deleteEarningById(1);

        verify(earningRepository, times(1)).findById(1);
        verify(earningRepository, times(1)).delete(earning);
    }

    @Test
    void shouldReturnAllEarningsByUserId() {
        Earning earning1 = new Earning();
        earning1.setId(1);
        earning1.setTitle("earning 1");
        earning1.setDate(LocalDateTime.of(2024, 5, 4, 12, 12));
        earning1.setAmount(100.0);
        earning1.setUser(user);

        Earning earning2 = new Earning();
        earning2.setId(2);
        earning2.setTitle("earning 2");
        earning2.setDate(LocalDateTime.of(2023, 6, 12, 9, 45));
        earning2.setAmount(200.0);
        earning2.setUser(user);

        Page<Earning> earningPage = new PageImpl<>(List.of(earning1, earning2));

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());

        Pageable pageable = PageRequest.of(
                page.getPageNumber(),
                page.getPageSize(),
                sort
        );

        when(userService.getUserById(1)).thenReturn(user);
        when(earningRepository
                .findAllEarningsByUserIdAndYear(1, null, pageable)).thenReturn(earningPage);

        Page<Earning> userEarningsPage = earningService.findAllEarningsByUserId(1, page, null);

        assertNotNull(userEarningsPage);
        assertEquals(2, userEarningsPage.getTotalElements());


        verify(userService, times(1)).getUserById(1);
        verify(earningRepository, times(1))
                .findAllEarningsByUserIdAndYear(1, null, pageable);
    }

    @Test
    void shouldReturnUserEarningsPageWithSpecificYear() {
        Earning earning1 = new Earning();
        earning1.setId(1);
        earning1.setTitle("earning 1");
        earning1.setDate(LocalDateTime.of(2024, 5, 4, 12, 12));
        earning1.setAmount(100.0);
        earning1.setUser(user);

        int year = 2024;

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());

        Pageable pageable = PageRequest.of(
                page.getPageNumber(),
                page.getPageSize(),
                sort
        );

        Page<Earning> earningPage = new PageImpl<>(List.of(earning1));

        when(userService.getUserById(1)).thenReturn(user);
        when(earningRepository.findAllEarningsByUserIdAndYear(1, year, pageable)).thenReturn(earningPage);

        Page<Earning> filteredEarnings = earningService.findAllEarningsByUserId(1, page, year);

        assertNotNull(filteredEarnings);
        assertEquals(1, filteredEarnings.getTotalElements());
        assertEquals(year, filteredEarnings.getContent().get(0).getDate().getYear());

        verify(userService, times(1)).getUserById(1);
        verify(earningRepository, times(1))
                .findAllEarningsByUserIdAndYear(1, year, pageable);
    }

    @Test
    void shouldReturnUserEarningsPageWithSpecificYearAndSortDirectionDESC() {
        Earning earning1 = new Earning();
        earning1.setId(1);
        earning1.setTitle("earning 1");
        earning1.setDate(LocalDateTime.of(2024, 6, 4, 12, 12));
        earning1.setAmount(100.0);
        earning1.setUser(user);

        Earning earning2 = new Earning();
        earning2.setId(2);
        earning2.setTitle("earning 2");
        earning2.setDate(LocalDateTime.of(2024, 5, 12, 9, 45));
        earning2.setAmount(200.0);
        earning2.setUser(user);

        int year = 2024;

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortBy("date");
        page.setSortDirection(Sort.Direction.DESC);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());

        Pageable pageable = PageRequest.of(
                page.getPageNumber(),
                page.getPageSize(),
                sort
        );

        Page<Earning> earningPage = new PageImpl<>(List.of(earning1, earning2));

        when(userService.getUserById(1)).thenReturn(user);
        when(earningRepository.findAllEarningsByUserIdAndYear(1, year, pageable)).thenReturn(earningPage);

        Page<Earning> filteredEarnings = earningService.findAllEarningsByUserId(1, page, year);

        assertNotNull(filteredEarnings);
        assertEquals(Sort.Direction.DESC, page.getSortDirection());
        assertEquals(2, filteredEarnings.getTotalElements());
        assertEquals(year, filteredEarnings.getContent().get(0).getDate().getYear());
        assertEquals(earning1.getTitle(), filteredEarnings.getContent().get(0).getTitle());
        assertTrue(filteredEarnings.getContent().get(0).getDate().isAfter(filteredEarnings.getContent().get(1).getDate()));

        verify(userService, times(1)).getUserById(1);
        verify(earningRepository, times(1))
                .findAllEarningsByUserIdAndYear(1, year, pageable);
    }

    @Test
    void shouldReturnUserEarningsPageWithSpecificYearAndSortDirectionASC() {
        Earning earning1 = new Earning();
        earning1.setId(1);
        earning1.setTitle("earning 1");
        earning1.setDate(LocalDateTime.of(2024, 6, 4, 12, 12));
        earning1.setAmount(100.0);
        earning1.setUser(user);

        Earning earning2 = new Earning();
        earning2.setId(2);
        earning2.setTitle("earning 2");
        earning2.setDate(LocalDateTime.of(2024, 5, 12, 9, 45));
        earning2.setAmount(200.0);
        earning2.setUser(user);

        int year = 2024;

        GlobalPage page = new GlobalPage();
        page.setPageNumber(0);
        page.setPageSize(5);
        page.setSortBy("date");
        page.setSortDirection(Sort.Direction.ASC);

        Sort sort = Sort.by(page.getSortDirection(), page.getSortBy());

        Pageable pageable = PageRequest.of(
                page.getPageNumber(),
                page.getPageSize(),
                sort
        );

        Page<Earning> earningPage = new PageImpl<>(List.of(earning2, earning1));

        when(userService.getUserById(1)).thenReturn(user);
        when(earningRepository.findAllEarningsByUserIdAndYear(1, year, pageable)).thenReturn(earningPage);

        Page<Earning> filteredEarnings = earningService.findAllEarningsByUserId(1, page, year);

        assertNotNull(filteredEarnings);
        assertEquals(Sort.Direction.ASC, page.getSortDirection());
        assertEquals(2, filteredEarnings.getTotalElements());
        assertEquals(year, filteredEarnings.getContent().get(0).getDate().getYear());
        assertEquals(earning2.getTitle(), filteredEarnings.getContent().get(0).getTitle());
        assertTrue(filteredEarnings.getContent().get(0).getDate().isBefore(filteredEarnings.getContent().get(1).getDate()));

        verify(userService, times(1)).getUserById(1);
        verify(earningRepository, times(1))
                .findAllEarningsByUserIdAndYear(1, year, pageable);
    }
}