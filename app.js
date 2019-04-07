
var nuevoInvitado = document.getElementById("guardar");
var listaInvitados = document.getElementById('invitedList');
var invitados = [];

nuevoInvitado.addEventListener('click', invitar);

function eventos() {
   
    // se añade evento a boton Editar
    let bonotesEdit = document.getElementsByClassName('edit');          // array con todos los edit de los li creados
    for (i = 0; i < bonotesEdit.length; i++) {  
        bonotesEdit[i].addEventListener('click', editarInvitado);
    }
    // se añade evento a boton Borrar
    let bonotesRemove = document.getElementsByClassName('remove');      // array con todos los remove de los li creados
    for (i = 0; i < bonotesRemove.length; i++) {
        bonotesRemove[i].addEventListener('click', eliminarInvitado);
    }
    // se añade evento a checkbox
    let checks = document.getElementsByClassName('check');              // array con todos los check de los li creados
    for (i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', confirmarInvitado);
    }
}

function validarNombre(nombre) {
    
    let valida = true;
    //VALIDACION  se ha escrito un nombre
    if (nombre === '') {
        alert("Debe de escribir un nombre");
        valida = false;
    }
    //VALIDACION no se repita nombre
    let nombres = document.getElementsByTagName('span');
    for (i = 0; i < nombres.length; i++) {
        if (nombres[i].innerHTML === nombre) {
            alert(nombre + " ya ha sido invitado");
            valida = false;
            break;
        }
    }
    return valida;

}

function invitar() {
    
    let inv = true;    
    let nombre = document.getElementById("nombre").value;       //Recupero nombre invitado
    inv = validarNombre(nombre.value);

    if (inv && nombre !== "") {
        crearInvitado(nombre);
        invitados.push(nombre);
    } else {
        alert("¡El invitado tiene que tener un nombre!");
    }
}

function crearInvitado(nombre) {
    // CREACIÓN DE ELEMENTO LI CON NOMBRE PASADO POR PARÁMETRO
    let li = document.createElement('li');
    
    // elemento span
    let span = document.createElement('span');
    span.innerHTML = nombre;
    li.appendChild(span);
    
    // elemento label
    let label = document.createElement('label');
    label.innerHTML = "confirmed";
    li.appendChild(label);
   
    // elemento botón edit
    let edit = document.createElement('button');
    edit.innerHTML = "edit";
    edit.setAttribute("class", "edit");
    li.appendChild(edit);
    
    // elemento botón remove
    let remove = document.createElement('button');
    remove.innerHTML = "remove";
    remove.setAttribute("class", "remove");
    li.appendChild(remove);
    
    // elemento input
    let check = document.createElement('input');
    check.setAttribute("type", "checkbox");
    check.setAttribute("class", "check");
    label.appendChild(check);

    listaInvitados.appendChild(li);

    eventos();

}

function editarInvitado(editar) {
    
    let editarLi = editar.target.parentNode;
    let nuevoNombre = prompt('Indique el nombre correcto del invitado', '');
    let valida = validarNombre(nuevoNombre);

    // si se valida el nombre lo cambiamos por el que se introduzca en el prompt
    if (valida) {
        let antiguo = editarLi.childNodes[0];
        antiguo.innerHTML = nuevoNombre;
    }
}

function confirmarInvitado(x){
    
    let verificarCheck=x.target;

    if(verificarCheck.checked==true){
        verificarCheck.parentNode.parentNode.setAttribute("class", "responded");
        estadisticasInvitados();
    }else{
        verificarCheck.parentNode.parentNode.setAttribute("class", "");
        estadisticasInvitados();
    }
}

function eliminarInvitado(eliminar) {
    
    //Recupero nombre invitado
    let nombre = document.getElementById("nombre").value;
    
    // si se confirma con el método confirm, el método splice eliminará el elemento de esa posición devolviendo el array modificado
    let respuesta = confirm("¿Confirma que desea eliminar a este invitado?");
    if (respuesta == true) {
        listaInvitados.removeChild(eliminar.target.parentNode);
        alert(invitados.indexOf(nombre));
        invitados.splice(invitados.indexOf(nombre), 1);         
    }
}

function estadisticasInvitados(){
    
    let estadisticas = document.getElementById('estadisticas');
    
    // creo dos párrafos para que cada información vaya en una línea
    let lista = document.createTextNode("El número de invitados de la boda es de: " + invitados.length);
    let p1 = document.createElement('h4');
    p1.appendChild(lista);
    
    let checks = document.getElementsByClassName('responded');
    let provisional = document.createTextNode("El número de personas confirmadas por el momento es de: " + checks.length);
    let p2 = document.createElement('h4');
    p2.appendChild(provisional);
    
    // tiene que repintar los nodos cada vez que se hace click, por lo que se vacía si tenía algo antes y se hacen los appends de nuevo
    if (estadisticas.hasChildNodes()) {
        while (estadisticas.childNodes.length >= 1) {
            estadisticas.removeChild(estadisticas.firstChild);
        }
    }
    
    // introducimos los elementos p en el div creado para ello
    estadisticas.appendChild(p1);
    estadisticas.appendChild(p2);        
}

function filtrarConfirmados(){
    
    // metemos en el array todos los elementos li
    let lista = document.getElementsByTagName('li');
    
    let check = document.getElementById('inputConfirmaciones');
    
    // si está checkeado se ocultarán los elementos li que no tengan clase, que no estén confirmados como responded, aplicándoles la clase 'ocultado' que he creado
    if (check.checked == true){
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].className == "") {
                lista[i].setAttribute("class","ocultado");
            }
        }
    // al quitar el check, todo debe volver a como estsaba antes, por lo que la clase 'ocultado' desaparece    
    } else {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].className == "ocultado") {
                lista[i].setAttribute("class","");
            }
        }
    }
}