
## <Sprint 4> - <18/10/2023>

### Sprint learnings

*Testing con Jest, utilizando mocks y espías.
*Implementación de librerías como sweetAlert
*Manejo dinámico del DOM
*Peticiones HTTP (GET)
*Etiquetas HTML (table, tr, td, thead, tbody, th)

### Added

*Validaciones y notificaciones implementando sweetAlert.
*Limpieza de campos al completar la orden.
*Tests de la historia de usuario 2.
*Servicio para traer todas las órdenes, así como el filtrado de las que están pendientes.
*Se genera tabla con la data de órdenes

### Changed

*Estilos en el componente _Summary_, adicionalmente se agrega total al estado del pedido.
*Se cambia Redux por el Hook useReducer.

### Fixed

*La orden y el nombre del usuario no se eliminaba al guardar.

### Removed

*Configuración de Redux

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
