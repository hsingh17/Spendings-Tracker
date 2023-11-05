package com.spendingstracker.app.response;

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

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public ApiLinks getLinks() {
        return links;
    }

    public void setLinks(ApiLinks links) {
        this.links = links;
    }

    public static class ApiMetadataBuilder {
        private int currentPage;
        private int pageSize;
        private long totalCount;
        private int totalPages;
        private ApiLinks links;

        public ApiMetadataBuilder() {
        }

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
