package de.tum.cit.aet.devops.teamserverdown.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {
  private final JWTUtil jwtUtil = new JWTUtil();

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.substring(7);
      try {
        String userId = jwtUtil.validateToken(token);
        request.setAttribute("authenticatedUser", new AuthenticatedUser(userId));
      } catch (JWTVerificationException e) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Invalid JWT token");
        return;
      }
    } else {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.getWriter().write("Missing Authorization header");
      return;
    }

    filterChain.doFilter(request, response);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String path = request.getServletPath();
    return path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui");
  }
}
