# Taller-06-AREP

## Diseño Seguro de Aplicaciones - Taller de Arquitectura Empresarial

### Sistema de Gestión de Propiedades 🏠

Este proyecto implementa un sistema CRUD (Create, Read, Update, Delete) para administrar propiedades inmobiliarias. Con esta aplicación podrás:

Registrar nuevas propiedades.

Consultar el listado completo o detalles de una propiedad específica.

Editar datos de propiedades existentes.

Eliminar registros de propiedades.

El sistema está construido con Spring Boot (backend), MySQL (base de datos) y un frontend simple en HTML + JavaScript servido por Apache Server. Se despliega en AWS usando tres instancias EC2: una para el frontend, otra para el backend y otra para la base de datos.

### Videos:
DB:

https://youtu.be/IKl8q8Ex4_U

Back:

https://youtu.be/_YPnWBErqsY

https://youtu.be/LpGFZ509rng


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
      com/example/propertymanager/
          Property.java
          PropertyRepository.java
          PropertyService.java
          PropertyController.java
          Application.java
    resources/
        static/
            index.html
            styles.css
            app.js
        application.properties
  test/
    java/
Dockerfile
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

### ☁️ Despliegue en AWS (Resumen)

1. Base de datos MySQL

- Lanza una instancia EC2, instala Docker y ejecuta:

    ```
    docker run --name property-db \
    -e MYSQL_ROOT_PASSWORD=root \
    -e MYSQL_DATABASE=property_db \
    -p 3306:3306 -d mysql:latest

    ```

2. Backend 
  
- Empaqueta la app y crea la imagen:  

    ```
    mvn clean package
    docker build -t property-manager .
    docker tag property-manager juanescan/taller5
    docker push juanescan/taller5

    ``` 
- En otra instancia EC2:
  
   ```
    docker pull juanescan/taller5
    docker run -d -p 8080:8080 --name property-manager juanescan/taller5
     
    ```  
3. Reglas de seguridad
 
- Permite el puerto 3306 para MySQL (solo desde el backend).

- Permite el puerto 8080 para el backend.

### configuracion

![conf](/images/propiedades.png)

### APP

![app](/images/1.png)

![app](/images/2.png)
  
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