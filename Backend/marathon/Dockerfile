FROM azul/zulu-openjdk:11.0.17

COPY ./build/libs/marathon-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 4433

ENTRYPOINT ["java", "-jar", "/app.jar"]
