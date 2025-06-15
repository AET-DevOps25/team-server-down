FROM quay.io/keycloak/keycloak:24.0.1 AS development

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

WORKDIR /opt/keycloak

FROM quay.io/keycloak/keycloak:24.0.1

COPY --from=development /opt/keycloak/ /opt/keycloak/

COPY ./realm-export.json /opt/keycloak/data/import/realm-export.json

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev", "--db=postgres", "--import-realm", "-Dkeycloak.migration.strategy=OVERWRITE_EXISTING", "--transaction-xa-enabled=false"]