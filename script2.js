// Pregunta para Shrek 1

const preguntasTrivia1 = [
  {
    id: "q1",
    enunciado:
      "1. Porque estoy solito, no hay nadie aquí a mi lado, no habrá problemas hoy, de mi ya se han ..........",
    opciones: {
      a: " a) Burlado",
      b: " b) Reído",
      c: " c) Carcajeado",
    },
    respuesta: "a",
  },
  {
    id: "q2",
    enunciado:
      "2. Argh, mira eso, ¿quién querría vivir en ese cuchitril? ese cuchitril es mi .......",
    opciones: {
      a: " a) Casa",
      b: " b) Hogar",
      c: " c) Pantano",
    },
    respuesta: "b",
  },
  {
    id: "q3",
    enunciado: "3. Encontré ......... está duro y rancio",
    opciones: {
      a: " a) Pollo",
      b: " b) Queso",
      c: " c) Pan",
    },
    respuesta: "b",
  },
];



// Pregunta para segunda categoria
var preguntasTrivia2 = [
  {
    id: "q1",
    enunciado:
      "1.¿Sabes que fue lo mejor del dia de hoy?..........",
    opciones: {
      a: " a) Las chimichangas",
      b: " b) Que pude volverme a enamorar de tí",
      c: " c) Un gusano tonic",
    },
    respuesta: "b",
  },
  {
    id: "q2",
    enunciado:
      "2. Di alguna burrada como .......",
    opciones: {
      a: " a) Nadie me leyó mis derechos",
      b: " b) Traigo ropa interior de mujer",
      c: " c) Es una tanga",
    },
    respuesta: "b",
  },
  {
    id: "q3",
    enunciado: "3. Burro coquetéale!!! A quién?",
    opciones: {
      a: " a) A Rumpeltinsky",
      b: " b) A gato",
      c: " c) A tu esposa",
    },
    respuesta: "c",
  },
];

//var triviaSeleccionada;
var preguntas;

var counter = 0;

var pagesCounter = 0;

const slidesContainer = document.getElementById("slides-container");

function siguiente() {
  const slide = document.querySelector(".slide");
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
}

/*--- Temporizador --*/
var timeleft = 15;

function timer() {
  const myInterval = setInterval(function () {
    if (timeleft == 0) {
      // si se acaba el tiempo limpia el timer
      //document.getElementById("countdown").innerHTML = "Counting";
      clearInterval(myInterval);
      pagesCounter += 1;
      siguiente();
      
      if (pagesCounter < preguntas.length) {
        timeleft = 15;
        timer();
      } else if (pagesCounter == preguntas.length) {
        clearInterval(myInterval);
        alert("Puntos acumulados:  " + counter);
        window.location.href = "/Trivia-de-sherk-test/index.html";
      }
    } else {
      document.getElementById("countdown").innerHTML =
        timeleft + "  restantes!!";
    }
    timeleft -= 1;
  }, 1000);
}
timer();


// crea elementos html para cada pregunta
function buildQuestions(triviaSeleccionada) {
  if (triviaSeleccionada == 1) preguntas = preguntasTrivia1;
  if (triviaSeleccionada == 2) preguntas = preguntasTrivia2;
  
  var preguntaSeccion = document.getElementById("slides-container");

  preguntas.forEach((pregunta) => {
    // creas el contener de preguntas
    var box = document.createElement("li");
    box.setAttribute("class", "slide");

    // agrega el ENUNCIADO de la pregunta
    var preguntaTexto = document.createElement("label");
    preguntaTexto.textContent = pregunta.enunciado;
    box.appendChild(preguntaTexto);
    box.appendChild(document.createElement("br"));

    // agrega las OPCIONES
    Object.keys(pregunta.opciones).forEach((opcion) => {
      var inputId = pregunta.id + opcion;

      var cuadro = document.createElement("div");
      cuadro.setAttribute("class", "Cuadro");
      cuadro.setAttribute("id", "div" + inputId);

      var input = document.createElement("input");

      input.setAttribute("type", "radio");
      input.setAttribute(
        "onclick",
        "checkAnswer('" +
          opcion +
          "', '" +
          pregunta.respuesta +
          "', '" +
          inputId +
          "');"
      );
      input.setAttribute("id", inputId);
      input.setAttribute("name", pregunta.id);

      cuadro.appendChild(input);

      // texto de la opcion
      var newlabel = document.createElement("Label");
      newlabel.setAttribute("for", inputId);
      newlabel.innerHTML = pregunta.opciones[opcion];
      cuadro.appendChild(newlabel);

      // agrega separador
      cuadro.appendChild(document.createElement("br"));
      box.appendChild(cuadro);
    });
    preguntaSeccion.appendChild(box);
  });
}

// verifica la respuesta de cada pregunta
function checkAnswer(opcionSeleccionada, respuesta, inputId) {
  // cambia el color de opcion seleccionada
  var inputElement = document.getElementById(inputId);
  if (opcionSeleccionada == respuesta) {
    //inputElement.style.background = "green";
    document.getElementById("div" + inputId).style.backgroundColor = "green";
    document.getElementById("div" + inputId).style.color = "white";
  } else {
    //inputElement.style.accentColor = "red";
    document.getElementById("div" + inputId).style.backgroundColor = "red";
    document.getElementById("div" + inputId).style.color = "white";
  }

  pagesCounter += 1;
  if (opcionSeleccionada == respuesta) counter += 1;
  
  // delay para avanzar slide
  setTimeout(() => {
    // si es la ultima pregunta mostrar resultados
    // alert que muestra el tootal de puntos acumulados
    if (preguntas.length <= pagesCounter) {
      alert("Puntos acumulados:  " + counter);
      window.location.href = "/Trivia-de-sherk-test/index.html";
    } else {
      siguiente();
      timeleft = 15;
    }
  }, 1500);
}

// guarda el nombre del usuario
function guardarNombre() {
  var name = document.getElementById("username").value;
  localStorage.setItem("username", name);
}

// usa nombre de usuario guardado previamente
document.getElementById("myname").textContent =
  "Hola: " + localStorage.getItem("username");
