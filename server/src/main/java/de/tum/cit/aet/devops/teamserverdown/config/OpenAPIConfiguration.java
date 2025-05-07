package de.tum.cit.aet.devops.teamserverdown.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfiguration {

  @Bean
  public OpenAPI openAPI() {
    return new OpenAPI()
        .info(
            new Info()
                .title("Team Server Down")
                .description("DevOps Application")
                .version("v0.0.1"))
        .externalDocs(
            new ExternalDocumentation()
                .description("README.md")
                .url("https://github.com/AET-DevOps25/team-server-down"));
  }
}
