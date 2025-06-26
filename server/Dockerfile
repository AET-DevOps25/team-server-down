FROM gradle:8.13.0-jdk21 AS development

WORKDIR /app

COPY build.gradle settings.gradle ./
RUN gradle dependencies

COPY src/ src/

EXPOSE 9091
EXPOSE 5005

CMD gradle build --continuous & gradle bootRun

FROM gradle:8.13.0-jdk21 AS builder

WORKDIR /app

COPY build.gradle settings.gradle ./
RUN gradle dependencies

COPY src/ src/
RUN gradle bootJar --no-daemon

FROM eclipse-temurin:21 AS production

WORKDIR /app

COPY --from=builder app/build/libs/*.jar server.jar

EXPOSE 9091

ENTRYPOINT ["java", "-jar", "server.jar"]
