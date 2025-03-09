# E-commerce Hexagonal Architecture

Este proyecto es una implementación de una arquitectura hexagonal para una aplicación de comercio electrónico.

## Descripción

La arquitectura hexagonal, también conocida como arquitectura de puertos y adaptadores, es un patrón de diseño de software que pretende aislar el núcleo de la aplicación de las preocupaciones externas, como la interfaz de usuario, la base de datos y otros sistemas externos.

## Estructura del Proyecto

<!--
El proyecto está organizado en los siguientes módulos:

- **Core**: Contiene la lógica de negocio y las entidades del dominio.
- **Ports**: Define las interfaces que deben implementar los adaptadores.
- **Adapters**: Implementaciones de las interfaces definidas en los puertos, como repositorios, servicios externos, etc.
- **Application**: Configuración y punto de entrada de la aplicación. -->

## Requisitos

- Nodejs

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/ecommerce-hexagonal.git
   ```
2. Navega al directorio del proyecto:
   ```sh
   cd ecommerce-hexagonal
   ```
3. Compila el proyecto:
   ```sh
   npm i
   ```

## Uso

### Prisma

- Ejecuta npx prisma migrate dev --name nombre_migracion.
- Para producción, usa npx prisma migrate deploy.
- Sincroniza tipos con npx prisma generate.
