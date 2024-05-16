package com.spendingstracker.app.response;

import lombok.Getter;
import lombok.Setter;

/**
 * Object used to store relevant metadata about the API response such as the current page number,
 * size of the page, total number of results that can be retrieved, total number of pages that can
 * be checked, and any API links.
 *
 * @see ApiLinks
 */
@Getter
@Setter
public class ApiMetadata {
    private int currentPage;
    private int pageSize;
    private long totalCount;
    private int totalPages;
    private ApiLinks links;

    public ApiMetadata(ApiMetadataBuilder apiMetadataBuilder) {
        this.currentPage = apiMetadataBuilder.currentPage;
        this.pageSize = apiMetadataBuilder.pageSize;
        this.totalCount = apiMetadataBuilder.totalCount;
        this.totalPages = apiMetadataBuilder.totalPages;
        this.links = apiMetadataBuilder.links;
    }

    public static class ApiMetadataBuilder {
        private int currentPage;
        private int pageSize;
        private long totalCount;
        private int totalPages;
        private ApiLinks links;

        public ApiMetadataBuilder() {}

        public ApiMetadataBuilder setCurrentPage(int currentPage) {
            this.currentPage = currentPage;
            return this;
        }

        public ApiMetadataBuilder setPageSize(int pageSize) {
            this.pageSize = pageSize;
            return this;
        }

        public ApiMetadataBuilder setTotalCount(long totalCount) {
            this.totalCount = totalCount;
            return this;
        }

        public ApiMetadataBuilder setTotalPages(int totalPages) {
            this.totalPages = totalPages;
            return this;
        }

        public ApiMetadataBuilder setLinks(ApiLinks links) {
            this.links = links;
            return this;
        }

        public ApiMetadata build() {
            return new ApiMetadata(this);
        }
    }
}
