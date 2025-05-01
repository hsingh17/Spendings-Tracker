package com.spendingstracker.app.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.spendingstracker.app.controller.spending.SpendingsController;
import com.spendingstracker.app.dto.requests.GetSpendingsRequestFilters;
import com.spendingstracker.app.dto.response.SpendingPageResponse;
import com.spendingstracker.app.service.spending.SpendingCategoryService;
import com.spendingstracker.app.service.spending.SpendingService;

import org.hamcrest.Matchers;
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

        when(spendingService.getSpendings(any(GetSpendingsRequestFilters.class)))
                .thenReturn(response);

        mockMvc.perform(get("/v1/api/spendings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus", Matchers.is(200)));
        ;
    }

    @Test
    public void shouldThrowBadRequestForInvalidStartDate() throws Exception {
        mockMvc.perform(get("/v1/api/spendings?start-date=01/01/2000"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus", Matchers.is(400)));
        ;
    }

    @Test
    public void shouldThrowBadRequestForInvalidEndDate() throws Exception {
        mockMvc.perform(get("/v1/api/spendings?start-date=01/01/2000"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus", Matchers.is(400)));
        ;
    }

    @Test
    public void shouldThrowBadRequestForInvalidGranularity() throws Exception {
        mockMvc.perform(get("/v1/api/spendings?granularity=FOO"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus", Matchers.is(400)));
        ;
    }

    @Test
    public void shouldThrowBadRequestForInvalidGraphType() throws Exception {
        mockMvc.perform(get("/v1/api/spendings?graph-type=BAZ"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus", Matchers.is(400)));
        ;
    }

    @Test
    public void shouldThrowBadRequestForInvalidPage() throws Exception {
        mockMvc.perform(get("/v1/api/spendings?page=-1"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus", Matchers.is(400)));
        ;
    }

    @Test
    public void shouldThrowBadRequestForLimitTooSmall() throws Exception {
        mockMvc.perform(get("/v1/api/spendings?limit=0"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus", Matchers.is(400)));
        ;
    }

    @Test
    public void shouldThrowBadRequestForLimitTooLarge() throws Exception {
        mockMvc.perform(get("/v1/api/spendings?limit=1000"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus", Matchers.is(400)));
    }

    @Test
    public void shouldMatchRequestedPage() throws Exception {
        SpendingPageResponse response =
                new SpendingPageResponse(new PageImpl<>(Collections.emptyList()));

        when(spendingService.getSpendings(any(GetSpendingsRequestFilters.class)))
                .thenReturn(response);

        mockMvc.perform(get("/v1/api/spendings?page=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.metadata.currentPage", Matchers.is(1)));
    }
}
