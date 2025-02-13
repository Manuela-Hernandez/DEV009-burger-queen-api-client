## <Sprint 7> - <08/11/2023>

### Sprint learnings

* Lógica de programación.
* Peticiones HTTP (post, patch y delete).
* HTML (tablas y formularios).
* Tailwind

### Added

* Tests de waiter como la navegacion de botones y cambio de estado a delivered.
* Componente lista de usuario para el rol de admin.
* Componente de modal para admin haciendo que se cierre cuando la operación finaliza. 
* Componente de formulario para agregar usuarios dandole funcionalidad con POST y validaciones de campos.
* Componente de formulario para editar la información de usuarios dandole funcionalidad con PATCH y validaciones de campos.
* Se agrega la función para eliminar usuarios con DELETE utilizando la confirmación.
* Tests del componente Users para corroborar el agregar, editar y eliminar usuarios.

### Fixed

* Tests en el componente Chef

## <Sprint 6> - <31/10/2023>

### Sprint learnings

* Logica de programacion
* Renderizado condicional
* Router (Rutas anidadas y navegación)
* Componentes y su reutilización

### Added

* Se agregó la ruta anidada para waiter.
* Se agregaron botones para la navegacion entre rutas.

### Changed

* Se modificó la función timeDuration para considerar los días en el transcurso del tiempo.
* Se modificó el componente modal considerando validaciones para que que lo podamos reutilizar por rol

### Fixed

* Se arregla un problema que se mostraba un indefinido cuando la api key expiraba.
  
## <Sprint 5> - <25/10/2023>

### Sprint learnings

* Renderizado condicional
* Peticiones HTTP (patch)
* Testing Library
* Tailwind
* Hooks

### Added

* Función para calcular la duración de la orden. Calculando el tiempo transcurrido desde que se registró la orden.
* Se agrega modal para ver los productos de la orden, teniendo la funcionalidad de ser cerrado o bien completar la orden mediante casillas de verificación y cambiar su status a _ready_ solo si se han seleccionado todas las casillas de verificación.
* Se agrega la validación para que solo se muestre el botón de _start_ a las ordenes pendientes.
* Tests complementarios.

### Changed

* Formato de fecha para su almacenamiento en dataEntry.
* Estilo principal del sitio, despues de tests de usabilidad.

### Fixed

* Corrección de tests de la historia de usuario 2 por cambio de formato Date.
* Corrección de funcion timeDuration debido al formato de hora que retorna Date y dataEntry.

### Removed

* Estilos que no efectuaban cambios y comentarios.

## <Sprint 4> - <18/10/2023>

### Sprint learnings

* Testing con Jest, utilizando mocks y espías.
* Implementación de librerías como sweetAlert
* Manejo dinámico del DOM
* Peticiones HTTP (GET)
* Etiquetas HTML (table, tr, td, thead, tbody, th)

### Added

* Validaciones y notificaciones implementando sweetAlert.
* Limpieza de campos al completar la orden.
* Tests de la historia de usuario 2.
* Servicio para traer todas las órdenes, así como el filtrado de las que están pendientes.
* Se genera tabla con la data de órdenes

### Changed

* Estilos en el componente _Summary_, adicionalmente se agrega total al estado del pedido.
* Se cambia Redux por el Hook useReducer.

### Fixed

* La orden y el nombre del usuario no se eliminaba al guardar.

### Removed

* Configuración de Redux

## <Sprint 3> - <10/10/2023>

### Sprint learnings

* Tailwind
* Router y rutas protegidas
* Redux (actions, store, reducers)
* Estados y props
* Peticiones HTTP (POST)
* Componentes de react
* Tests unitarios con jest y mocks
* Funcionalidad de gitignore

### Added

* Configuracion para test.
* Tests para login utilizando mocks.
* Implementación de Tailwind.
* Componente para mostrar los productos del menú.
* Funcionalidad en los botones para ir agregando a la orden.
* Funcionalidad para que se muestre el menú dependiendo de lo seleccionado (Desayuno o Almuerzo).
* Componente de resumen de pedido.
* Configuración de redux.
* Implementación de redux para almacenar la orden desde el componente lista de productos y acceder desde el componente de resumen de pedido.
* Funcionalidad para eliminar productos de la orden (uno o todos).
* Función para cálculo de subtotal y total.
* Almacenamiendo de la orden en API.

### Changed

*  Actualización de rutas protegidas (validaciones)
*  Configuracion de eslint
*  Modificación de gitignore(se elimina coverage de git)
*  Se reemplazan estilos CSS por Tailwind.
*  Estilos de componentes.
*  Se actualiza función de agregar producto a la orden cambiando validaciones para que no se duplique en la lista pero que se modifique la cantidad. 

### Fixed

* Solución de conflictos al unir cambios de ambos repositorios.
* Solución de conflictos con el uso de redux. 

### Removed

* Archivos CSS
  
## <Sprint 2> - <04/10/2023>

### Sprint learnings

* Componentes de react
* Router
* Consumo de API mock
* Peticiones HTTP
* Rutas protegidas

### Added

En esta sección especifica las funcionalides que agregaste.

* Maquetación de login
* Se agrega peticion a axios
* Almacenamiento de token y rol
* CSS de componente loginForm
* Se agrega validacion rutas protegidas
* Barra de navegación y estilos
