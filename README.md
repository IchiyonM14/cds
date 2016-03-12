# CODESA

a [Sails](http://sailsjs.org) application


El Presente Readme es para gestionar informacion relevante al desarrollo de la aplicacion

# Por Hacer
## Generales
*   Incluir [Ng-Animate](https://docs.angularjs.org/api/ngAnimate) al proyecto
*	Cambiar 404 500 y 403 pages
*	Habilitar [CSRF](http://sailsjs.org/documentation/reference/configuration/sails-config-csrf)
*	Habilitar paginacion para todas las tablas de datos
*	Habilitar checkbox para datos por default en todos los form de edicion
*	Añadir confimracion a botones de edicion
*	Teclado Numerico para inputs de telefono y numero .. _cuando sea un movil_

## Inicio 

[http://localhost:1337/](http://localhost:1337) o '/'

*	Cambiar comportamiento o contenido al estar logeado
*	El [Login](http://localhost:1337/login) deberia devolver siempre **html** y no **JSON**
*	Limite de logins por usuario
	*	No permitir mas de **_n_** intentos 
	*	Bloquear Usuarios con exceso de intentos
	*	Hablitar funcionalidad para desbloquear

## Obras

[http://localhost:1337/app#/Obras](http://localhost:1337/app#/Obras) o '/app#/Obras'

*   Tabla Responsiva ✔✔
*	Form Nueva Obra ✔✔
*	Mostrar Grupos o _tipos_ por cada libro ✔✔
*	Mejorar Feedback
	*	Nueva Obra
		*	Exito
		*	Error
	*	Editar Obra
		*	Exito
		*	Error
	*	Borrar Obra
		*	Exito
		*	Error
	*	No hay Obras ✔✔
	*	Error al traer obras
*	Confirmacion en Borrar y Update ✔ _actualmente se usa un window.confirm_
*	Sorting en tabla
*	Filtro en tabla ✔✔
*	Consultas Avanzadas _a nivel de serivdor_
	*	ej: Rango de fechas, stock, etc
*	Agregar tipos o grupos a Obras - _Ver caso abajo_

_muchas de las cosas en esta lista deben aplicarse para todas las entidades_

## Libros

[http://localhost:1337/app#/Obras](http://localhost:1337/app#/Obras) o '/app#/Obras'

*	Afinar el Filter ✔✔
	*	Permitir buscar por stock y tipo ✔✔
*	Labels a Stock y Tipo en Tabla ✔✔
	*	Stock rojo cuando cero, en menos de 10 amarillo, verde de lo contrario ✔✔

## Distribuidores

[http://localhost:1337/app#/Distribuidores](http://localhost:1337/app#/Distribuidores) o '/app#/Distribuidores'

*	Bug al querer guardar mas de un correo (aplicar fix ASAP)

# Casos
## Obras
> seria mejor crear libros al mismo momento que se cree la obra. 
> Osea que en el momento de creacion de la obra, crear un libro automaticamente por cada grupo existente 