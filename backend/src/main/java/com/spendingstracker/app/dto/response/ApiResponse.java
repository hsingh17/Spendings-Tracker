package com.spendingstracker.app.dto.response;

import lombok.Getter;
import lombok.Setter;

import org.springframework.http.HttpStatus;

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

    /**
     * Build an <code>OK</code> <code>ApiResponse</code> object from <code>data</code> and <code>
     * message</code>.
     *
     * @param data generic data object
     * @param message message to return to the frontend
     * @return <code>{@literal ApiResponse<T>}</code> object contain
     * @see ApiResponse
     */
    public static <T> ApiResponse<T> okResponse(T data, ApiMetadata metadata, String message) {
        return new ApiResponse.ApiResponseBuilder<T>()
                .setData(data)
                .setOk(true)
                .setMessage(message)
                .setMetadata(metadata)
                .setHttpStatus(HttpStatus.OK.value())
                .build();
    }
}
