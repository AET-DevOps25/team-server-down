//package de.tum.cit.aet.devops.teamserverdown.config;
//
//import de.tum.cit.aet.devops.teamserverdown.security.CurrentUserArgumentResolver;
//import java.util.List;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.method.support.HandlerMethodArgumentResolver;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfiguration implements WebMvcConfigurer {
//  private final CurrentUserArgumentResolver currentUserArgumentResolver;
//
//  public WebConfiguration(CurrentUserArgumentResolver currentUserArgumentResolver) {
//    this.currentUserArgumentResolver = currentUserArgumentResolver;
//  }
//
//  @Override
//  public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
//    resolvers.add(currentUserArgumentResolver);
//  }
//}
