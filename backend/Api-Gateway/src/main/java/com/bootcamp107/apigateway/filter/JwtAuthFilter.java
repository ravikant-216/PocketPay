package com.bootcamp107.apigateway.filter;

import com.bootcamp107.apigateway.exception.AccessDeniedException;
import com.bootcamp107.apigateway.payload.TokenDTO;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.netflix.eureka.EurekaDiscoveryClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {

    @Autowired
    private RouteValidator routeValidator;
    @Autowired
    private RestTemplate template;
    @Autowired
    private EurekaDiscoveryClient discoveryClient;

    public JwtAuthFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            final ServerHttpRequest request = exchange.getRequest();
            if (routeValidator.isSecured(request)) {
                log.info("Needs Authentication for the request");
                if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new AccessDeniedException("Missing authorization header");
                }
                final String authHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                final String jwt;
                if (StringUtils.isNotBlank(authHeader) && authHeader.startsWith("Bearer ")) {
                    jwt = authHeader.substring(7);
                } else {
                    throw new AccessDeniedException("Authorization header is not valid");
                }
                try {
                    log.info("POST - api/v1/auth/validateToken: Token validation");
                    template.postForObject(
                            getUserServiceUrl() + "/api/v1/auth/validateToken",
                            new TokenDTO(jwt),
                            Object.class
                    );
                    log.info("Token is valid");
                    return chain.filter(exchange);
                } catch(Exception e) {
                    throw new AccessDeniedException("Token is invalid");
                }
            }
            return chain.filter(exchange);
        };
    }

    public String getUserServiceUrl() {
        return discoveryClient.getInstances("user-service")
                .stream()
                .findFirst()
                .map(serviceInstance -> serviceInstance.getUri().toString())
                .orElseThrow(() -> new RuntimeException("User service not available"));
    }

    public static class Config {

    }
}
