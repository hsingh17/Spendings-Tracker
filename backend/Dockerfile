FROM openjdk:17

WORKDIR /backend

COPY ./ ./

RUN ./mvnw clean package -Dmaven.test.skip

EXPOSE 8080

# For remote debugging
EXPOSE 5005 

CMD "./mvnw" "spring-boot:run" "-Dspring-boot.run.profiles=${ENV}" "-Dspring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"