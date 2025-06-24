package de.tum.cit.aet.devops.teamserverdown.config;

import de.tum.cit.aet.devops.teamserverdown.security.CurrentUser;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.security.*;
import io.swagger.v3.oas.models.servers.Server;
import java.util.*;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;

@Configuration
public class OpenAPIConfiguration {

  @Bean
  public OpenAPI openAPI() {
    final String securitySchemeName = "keycloak";

    Scopes scopes = new Scopes();

    SecurityScheme securityScheme =
        new SecurityScheme()
            .type(SecurityScheme.Type.OAUTH2)
            .description("Keycloak OAuth2 login")
            .flows(
                new OAuthFlows()
                    .authorizationCode(
                        new OAuthFlow()
                            .authorizationUrl(
                                System.getenv("IDP_EXTERNAL_URI") + "/protocol/openid-connect/auth")
                            .tokenUrl(
                                System.getenv("IDP_EXTERNAL_URI")
                                    + "/protocol/openid-connect/token")
                            .scopes(scopes)));

    return new OpenAPI()
        .info(
            new Info()
                .title("Team Server Down")
                .description("DevOps Application")
                .version("v0.0.1"))
        .servers(List.of(new Server().url(System.getenv("SERVER_URL"))))
        .externalDocs(
            new ExternalDocumentation()
                .description("README.md")
                .url("https://github.com/AET-DevOps25/team-server-down"))
        .components(new Components().addSecuritySchemes(securitySchemeName, securityScheme))
        .addSecurityItem(new SecurityRequirement().addList(securitySchemeName));
  }

  @Bean
  public OperationCustomizer hideCurrentUser() {
    return (operation, handlerMethod) -> {
      if (operation.getParameters() == null) {
        return operation;
      }

      MethodParameter[] methodParameters = handlerMethod.getMethodParameters();
      List<Parameter> openApiParams = operation.getParameters();

      Iterator<Parameter> paramIterator = openApiParams.iterator();
      while (paramIterator.hasNext()) {
        Parameter openApiParam = paramIterator.next();

        for (MethodParameter methodParam : methodParameters) {
          if (methodParam.hasParameterAnnotation(CurrentUser.class)) {
            Class<?> paramType = methodParam.getParameterType();

            String paramTypeName = paramType.getSimpleName();

            if (openApiParam.getName().equalsIgnoreCase(paramTypeName)
                || (openApiParam.getSchema() != null
                    && paramTypeName.equalsIgnoreCase(openApiParam.getSchema().getType()))) {
              paramIterator.remove();
              break;
            }

            if (openApiParam.getSchema() != null
                && openApiParam.getSchema().get$ref() != null
                && openApiParam.getSchema().get$ref().contains(paramType.getSimpleName())) {
              paramIterator.remove();
              break;
            }
          }
        }
      }
      return operation;
    };
  }
}
