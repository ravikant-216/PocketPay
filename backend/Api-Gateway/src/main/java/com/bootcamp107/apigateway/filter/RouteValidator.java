package com.bootcamp107.apigateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/api/v1/users",
            "/api/v1/auth",
            "/api/v1/businesses/business_categories",
            "/api/v1/businesses/countries"
    );

    public boolean isSecured(ServerHttpRequest request) {
        return openApiEndpoints.stream()
                .noneMatch(url -> request.getURI().getPath().contains(url));
    }
}
