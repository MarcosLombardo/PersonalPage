// Implementación de la clase Activity
class Activity {
    constructor(id, title, description, imgurl) {
        this.id = id; // Identificador único de la actividad
        this.title = title; // Título de la actividad
        this.description = description; // Descripción de la actividad
        this.imgurl = imgurl; // URL de la imagen asociada a la actividad
    }
}

let imagesId = 0; // Contador de identificadores de imágenes

// Implementación de la clase Repository
class Repository {
    constructor() {
        this.activities = []; // Arreglo para almacenar todas las actividades
    }

    getAllActivities() {
        return this.activities; // Método para obtener todas las actividades almacenadas
    }

    createActivity() {
        // Obtener los valores de los campos del formulario
        const titleValue = document.getElementById("title").value.trim();
        const descriptionValue = document
            .getElementById("description")
            .value.trim();
        const imgurlValue = document.getElementById("imgurl").value.trim();

        // Verificar si todos los campos están llenos y si la URL de la imagen es válida
        if (
            titleValue !== "" &&
            descriptionValue !== "" &&
            this.isValidImageUrl(imgurlValue)
        ) {
            // Crear una nueva instancia de Activity
            const activity = new Activity();
            activity.title = titleValue;
            activity.description = descriptionValue;
            activity.imgurl = imgurlValue;
            activity.id = imagesId++;

            this.activities.push(activity); // Agregar la actividad al arreglo de actividades

            this.insertActivityInHTML(activity); // Insertar la actividad en el HTML

            // Limpiar los campos del formulario después de crear la actividad
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("imgurl").value = "";
        } else {
            // Mostrar un mensaje de error indicando que todos los campos deben completarse
            alert(
                "Por favor, complete todos los campos correctamente antes de crear la actividad."
            );
        }
    }

    isValidImageUrl(url) {
        // Expresión regular para verificar si la URL termina con una extensión de imagen común
        const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
        return imageExtensions.test(url);
    }

    insertActivityInHTML(activity) {
        // Método para insertar una actividad en el HTML
        let nuevoHTML = `<div id="${activity.id}" class="tarjeta">
                            <h3>${activity.title}</h3>
                            <img id="imgSize" src="${activity.imgurl}" alt="imagenhtml">
                            <p>${activity.description}</p>
                            <img class="eliminatedCard" src="https://i.pinimg.com/736x/92/24/d4/9224d421ccdfca4140391870fe7a0c41.jpg" alt="Eliminar">
                            </div>`;

        const contenedorActividades = document.getElementById(
            "contenedor-actividades"
        ); // Obtener el contenedor de actividades
        contenedorActividades.insertAdjacentHTML("beforeend", nuevoHTML); // Insertar el HTML generado al final del contenedor

        // Asignar el evento de click al botón de eliminar
        const eliminatedCard = document
            .getElementById(activity.id)
            .querySelector(".eliminatedCard");
        eliminatedCard.addEventListener("click", () =>
            this.deleteActivity(activity.id)
        );
    }

    deleteActivity(id) {
        // Método para eliminar una actividad
        const indexToDelete = this.activities.findIndex((act) => act.id === id); // Encontrar el índice de la actividad a eliminar
        if (indexToDelete !== -1) {
            this.activities.splice(indexToDelete, 1); // Eliminar la actividad del arreglo
        }

        // Actualizar los identificadores de las actividades restantes
        this.activities.forEach((activity, index) => {
            activity.id = index;
        });

        imagesId = this.activities.length; // Actualizar el contador de identificadores

        // Eliminar todas las tarjetas existentes y volver a crearlas
        this.removeAllCards();
        this.insertActivitiesInHtml();
    }

    removeAllCards() {
        // Método para eliminar todas las tarjetas de actividades del HTML
        const contenedorActividades = document.getElementById(
            "contenedor-actividades"
        );
        while (contenedorActividades.firstChild) {
            contenedorActividades.removeChild(contenedorActividades.firstChild);
        }
    }

    insertActivitiesInHtml() {
        // Método para insertar todas las actividades en el HTML
        this.activities.forEach((activity) => {
            this.insertActivityInHTML(activity);
        });
    }
}

// Crear una nueva instancia de Repository
const repository = new Repository();

document.getElementById("presionar").addEventListener("click", (event) => {
    event.preventDefault(); // Detener el comportamiento predeterminado del formulario
    repository.createActivity(); // Llamar al método createActivity cuando se haga clic en el botón con el id "presionar"
});
