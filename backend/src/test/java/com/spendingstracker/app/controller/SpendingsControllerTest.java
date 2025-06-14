package com.spendingstracker.app.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.controller.spending.SpendingsController;
import com.spendingstracker.app.dto.requests.GetSpendingsRequestFilters;
import com.spendingstracker.app.dto.requests.SpendingRequest;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.SpendingCategoriesResponse;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
import com.spendingstracker.app.dto.response.SpendingPageResponse;
import com.spendingstracker.app.dto.response.SpendingResponse;
import com.spendingstracker.app.service.spending.SpendingCategoryService;
import com.spendingstracker.app.service.spending.SpendingService;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@WebMvcTest(SpendingsController.class)
@AutoConfigureMockMvc(addFilters = false)
public class SpendingsControllerTest {
    @MockBean SpendingService spendingService;
    @MockBean SpendingCategoryService spendingCategoryService;
    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

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

    @Test
    public void shouldReturnSpendingDetails() throws Exception {
        LocalDate date = LocalDate.now();
        List<SpendingResponse> spendings =
                List.of(
                        new SpendingResponse(BigInteger.ONE, "foo", BigDecimal.ZERO, "bar"),
                        new SpendingResponse(BigInteger.ONE, "foo", BigDecimal.ZERO, "bar"),
                        new SpendingResponse(BigInteger.ONE, "foo", BigDecimal.ZERO, "bar"));
        SpendingDetailsResponse response = new SpendingDetailsResponse(spendings);

        when(spendingService.getSpendingDetails(date)).thenReturn(response);

        mockMvc.perform(get("/v1/api/spendings/" + date)).andExpect(status().isOk());
    }

    @Test
    public void shouldReturnBadRequestForInvalidDateFormatSpendingDetails() throws Exception {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        String dateStr = LocalDate.now().format(dtf);
        List<SpendingResponse> spendings =
                List.of(
                        new SpendingResponse(BigInteger.ONE, "foo", BigDecimal.ZERO, "bar"),
                        new SpendingResponse(BigInteger.ONE, "foo", BigDecimal.ZERO, "bar"),
                        new SpendingResponse(BigInteger.ONE, "foo", BigDecimal.ZERO, "bar"));
        SpendingDetailsResponse response = new SpendingDetailsResponse(spendings);

        when(spendingService.getSpendingDetails(any())).thenReturn(response);

        mockMvc.perform(get("/v1/api/spendings/" + dateStr))
                .andExpect(status().isInternalServerError());
    }

    @Test
    public void shouldCreateSpending() throws Exception {
        int N = 20;
        List<SpendingRequest> l = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            l.add(
                    new SpendingRequest(
                            BigInteger.ONE,
                            SpendingCategoryEnum.OTHER,
                            BigDecimal.TEN,
                            null,
                            false));
        }

        SpendingsSaveRequest request = new SpendingsSaveRequest(l);

        LocalDate date = LocalDate.now();
        doNothing()
                .when(spendingService)
                .createSpending(any(SpendingsSaveRequest.class), any(LocalDate.class));

        mockMvc.perform(
                        post("/v1/api/spendings/" + date)
                                .contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding(StandardCharsets.UTF_8)
                                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldThrowBadRequestEnumWhenCreatingSpending() throws Exception {
        String content =
                "{\"spendingRequests\": [{\"spendingId\": 1, \"category\": \"foo\", \"amount\": 1, \"delete\": false}]}";
        LocalDate date = LocalDate.now();

        doNothing()
                .when(spendingService)
                .createSpending(any(SpendingsSaveRequest.class), any(LocalDate.class));

        mockMvc.perform(
                        post("/v1/api/spendings/" + date)
                                .contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding(StandardCharsets.UTF_8)
                                .content(content))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void shouldThrowBadRequestNullBodyWhenCreatingSpending() throws Exception {
        LocalDate date = LocalDate.now();
        mockMvc.perform(post("/v1/api/spendings/" + date)).andExpect(status().isBadRequest());
    }

    @Test
    public void shouldDeleteOk() throws Exception {
        mockMvc.perform(delete("/v1/api/spendings/" + BigDecimal.ONE)).andExpect(status().isOk());
    }

    @Test
    public void shouldGetSpendingCategories() throws Exception {
        SpendingCategoriesResponse response =
                new SpendingCategoriesResponse(Collections.emptyMap());

        when(spendingCategoryService.getSpendingCategories()).thenReturn(response);

        mockMvc.perform(get("/v1/api/spending-categories")).andExpect(status().isOk());
    }
}
