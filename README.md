# CODESA

a [Sails](http://sailsjs.org) application


El Presente Readme es para gestionar informacion relevante al desarrollo de la aplicacion

# Por Hacer
## Generales
*	Incluir [Ng-Animate](https://docs.angularjs.org/api/ngAnimate) al proyecto
## Inicio 
[http://localhost:1337/](http://localhost:1337) o '/'
*	Cambiar comportamiento o contenido al estar logeado
*	[Login](http://localhost:1337/login) deberia devolver siempre **html** y no **JSON**
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

# Casos
## Obras
> seria mejor crear libros al mismo momento que se cree la obra. 
> Osea que en el momento de creacion de la obra, crear un libro automaticamente por cada grupo existente 