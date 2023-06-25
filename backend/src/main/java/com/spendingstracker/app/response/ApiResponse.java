package com.spendingstracker.app.response;

import org.springframework.http.HttpStatus;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ApiResponse<T> {
    private ApiMetadata metadata;
    private ZonedDateTime timestamp = ZonedDateTime.now(ZoneId.of("Z"));
    private boolean ok;
    private String message;
    private HttpStatus httpStatus;
    private T data;

    public ApiResponse(ApiResponseBuilder<T> apiResponseBuilder) {
        this.metadata = apiResponseBuilder.metadata;;
        this.ok = apiResponseBuilder.ok;
        this.message = apiResponseBuilder.message;
        this.httpStatus = apiResponseBuilder.httpStatus;
        this.data = apiResponseBuilder.data;
    }

    public ApiMetadata getMetadata() {
        return metadata;
    }

    public void setMetadata(ApiMetadata metadata) {
        this.metadata = metadata;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public static class ApiResponseBuilder<T> {
        private ApiMetadata metadata;
        private ZonedDateTime timestamp;
        private boolean ok;
        private String message;
        private HttpStatus httpStatus;
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

        public ApiResponseBuilder<T> setHttpStatus(HttpStatus httpStatus) {
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
