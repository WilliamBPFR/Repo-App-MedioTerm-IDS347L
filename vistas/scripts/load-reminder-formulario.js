const urlParams = new URLSearchParams(window.location.search);
const encodedData = urlParams.get('data');
if(encodedData){
const decodedData = JSON.parse(decodeURIComponent(encodedData));
console.log(decodedData);
var titulo = document.getElementById('titulo');
var descripcion = document.getElementById('descripcion');
var id = document.getElementById('iddatos');
var fecha = document.getElementById('fecha');
var email = document.getElementById('email');
id.value = decodedData._id;
titulo.value = decodedData.title;
descripcion.value = decodedData.message;
fecha.value = decodedData.fecha.split('T')[0];
email.value = decodedData.email;
}else{
  console.log('No data found');
  console.log(encodedData);
}
