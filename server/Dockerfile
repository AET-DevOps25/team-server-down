FROM gradle:8.13.0-jdk21 AS development

WORKDIR /app

COPY build.gradle build.gradle
RUN gradle dependencies

COPY src/ src/

EXPOSE 8080
EXPOSE 5005

CMD ["gradle", "bootRun", "--no-daemon", "--continuous"]

FROM gradle:8.13.0-jdk21 AS builder

WORKDIR /app

COPY build.gradle build.gradle
RUN gradle dependencies

COPY src/ src/
RUN gradle bootJar --no-daemon

FROM eclipse-temurin:21 AS production

WORKDIR /app

COPY --from=builder app/build/libs/*.jar server.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "server.jar"]
