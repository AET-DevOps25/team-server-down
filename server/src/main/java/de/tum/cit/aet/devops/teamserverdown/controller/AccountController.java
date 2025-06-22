package de.tum.cit.aet.devops.teamserverdown.controller;

import de.tum.cit.aet.devops.teamserverdown.model.User;
//import de.tum.cit.aet.devops.teamserverdown.security.CurrentUser;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Account", description = "User Accounts")
public class AccountController {
  @GetMapping("/me")
  public String getCurrentUser() {
    return "user.getUsername()";
  }
}
