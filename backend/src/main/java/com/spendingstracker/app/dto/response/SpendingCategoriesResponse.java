package com.spendingstracker.app.dto.response;


import java.util.Map;

/**
 * Object for storing response for the categoryToS3UrlMap endpoint
 *
 * @param categoryToS3UrlMap <code>Map</code> containing the name of the category to its SVG URL in
 *     S3
 */
public record SpendingCategoriesResponse(Map<String, String> categoryToS3UrlMap) {}
