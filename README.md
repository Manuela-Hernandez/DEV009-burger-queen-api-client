# Burger Queen (API Client)

## Índice

* [1. Resumen del proyecto](#1-resumen-del-proyecto)
* [2. Herramientas utilizadas](#2-herramientas-utilizadas)
* [3. Historias de usuario](#3-historias-de-usuario)
* [4. Prototipos](#4-prototipos)
* [5. Interfaz](#5-interfaz)

***

## 1. Resumen del proyecto

Este proyecto se diseñó para un restaurante de hamburguesas y permite diferentes funcionalidades dependiendo del rol del empleado tales como:
* Administrador: Le permite agregar, editar y eliminar información tanto de los usuarios como de los productos
* Cocinero: Visualizar las ordenes pendientes por preparar y manejar el estado de las ordenes para ser entregadas por el mesero.
* Mesero: Tomar el pedido del cliente y enviarlo a la cocina, visualizar el estado de las ordenes pendientes por entregar.

Esta es la información que tenemos del cliente:

> Somos **Burguer Queen**, una cadena de comida 24hrs.
>
> Nuestra propuesta de servicio 24hrs ha tenido muy buena acogida y, para
> seguir creciendo, necesitamos un sistema que nos ayude a tomar los pedidos de nuestrxs clientxs.
>
> Nuestrxs clientxs son bastante indecisos, por lo que es muy común que cambienel pedido varias veces antes de finalizarlo.


- **¿Quiénes son los principales usuarios de producto?** 

  Empleados del restaurante Burger queen.                        
  
- **¿Cuáles son los objetivos de estos usuarios en relación 
con el producto?**

  Optimizar la toma de pedidos, comunicación entre meseros y cocineros.
  Administrar información relevantes con el producto y usuarios.

- **¿Cuáles son los datos más relevantes que quieren ver en 
la interfaz y por qué?**

  Detalles de las ordenes.
  Administración de empleados.

- **¿Cuándo utilizan o utilizarían el producto?**

  Cuando se necesite tomar y atender una orden, ver el listado, y administrar la información.

##  2. Herramientas utilizadas

  - **Figma**: Crear prototipos.
  - **React con Javascript**: Está desarrollada con react y está conectada a una API que funciona de manera local.
  - **Tailwind CSS**: Para dar estilo a la interfaz.
  - **Sweet alert2**: Manejar validaciones mostrando mensajes al usuario.
  - **Axios**: Manejo de peticiones para obtener, agregar, editar y eliminar informacion en la API. 
  - **Jest**: Pruebas unitarias.

## 3. Historias de usuario

### Definición del producto

#### [Historia de usuario 1] Mesero/a debe poder ingresar al sistema, si el admin ya le ha asignado credenciales

Yo como meserx quiero poder ingresar al sistema de pedidos.

##### Criterios de aceptación

Lo que debe ocurrir para que se satisfagan las necesidades del usuario.

* Acceder a una pantalla de login.
* Ingresar email y contraseña.
* Recibir mensajes de error comprensibles, dependiendo de cuál es el error
  con la información ingresada.
* Ingresar al sistema de pedidos si las crendenciales son correctas.

##### Definición de terminado

Lo acordado que debe ocurrir para decir que la historia está terminada.

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

#### [Historia de usuario 2] Mesero/a debe poder tomar pedido de cliente/a

Yo como meserx quiero tomar el pedido de unx clientx para no depender de mi mala
memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y
que se puedan ir preparando en orden.

##### Criterios de aceptación

Lo que debe ocurrir para que se satisfagan las necesidades del usuario

* Anotar nombre de clientx.
* Agregar productos al pedido.
* Eliminar productos.
* Ver resumen y el total de la compra.
* Enviar pedido a cocina (guardar en alguna base de datos).
* Se ve y funciona bien en una _tablet_

##### Definición de terminado

Lo acordado que debe ocurrir para decir que la historia está terminada.

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

#### [Historia de usuario 3] Jefe de cocina debe ver los pedidos

Yo como jefx de cocina quiero ver los pedidos de lxs clientxs en orden y
marcar cuáles están listos para saber qué se debe cocinar y avisar a lxs meserxs
que un pedido está listo para servirlo a un clientx.

##### Criterios de aceptación

* Ver los pedidos ordenados según se van haciendo.
* Marcar los pedidos que se han preparado y están listos para servirse.
* Ver el tiempo que tomó prepara el pedido desde que llegó hasta que se
  marcó como completado.

##### Definición de terminado

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

#### [Historia de usuario 4] Meserx debe ver pedidos listos para servir

Yo como meserx quiero ver los pedidos que están preparados para entregarlos
rápidamente a lxs clientxs que las hicieron.

##### Criterios de aceptación

* Ver listado de pedido listos para servir.
* Marcar pedidos que han sido entregados.

##### Definición de terminado

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).
* Los datos se deben mantener íntegros, incluso después de que un pedido ha
  terminado. Todo esto para poder tener estadísticas en el futuro.

***

#### [Historia de usuario 5] Administrador(a) de tienda debe administrar a sus trabajadorxs

Yo como administrador(a) de tienda quiero gestionar a los usuarios de
la plataforma para mantener actualizado la informacion de mis trabajadorxs.

##### Criterios de aceptación

* Ver listado de trabajadorxs.
* Agregar trabajadorxs.
* Eliminar trabajadoxs.
* Actualizar datos de trabajadorxs.

##### Definición de terminado

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

#### [Historia de usuario 6] Administrador(a) de tienda debe administrar a sus productos

Yo como administrador(a) de tienda quiero gestionar los productos
para mantener actualizado el menú.

##### Criterios de aceptación

* Ver listado de productos.
* Agregar productos.
* Eliminar productos.
* Actualizar datos de productos.

##### Definición de terminado

* Debes haber recibido _code review_ de al menos una compañera.
* Haces _test_ unitarios y, además, has testeado tu producto manualmente.
* Hiciste _tests_ de usabilidad e incorporaste el _feedback_ del usuario.
* Desplegaste tu aplicación y has etiquetado tu versión (git tag).

***

## 4. Prototipos

## 5. Interfaz

Para ingresar use los siguientes usuarios:


| Role    | Email                    | Contraseña |
| :---:   |     :---:                |  :---:     |
| Waiter  | empleado1@systers.xyz    | 0123456789 |
| Chef    | empleado2@systers.xyz     | 0123456789 |
| Admin   | grace.hopper@systers.xyz | 0123456789 |
|


https://github.com/Manuela-Hernandez/DEV009-burger-queen-api-client/assets/135163093/8b310a71-0f85-459d-93c1-ba8529bddbbe

https://github.com/Manuela-Hernandez/DEV009-burger-queen-api-client/assets/135163093/75c157ad-c5f2-4181-a0ba-7671a5ca6e11

https://github.com/Manuela-Hernandez/DEV009-burger-queen-api-client/assets/135163093/b61ca8b2-0e12-43d9-bc50-aa9a256280d8

https://github.com/Manuela-Hernandez/DEV009-burger-queen-api-client/assets/135163093/9dda9cac-9929-470e-b7e1-296b0d1faf5e

https://github.com/Manuela-Hernandez/DEV009-burger-queen-api-client/assets/135163093/cb5ec790-cbb7-454c-a5e0-f1340ff1822d





## Desarrolladoras

- [Brenda Aguilar](https://github.com/brenah00) 
- [Manuela Hernández](https://github.com/Manuela-Hernandez)
