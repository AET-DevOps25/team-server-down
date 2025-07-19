package de.tum.cit.aet.devops.teamserverdown.config;

import io.micrometer.observation.ObservationPredicate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.observation.ServerRequestObservationContext;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

import java.util.List;

@Configuration
public class ObservabilityConfig {

    @Bean
    public ObservationPredicate skipPaths() {
        PathMatcher pathMatcher = new AntPathMatcher();
        List<String> excludedPaths = List.of(
                "/api/actuator/**",
                "/swagger-ui/**",
                "/v3/api-docs/**"
                );

        return (name, context) -> {
            if (context instanceof ServerRequestObservationContext srContext) {
                String uri = srContext.getCarrier().getRequestURI();
                return excludedPaths.stream()
                        .noneMatch(pattern -> pathMatcher.match(pattern, uri));
            }
            return true;
        };
    }
}
