# Proyecto Final

Para la elección de la API he elegido una llamada [balldontlie](https://www.balldontlie.io/). Dentro de las APIs proporcionadas y de contenido NBA, es la única con HTTPS y CORS adecuados. Después de un vistazo, el contenido de la misma sobre jugadores, equipos, estadísticas,... es apropiado para la realización del *Proyecto Final*.

El primer paso, basado en el ejemplo de la *Sesión Síncrona 3*, ha sido acceder a los datos de la API para realizar un análisis más exhaustivo. Después, con lo explicado en la *Sesión Síncrona 4*, se ha hecho una prueba con datos de partidos proporcionados por la API y se ha realizado un primer diseño bastante rudimentario:  

![Primer diseño](/markdown/primerdiseno.png "Primer diseño") 

Más adelante, se ha empezado a trabajar con Flexbox para optimizar el diseño de la página y para acercarse más a un posible diseño final:  

![Segundo diseño](/markdown/segundodiseno.png "Segundo diseño")  

El siguiente paso, ha sido empezar a elaborar los estilos por equipos. En la medida de lo posible, la idea es crear unos estilos css para cada equipo de la NBA, para que cuando se realice una búsqueda por jugador o por equipo salgan los colores de cada equipo. Se implementará con la ayuda de la página [Sports Fan Covers](https://sportsfancovers.com/nba-team-colors/), para la correcta selección de los colores de cada equipo. Al ser 30 equipos no sé si será factible llevar a cabo esta tarea o requerirá de un tiempo desproporcionado.

Con lo explicado en la *Sesión Síncrona 6*, se ha implementado un primer diseño de como sería una página de un equipo selecionado:

![Diseño equipo](/markdown/disenomem.png "Diseño equipo")  

Después de un tiempo sin avanzar el proyecto, he decidido reemprenderlo realizando una página con todos los logos de los equipos NBA, divididos por conferencias. Una vez pinchando en el logo de un equipo, la idea era generar una tabla con los jugadores de ese equipo buscando en la API. Entonces ha surgido un problema, que habrá que evaluar para encontrar una posible solución o descartar la idea. Ya que la URL de jugadores está divida en 151 páginas con 25 jugadores por lo que las llamadas a la API con los awaits correspondientes retrasan demasiado la ejecución. Además, que la API solo permite 60 llamas al minuto, por lo que se me ha bloqueado. 