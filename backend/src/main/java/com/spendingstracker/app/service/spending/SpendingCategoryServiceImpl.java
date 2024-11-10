package com.spendingstracker.app.service.spending;

import com.spendingstracker.app.cache.SpendingCategoryJpaCache;
import com.spendingstracker.app.dto.response.SpendingCategoriesResponse;
import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.proxy.aws.AwsS3ProxyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class SpendingCategoryServiceImpl implements SpendingCategoryService {
    private final SpendingCategoryJpaCache spendingCategoryJpaCache;
    private final AwsS3ProxyService awsS3ProxyService;
    private final String categoriesSvgBucketName;

    public SpendingCategoryServiceImpl(
            SpendingCategoryJpaCache spendingCategoryJpaCache,
            AwsS3ProxyService awsS3ProxyService,
            @Value("${s3.categories-bucket-name}") String categoriesSvgBucketName) {
        this.spendingCategoryJpaCache = spendingCategoryJpaCache;
        this.awsS3ProxyService = awsS3ProxyService;
        this.categoriesSvgBucketName = categoriesSvgBucketName;
    }

    @Override
    public SpendingCategoriesResponse getSpendingCategories() {
        Collection<SpendingCategory> activeSpendingCategories =
                spendingCategoryJpaCache.getActiveSpendingCategories();

        Map<String, String> categoryToS3SvgUrlMap = new HashMap<>();

        for (SpendingCategory spendingCategory : activeSpendingCategories) {
            String presignedUrl =
                    awsS3ProxyService.createPresignedUrl(
                            categoriesSvgBucketName, spendingCategory.getS3Key());

            categoryToS3SvgUrlMap.put(spendingCategory.getName().getStringDecode(), presignedUrl);
        }

        return new SpendingCategoriesResponse(Collections.unmodifiableMap(categoryToS3SvgUrlMap));
    }
}
