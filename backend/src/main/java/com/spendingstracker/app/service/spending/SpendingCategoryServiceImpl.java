package com.spendingstracker.app.service.spending;

import com.spendingstracker.app.dto.response.SpendingCategoriesResponse;
import com.spendingstracker.app.projection.SpendingCategoryProjection;
import com.spendingstracker.app.proxy.aws.AwsS3ProxyService;
import com.spendingstracker.app.repository.SpendingCategoryRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class SpendingCategoryServiceImpl implements SpendingCategoryService {
    private final SpendingCategoryRepository spendingCategoryRepository;
    private final AwsS3ProxyService awsS3ProxyService;
    private final String categoriesSvgBucketName;

    public SpendingCategoryServiceImpl(
            SpendingCategoryRepository spendingCategoryRepository,
            AwsS3ProxyService awsS3ProxyService,
            @Value("${s3.categories-bucket-name}") String categoriesSvgBucketName) {
        this.spendingCategoryRepository = spendingCategoryRepository;
        this.awsS3ProxyService = awsS3ProxyService;
        this.categoriesSvgBucketName = categoriesSvgBucketName;
    }

    @Override
    public SpendingCategoriesResponse getSpendingCategories() {
        List<SpendingCategoryProjection> projList =
                spendingCategoryRepository.getActiveSpendingCategories();

        Map<String, String> categoryToS3SvgUrlMap = new HashMap<>();

        for (SpendingCategoryProjection proj : projList) {
            String presignedUrl =
                    awsS3ProxyService.createPresignedUrl(categoriesSvgBucketName, proj.getS3Key());

            categoryToS3SvgUrlMap.put(proj.getName(), presignedUrl);
        }

        return new SpendingCategoriesResponse(Collections.unmodifiableMap(categoryToS3SvgUrlMap));
    }
}
