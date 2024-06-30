package com.spendingstracker.app.service.spending;

import com.spendingstracker.app.dto.response.SpendingCategoriesResponse;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface SpendingCategoryService {
    /**
     * Returns all active spending categories and their S3 SVG URL
     *
     * @return
     */
    @Transactional(readOnly = true)
    SpendingCategoriesResponse getSpendingCategories();
}
