package de.tum.cit.aet.devops.teamserverdown.controller;

import static org.springframework.http.ResponseEntity.ok;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Root", description = "Root endpoint")
public class RootController {

  @GetMapping("/")
  @Operation(summary = "Root endpoint", description = "Returns a simple Hello World message.")
  public ResponseEntity<String> root() {
    return ok("Hello World!");
  }
}
