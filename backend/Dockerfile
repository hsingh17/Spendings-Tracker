FROM openjdk:11

WORKDIR /backend

COPY ./ ./

RUN ./mvnw clean package -Dmaven.test.skip

EXPOSE 8080

CMD ["java", "-jar", "./target/Spring-Backend.jar"]