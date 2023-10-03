# MARKDOWN LINKS 🔎🔗 - Librería "md-links" 📲

Se puede instalar esta librería ✔️ utilizando NPM (Node Package Manager), desde tu terminal puedes utilizar cualquiera de los siguientes comandos:

- ```npm install andreaSoncco/DEV009-md-links```

- ```npm install md-links andrea```

Link del Github Project donde me organice 🕒: [Ir a Github Project](https://github.com/users/andreaSoncco/projects/4/views/1)

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Definición del producto](#2-definición-del-producto)
* [3. Documentación de la Interfaz de Programación de Aplicaciones API](#3-documentación-de-la-interfaz-de-programación-de-aplicaciones-api)
* [4. Instrucciones de Instalación y Uso](#4-instrucciones-de-instalación-y-uso)
* [5. Proceso de Diseño y Desarrollo](#5-proceso-de-diseño-y-desarrollo)
* [6. Herramientas de Elaboración](#6-herramientas-de-elaboración)

## 1. Preámbulo.

[Markdown](https://es.wikipedia.org/wiki/Markdown) 📄 es un lenguaje de marcado
ligero muy popular entre developers. Es usado en
muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, etc.).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información  que se quiere compartir.

Esta herramieta creada a partir de [Node.js](https://nodejs.org/) sirve para leer y 
analizar archivos en formato `Markdown`, buscando links validos ✔️ y rotos ❌ para mostrarnos sus
propiedades y algunas estadísticas.

## 2. Definición del producto.

Este proyecto consiste en una librería en Node.js que funciona como
herramienta para extraer y validar enlaces según la ruta del archivo o directorio 
proporcionado, devuelve las propiedades, validaciones y cálculos de los enlaces 
encontrados.

![Imagen Representativa del Proyecto](md-links.png)
 
## 3. Documentación de la Interfaz de Programación de Aplicaciones API.

  🗂
  En este proyecto se decidió utilizar ES Modules con la síntaxis `import` / `export`, ya que
  es una versión más actual y se necesito hacer algunos pasos adicionales de configuración
  como instalar babel y modificar el package.json.

  Para poder trabajar con las rutas y crear las funciones del código se hizo uso de los modulos
  de Node.js como `fs` y `path`, usando principalmente `readFile` para leer archivos de forma
  asíncrona y `readdirSync` para leer directorios de forma síncrona.

  También se instalo y aplico el módulo de Axios para poder hacer las peticiones HTTP y generar
  las validaciones gracias a las propiedades `status` y `statusText`

  Al final del proyecto se testeo las funciones puras y la función general `mdLinks(path, validate)`
  luego de instalar jest y aplicar el test Mock para el módulo de Axios.

## 4. Instrucciones de Instalación y Uso.

### 4.1. Instalación 👩🏽‍💻

Esta librería está disponible de dos formas: como un módulo publicado
en GitHub, que las usuarias pueden instalar e importar en otros proyectos, y como
una interfaz de línea de comandos (CLI) que permitirá utilizar la librería directamente
desde el terminal.

Se puede instalar esta librería utilizando NPM (Node Package Manager), desde tu terminal puedes utilizar cualquiera de los siguientes comandos:

- ```npm install andreaSoncco/DEV009-md-links```

- ```npm install md-links andrea```

### 4.2. Guía de Uso 📋💻

#### 4.2.1. Obtener arreglo con propiedades de los links 🖇
Al ejecutar el siguiente comando:

  ```md-links ./firstDirectory```

Se obtendrá un arreglo de objetos con las propiedades:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

```shell
[
  {
    href: 'https://es.wikipedia.org/wiki/Markdownu',
    text: 'Markdown',
    file: 'thirdFile.md'
  },
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow',
    text: 'Arrow Functions',
    file: 'thirdFile.md'
  },
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow',
    text: 'Arrow Functions',
    file: 'firstFile.text'
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: 'SecondFile.markdown'
  }
]
```
#### 4.2.2. Obtener arreglo con propiedades y validaciones de los links 🖇✅
Para esto se utiliza el argumento `--validate` y se ejecutar el siguiente comando:

  `md-links ./firstDirectory --validate`

Obtendremos un arreglo de objetos con las propiedades:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo de lo contrario `ok` en caso de éxito.

```shell
  [
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow',
    text: 'Arrow Functions',
    file: 'firstFile.text',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdownu',
    text: 'Markdown',
    file: 'thirdFile.md',
    status: 404,
    ok: 'fail'
  },
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow',
    text: 'Arrow Functions',
    file: 'thirdFile.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: 'SecondFile.markdown',
    status: 200,
    ok: 'ok'
  }
]

```

#### 4.2.3. Obtener estadísticas de los Links 🧮
Para esto se utiliza el argumento `--stats` y se ejecuta el siguiente comando:

  `md-links ./firstDirectory --stats`

Al utilizar esta opción, podrás obtener estadísticas relacionadas con los enlaces presentes en los archivos Markdown.

```sh
Total: 4
Unique: 3
```

* Los `links Total` representan la cantidad total de enlaces encontrados en los archivos analizados. Cada enlace único se suma, incluso si aparece varias veces en diferentes archivos.

* Los `links Unique` muestran la cantidad de enlaces distintos presentes en los archivos Markdown. Si un mismo enlace aparece en varios archivos, solo se contará una vez en esta métrica.

Utiliza esta opción para obtener una visión general de la cantidad total de enlaces y la diversidad de enlaces únicos en tus documentos Markdown.

#### 4.2.4. Obtener estadísticas y contar los links rotos ❌
Para esto se utiliza el argumento `--validate` y `--stats`, se ejecuta el siguiente comando:

  `md-links ./firstDirectory --validate --stats`

También podemos combinar `--validate` y `--stats` para obtener estadísticas que necesiten de los resultados de la validación.

```sh
Total: 4
Unique: 3
Broken: 1
```

* `Broken:` El número de enlaces que están rotos o que no devuelven un mensaje de ok

## 5. Proceso de Diseño y Desarrollo.

### 5.1. Planificación y Diseño. ✏️

Para realizar el proyecto me organice utizando Github Project. De esta manera planifique mejor el tiempo y dividi el trabajo en metas por sprint usando `milestones` que contienen `issues` o tareas más pequeñas.Aplique metodología SCRUM de trabajo ágil.

Para el desarrollo de la libreria y teniendo en cuenta que se debia pensar en la Interfaz de Programación de Aplicaciones API realice un Diagrama de Flujo o Pseudocódigo 💡 que me ayudo a poder ordenarme respecto a las funciones que se necesitaban crear y codear la totalidad del proyecto.

[Ir al Diagrama de Flujo o Pseudocódigo de mdLinks: ](https://drive.google.com/file/d/1AXoFnJ6bVQXE7URR6OiYP7XmP8JzJUFA/view?usp=sharing)

*** Diagrama de Flujo Primera Parte ***
![Tablero de Github Project](DiagramadeFlujoPrimero.png)

*** Diagrama de Flujo Segunda Parte ***

![Tablero de Github Project](DiagramadeFlujoSegundo.png)

### 5.2. Desarrollo del Proyecto.

El desarrollo total de la libreria tomo cinco sprints y al cabo de cada uno fui tomando en cuenta el feedback recibido para hacer mejoras, a continuación pasaré a mostrar la imagen de mi tablero en Github Project donde guió el desarrollo por 5 hitos:

- Hito 1 ♟: Creación de la función mdLinks que devuelve una promesa con un arreglo de tres propiedades de los links

- Hito 2 💫: Agregar el argumento validate para agregar dos propiedades sobre validaciones HTTP

- Hito 3 📚: Leer directorios y no solo archivos

- Hito 4 ⌨️: Crear la interfaz de línea de comando

- Hito 5 ⭐️: Trabajar la recursividad de la función para leer directorios

*** Tablero de Github Project ***

![Tablero de Github Project](Github.png)

*** Cuadro de Milestones ***

![Cuadro de Milestones](Milestones.png)

