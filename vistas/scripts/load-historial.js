 // Realizar una petición AJAX para obtener los datos
 var xhr = new XMLHttpRequest();
 xhr.open("GET", "/historial-data", true);
 xhr.onreadystatechange = function() {
   if (xhr.readyState === 4 && xhr.status === 200) {
     var data = JSON.parse(xhr.responseText);
     var parentElement = document.getElementById('lista');
     data.forEach(function(element) {
       var titulo = document.createElement('li');
       var titulo_span = document.createElement('span');
       var div_buttons = document.createElement('div');
       var editar_button = document.createElement('button');
       var eliminar_button = document.createElement('button');
       titulo.textContent = element.title;
       console.log(element.title);
       titulo.className = 'list-group-item';
       div_buttons.className = 'btn-group';
       div_buttons.role = 'group';
       editar_button.className = 'btn btn-primary btn-action';
       editar_button.textContent = 'Editar';
       eliminar_button.className = 'btn btn-danger btn-action';
       eliminar_button.textContent = 'Eliminar';
       parentElement.appendChild(titulo);
       titulo.appendChild(titulo_span);
       titulo.appendChild(div_buttons);
       div_buttons.appendChild(editar_button);
       div_buttons.appendChild(eliminar_button);
       editar_button.addEventListener('click', function() {
         event.stopPropagation(); // Evita que el evento de clic se propague al elemento padre (el título)
         window.location.href = 'cargar-recordatorio/' + element._id;
        });
        eliminar_button.addEventListener('click', function() {
          event.stopPropagation();
          window.location.href = 'eliminar-recordatorio/' + element._id;
        });
       titulo.addEventListener('click', function() {
       window.location.href = 'cargar-recordatorio/' + element._id;
       });
     });
   }
 };
 xhr.send();