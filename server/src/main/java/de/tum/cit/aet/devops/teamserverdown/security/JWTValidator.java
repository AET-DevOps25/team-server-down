package de.tum.cit.aet.devops.teamserverdown.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.math.BigInteger;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;

public class JWTValidator {
  private static final String JWKS_URL =
          System.getenv("IDP_URI") + "/protocol/openid-connect/certs";

  public DecodedJWT validateToken(String token) throws JWTVerificationException {
    DecodedJWT decoded = JWT.decode(token);
    String kid = decoded.getKeyId();

    try {
      JsonNode jwk = fetchJWKByKid(kid);
      RSAPublicKey publicKey = buildPublicKey(jwk);

      Algorithm algorithm = Algorithm.RSA256(publicKey, null);
      JWTVerifier verifier = JWT.require(algorithm).build();
      return verifier.verify(token);
    } catch (Exception e) {
      throw new JWTVerificationException("Invalid token", e);
    }
  }

  private JsonNode fetchJWKByKid(String kid) throws Exception {
    ObjectMapper mapper = new ObjectMapper();

    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder().uri(URI.create(JWKS_URL)).GET().build();

    HttpResponse<InputStream> response =
        client.send(request, HttpResponse.BodyHandlers.ofInputStream());

    JsonNode jwks = mapper.readTree(response.body()).get("keys");
    for (JsonNode key : jwks) {
      if (key.get("kid").asText().equals(kid)) {
        return key;
      }
    }
    throw new IllegalArgumentException("Public key not found for kid: " + kid);
  }

  private RSAPublicKey buildPublicKey(JsonNode jwk) throws Exception {
    String nStr = jwk.get("n").asText();
    String eStr = jwk.get("e").asText();

    BigInteger modulus = new BigInteger(1, Base64.getUrlDecoder().decode(nStr));
    BigInteger exponent = new BigInteger(1, Base64.getUrlDecoder().decode(eStr));

    RSAPublicKeySpec keySpec = new RSAPublicKeySpec(modulus, exponent);
    return (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(keySpec);
  }
}
