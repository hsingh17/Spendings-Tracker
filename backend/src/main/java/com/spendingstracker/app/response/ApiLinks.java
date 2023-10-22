package com.spendingstracker.app.response;

import java.util.Optional;

public class ApiLinks {
    private String first;
    private String prev;
    private String self;
    private String next;
    private String last;

    public ApiLinks(ApiLinksBuilder apiLinksBuilder) {
        this.first = apiLinksBuilder.first;
        this.prev = apiLinksBuilder.prev;
        this.self = apiLinksBuilder.self;
        this.next = apiLinksBuilder.next;
        this.last = apiLinksBuilder.last;
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getPrev() {
        return prev;
    }

    public void setPrev(String prev) {
        this.prev = prev;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(String self) {
        this.self = self;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }

    public static class ApiLinksBuilder {
        private String first;
        private String prev;
        private String self;
        private String next;
        private String last;

        public ApiLinksBuilder(String requestUri, String queryString, int curPage, int lastPage) {
            String pageQueryParam = "page=";
            queryString = Optional.ofNullable(queryString).orElse(pageQueryParam + curPage);
            StringBuilder currentUri = new StringBuilder(requestUri + "?" + queryString);
            int start = currentUri.indexOf(pageQueryParam);

            if (start == -1) { // No page parameter was passed in
                currentUri.append("&").append(pageQueryParam).append(curPage);
                start = currentUri.indexOf(pageQueryParam);
            }

            int end = currentUri.indexOf("&", start);
            end = (end == -1) ? currentUri.length() : end;

            this.self = currentUri.toString();
            this.first = (curPage > 0) ? new StringBuilder(currentUri).replace(start, end, pageQueryParam + "0").toString() : null;
            this.prev = (curPage > 0) ? new StringBuilder(currentUri).replace(start, end, pageQueryParam + (curPage -1)).toString() : null;
            this.next = (curPage < lastPage) ? new StringBuilder(currentUri).replace(start, end, pageQueryParam + (curPage + 1)).toString() : null;
            this.last = (curPage < lastPage) ? new StringBuilder(currentUri).replace(start, end, pageQueryParam + lastPage).toString() : null;
        }

        public ApiLinks build() {
            return new ApiLinks(this);
        }
    }
}
