package com.spendingstracker.app.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.spendingstracker.app.controller.spending.SpendingsController;
import com.spendingstracker.app.dto.requests.GetSpendingsRequestFilters;
import com.spendingstracker.app.dto.response.SpendingPageResponse;
import com.spendingstracker.app.service.spending.SpendingCategoryService;
import com.spendingstracker.app.service.spending.SpendingService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

@WebMvcTest(SpendingsController.class)
@AutoConfigureMockMvc(addFilters = false)
public class SpendingsControllerTest {
    @MockBean SpendingService spendingService;
    @MockBean SpendingCategoryService spendingCategoryService;
    @Autowired MockMvc mockMvc;

    @Test
    public void shouldRetrieveSpendingsWithNoFilters() throws Exception {
        SpendingPageResponse response =
                new SpendingPageResponse(new PageImpl<>(Collections.emptyList()));

        GetSpendingsRequestFilters filters =
                new GetSpendingsRequestFilters(null, null, null, null, null, null);
        when(spendingService.getSpendings(filters)).thenReturn(response);

        mockMvc.perform(get("/v1/api/spendings")).andExpect(status().isOk());
    }
}
