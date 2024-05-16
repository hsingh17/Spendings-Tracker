package com.spendingstracker.app.response;

import lombok.Getter;
import lombok.Setter;

import java.time.ZoneId;
import java.time.ZonedDateTime;

/**
 * Generic API response object.
 *
 * @param <T> type of the <code>data</code> field
 */
@Getter
@Setter
public class ApiResponse<T> {
    private ApiMetadata metadata;
    private ZonedDateTime timestamp = ZonedDateTime.now(ZoneId.of("Z"));
    private boolean ok;
    private String message;
    private Integer httpStatus;
    private T data;

    public ApiResponse(ApiResponseBuilder<T> apiResponseBuilder) {
        this.metadata = apiResponseBuilder.metadata;
        this.ok = apiResponseBuilder.ok;
        this.message = apiResponseBuilder.message;
        this.httpStatus = apiResponseBuilder.httpStatus;
        this.data = apiResponseBuilder.data;
    }

    public ZonedDateTime getTimestamp() {
        return ZonedDateTime.now(ZoneId.of("Z"));
    }

    public static class ApiResponseBuilder<T> {
        private ApiMetadata metadata;
        private boolean ok;
        private String message;
        private Integer httpStatus;
        private T data;

        public ApiResponseBuilder() {}

        public ApiResponseBuilder<T> setMetadata(ApiMetadata metadata) {
            this.metadata = metadata;
            return this;
        }

        public ApiResponseBuilder<T> setOk(boolean ok) {
            this.ok = ok;
            return this;
        }

        public ApiResponseBuilder<T> setMessage(String message) {
            this.message = message;
            return this;
        }

        public ApiResponseBuilder<T> setHttpStatus(Integer httpStatus) {
            this.httpStatus = httpStatus;
            return this;
        }

        public ApiResponseBuilder<T> setData(T data) {
            this.data = data;
            return this;
        }

        public ApiResponse<T> build() {
            return new ApiResponse<>(this);
        }
    }
}
