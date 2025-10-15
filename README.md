# Taller-06-AREP

## Diseño Seguro de Aplicaciones - Taller de Arquitectura Empresarial

### Sistema de Gestión de Propiedades 🏠

Este proyecto implementa un sistema CRUD (Create, Read, Update, Delete) para administrar propiedades inmobiliarias. Con esta aplicación podrás:

Registrar nuevas propiedades.

Consultar el listado completo o detalles de una propiedad específica.

Editar datos de propiedades existentes.

Eliminar registros de propiedades.

El sistema está construido con Spring Boot (backend), MySQL (base de datos) y un frontend simple en HTML + JavaScript servido por Apache Server. Se despliega en AWS usando tres instancias EC2: una para el frontend, otra para el backend y otra para la base de datos.

### Video:

https://youtu.be/my7BrcNYZQU


### Descripción General

Este proyecto demuestra una aplicación web segura y escalable. Los principales componentes son:

1. Frontend: Servido por un servidor Apache, cliente HTML + JavaScript asincrónico sobre HTTPS.

2. Frontend: Servido por un servidor Apache, cliente HTML + JavaScript asincrónico sobre HTTPS.

3. Base de Datos: MySQL ejecutándose dentro de un contenedor Docker.

El despliegue se realiza en instancias EC2 de AWS, siguiendo buenas prácticas de seguridad como cifrado TLS, almacenamiento seguro de contraseñas y comunicación segura entre componentes.

### Características Clave

- Cifrado TLS: Comunicación segura usando certificados Let's Encrypt.

- Cifrado TLS: Comunicación segura usando certificados Let's Encrypt.

- Seguridad en Login: Autenticación JWT con contraseñas encriptadas (BCrypt).

- Despliegue en AWS: Escalable y seguro en instancias EC2.

### 🧩 Arquitectura

La aplicación se compone de tres capas principales:

1. Frontend (Apache Server):

- Sirve archivos estáticos (HTML, CSS, JS) sobre HTTPS.

- Se aloja en una instancia EC2.

- Usa certificados TLS de Let's Encrypt.

2. Backend (Spring Boot):

- API REST para operaciones CRUD.

- Instancia EC2 separada.

- Autenticación JWT.

- Comunicación segura sobre HTTPS.

3. Base de Datos:

- MySQL en contenedor Docker.

- Almacena usuarios y propiedades.

### 🔑 Flujo de Interacción 

- El frontend envía peticiones HTTP (GET, POST, PUT, DELETE) al backend. 
- El backend procesa y consulta la base de datos, devolviendo las respuestas al cliente.
 
### 🖥️ Diseño de Clases 
 
Principales componentes del backend:

- Property: entidad que representa una propiedad.

- PropertyRepository: interfaz de acceso a datos que extiende JpaRepository.

- PropertyService: contiene la lógica de negocio para las operaciones CRUD.

- PropertyController: expone los endpoints REST.

```
src/
  main/
    java/
      eci/edu/Taller6/
        config/
            CorsConfig.java
            CorsFilter.java
            JwtAuthenthicationFilter.java
        controller/
            AuthController.java
            HelloController.java
            PropertyController.java
        model/
            Property.java
            User.java
        repository/
            PropertyRepository.java
            UserRepository.java 
        service/
            JwtUtil.java
            PropertyService.java
            UserService.java
    resources/
        application.properties
  test/
    java/
pom.xml
README.md

   ```

### ⚙️ Instalación Local

1. Clona el repositorio:

    ```
    git clone https://github.com/juanescan/Taller-06-AREP.git
    
    ```
2. Navegar al directorio del backend:

    ```
    cd Taller-06-AREP/backend
    
    ```
3. Construir el proyecto:

    ```
    mvn clean install
    mvn clean package

    ```

### Diseño de Clases 

#### Clases del Frontend

- login.js: Maneja la autenticación y almacena el JWT en localStorage.

- app.js: Gestiona operaciones CRUD y actualiza la interfaz de usuario.

- config.js: Almacena constantes de configuración, como la URL del backend.

#### Clases del Backend

- AuthController.java: Autenticación de usuarios y generación de JWT.

- PropertyController.java: CRUD de propiedades.

- PropertyService.java: Lógica de negocio de propiedades.

- PropertyRepository.java: Interacción con la base de datos.

- JwtUtil.java: Generación y validación de tokens JWT.

- Property.java: Entidad de propiedad.

- UserService.java, User.java, UserRepository.java: Gestión de usuarios y autenticación.

#### Base de Datos

- propertydb:

    - Tabla property: id, address, price, size, description.

    - Tabla user: id, username, password.



### configuración

![conf](/images/propiedades.png)

  
### Test

![test](/images/test.png)

### 🛠️ Tecnologías Utilizadas

- Java

- Spring Boot

- Maven

- MySQL 

- Docker

- AWS EC2

### 👤 Autor

- Juan Esteban Cancelado Sanchez - *AREP* *Taller 5* - [juanescan](https://github.com/juanescan)