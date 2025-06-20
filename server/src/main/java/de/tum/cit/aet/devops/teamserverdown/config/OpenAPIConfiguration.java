package de.tum.cit.aet.devops.teamserverdown.config;

import de.tum.cit.aet.devops.teamserverdown.security.CurrentUser;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.parameters.Parameter;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.web.method.HandlerMethod;
import java.util.Iterator;
import java.util.List;

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

  @Bean
  public OperationCustomizer hideCurrentUser() {
    return (Operation operation, HandlerMethod handlerMethod) -> {
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
            String methodParamName = methodParam.getParameterName();
            if (methodParamName == null || openApiParam.getName().equals(methodParamName)) {
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
