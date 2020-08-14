# Luna Golf Store

Proyecto final para el curso de Webmaster - UTN 2020
Link descarga para base de datos -- https://drive.google.com/drive/folders/1_DABNw2ajKI6DN5Qaa1vLmJig-FSJ_ME?usp=sharing


## Pautas para entrega
* Animaciones CSS - MUY POCO
* Animaciones con CSS y SVG - NADA
* Etiquetas semánticas de HTML - SE PUEDE MEJORAR
* Accesibilidad - NADA
* Llamada a API externa - SI (MAILCHIMP)
* Llamada a un JSON interno - HECHO ( LOS FILTROS ESTAN CARGADOS DE FORMA PROVISORIA ASI )
* Usa sass - HECHO
* Usa linter - NOP
* Muy responsive - SE HIZO LO QUE SE PUDO ?)
* Express - HECHO
* Usa MySQL - HECHO
* Manejo de paquetes - HECHO
* Cosas raras CSS - MUY POCAS PERO SI
* Desarrollo cool de JS - DESORDENADO PERO ESTA

## Cosas adicionales
* Validacion de usuario con passport
* Encripacion de contraseñas con bcrypt-nodejs
* Mensajes de errores de validaciones desde el backend con connect-flash
* Newslatter con mailchimp-api-v3
* autoprefixer para css y postcss-cli para manejarlo desde el cli
* Uso de swiper
* Conexion a la api mediante url desde javascript para manejo de informacion sin recargar página.


### PENDIENTES A TERMNAR

#### Diseño

* NAVAR - Mejorar diseño para dropdown del usuario
* NAVBAR - Definir algun dropdown copado para la categoria de productos que no sea igual al del user o cart
* NAVBAR - Crear modal para el cart (responsive)
* FOOTER - Mejorar diseño para alerta del neslatter de formato de correo incorrecto
* HOME - Grid correspondiente a las categorias (correccion para la media query de tablets)
* HOME - Definir fondo para el header que contraste
* ABOUT - Definir bien el dieseño general, anterior muy feo
* PRODUCTS - Evitar scroll al cargar mas products (problema google chrome)
* PRODUCTS - Eliminar botton para cargar mas productos cuando ya no haya mas
* PRODUCTS - Hacer un diseño similar entre el ordenar y el filtrar productos (responsive)
* CONTACT - Mejorar diseño responsive, no me convence
* PRODUCT- Limitar height en la descripccion del producto, agregar boton para ver mas contenido
* PRODUCT - Limitar tamaño de comentarios visibles, agregar boton para ver mas comentarios
* CARD - Agregar botton fav
* CARD - Agregar diseño para el precio con descuento
* USER / CART - Terminar el diseño responsive
* USER / PURCHASES - Diseño completo 
* USER / FAVORITE - No me convence diseño, hacerlo responsive
* USER / HOSTORY - Diseño completo
* SEARCH - Mejorar diseño de alerta de sin resultados
* SIGN IN / SIGN UP - Mejorar diseño de alerta para validaciones
* 404 - Definir diseño completo :c
* Headers de ABOUT y CONTACT no coinciden con el proyecto en general
* Crear clases generales para titulos, headers, bottones, etc.
* Eliminar br, hay alguno por ahí dando vueltas.
* Majeo de outline feos que se ven en google chrome
* Seguro despues encuentro algo mas...
* Organizar documentos scss



### Node js

* NAVBAR - Ocultar menu de usuario si no esta autenticado
* FOOTER - Mostrar mensaje de registro a newslatter exitoso
* HOME - Crear tres peticiones randon para productos destacados, ofertas y random
* ABOUT - Peticiones para testimoniales
* ~PRODUCTS - Peticion con filtro de fecha para productos (tengo que eliminar toda la tabla de productos y crearla con el campo fecha)~
* PRODUCT - Validadar si el producto ya esta en favoritos para no cargarlo dos veces
* PRODUCTS / PRODUCT / CARD - Manejar el formato de moneda para que no muestre mas de 2 decimales y que use punto para separar los miles
* ~USER / PURCHASES - Peticion para crear y obtener informacion de reserva de compra~
* USER / HISTORY - Peticion para almacenar info y obtenerla
* ~USER / PROFILE - Usar moment para tomar datos de fecha de nacimiento a almacenar (cambiar diseño de bd user)~
* ~USER / PROFILE - Obtener de mailchimp si el correo ya esta registrado o no en el newslatter~
* SIGN IN - Retomar ultima url donde el usuario estaba antes de solicitar iniciar 
* Separar rutas usadas para backend y para peticiones del front
* Organizar mejor las rutas
* ~Validaciones de sign in, sign up y para actualziar datos~


### JavaScript - Fron End

* NAVBAR - Agregar boton delete para limpiar el contendio del search
* PRODUCTS - Eliminar el boton de mostrar mas productos si ya no hay mas en la base de datos
* PRODUCTS - Hacer que el primer select "Más relevante" limpie la url
* PRODUTS - Hacer funcionar los filtros en la version responsive
* PRODUCT - Detectar si el producto ya esta en el cart para poder sacarlo desde la vista de productos
* PRODUCT - Lo mismo pero con los favoritos
* PRODUCT - Evitar cargar productos y favoritos dos veces
* ~SIGN IN/ SIGN UP - Validaciones de formulario~
* ~USER / CART - Tomar los datos del producto cargado, cargarlos en formato json para poder guardarlos en purcases~
* ~USER / CART - Hacer calculadora para precio total y para precio segun cantidad de productos~


### PROBLEMAS GENERALES
* Manejo de filtros de la seccion izquierda, pensar bien como relacionarlo con la base de datos y como enviar estos datos por url junto a los de ordenar sin descajetar nada
* Ocultar menu de usuario si no esta autenticado, tengo que crear alguna variable global porque el navbar es un partial y no es optimo mandar un booleano con este dato en todas las vistas que se definan


