//archivo principal de mi frontend de mi app

//funcion que valida el uso del jquery, esta funcion es llamada desde la pagina principal html mediante Script.
$(function() {
  
  let editar = false; //para validar el uso de la url
  console.log('Jquery esta funcionando ok y comunicandose con el frontendybackend');//muestra en consola del navegador el texto de adentro
  console.log('by Lachy');//muestra en consola del navegador el texto de adentro
  
  $('#resultado-busqueda').hide();//esconde el div con id(#resultado-busqueda) mostrado en la pagina principal HTML.
  obtenerLecturas();

  //funcion que captura lo tecleado en el input de la busqueda, lo busca en la BD y lo lista en la pagina principal
  //va capturando lo tecleado
  $("#search").keyup(function() {
    if ($("#search").val()) {     
      let search = $("#search").val(); //lo tecleado lo mete en la variable search
      //*****llama a la funcion ajax respetando su estructura.
      $.ajax({
        url: "busca-lectura.php",//archivo que genera la busqueda
        type: "POST", //tipo de envio
        data: { search }, //variable con el dato a buscar o procesar en el archivo busca-lectura
        success: function(response) {    //devuelve en response lo encontrado o analizado
          let lecturas = JSON.parse(response);  //este convierte el arreglo string en un JSON.
          let plantilla = "";

          //(forEach)permite recorrer la variable lecturas que es de tipo JSON
          lecturas.forEach(lecturas => {
            //va montando en la plantilla la lista de los elementos dentro del JSON
            plantilla += `<li>
                        ${lecturas.lectura}      
                    </li>`; //lecturas es el nombre de la variable JSON y lectura es el nombre_atributo de la estructura del JSON(Salida de la BD)
            
          });
          
          $("#contenedor").html(plantilla); //manda la plantilla a mostrar en el HTML proncipal
          $('#resultado-busqueda').show(); //muestra el div con id(#resultado-busqueda) mostrado en la pagina principal HTML. 
        }
      });
    }
  });

  //****************************************AGREGAR********************* */ 
  $('#formulario-lectura').submit(function (e){
      //console.log('enviando');
      //creando un objeto para almacenar los datos
      const postData= {
        lectura: $('#inlectura').val()        
      };
      //console.log(postData);//muestra lo que capture en el form
      

      let url = editar=== false ? 'lectura-add.php' : 'editar-lectura.php'; //esto sirve para saber donde enviara el metodo post de abajo a que archivo a procesar si lectura-add o editar-lectura

     //*****otro metodo mas corto de jquery y AJAX parecido al de buscar mas arriba(le envia el dato al archivo 'lectura-add.php' para que lo procese y sea agregado a la bd)
      $.post(url, postData, function(response){
          //*****************console.log(response);
          obtenerLecturas();
          $('#formulario-lectura').trigger('reset');//esto limpia los datos que fueron escritos en el form.

      });
      
      e.preventDefault();
  });
//***********************LISTAR************************** */
    //*********funcion que lista todas las LECTURAS  
    function obtenerLecturas(){
      $.ajax({
        url: "lista-lecturas.php",//archivo que genera la busqueda
        type: "GET", //tipo de envio
        success: function(response) {
          let lecturas_generales = JSON.parse(response); //este convierte el arreglo string en un JSON objeto.
          let template='';//se crea plantilla vacia para llenarkla luego con el ciclo
          lecturas_generales.forEach(lecturas_generales=>{    //ciclo para llenar la template
            template += `
            <tr idlectura_general="${lecturas_generales.id}"> 
                <td>${lecturas_generales.id}</td>
                <td>
                  <a href="#" class="lectura-item">${lecturas_generales.lectura}</a>
                </td>
                <td>${lecturas_generales.fecha}</td>
                <td>
                  <button class="eliminar-lectura btn btn-danger">Borrar</button>
                </td>
            </tr>
            ` 
          });
          $('#ListaTareas').html(template); //se manda la tamplate al HTMl web principal
        }
      });
    }

//****************************ELIMINAR**************************** */    
    
    $(document).on('click', '.eliminar-lectura', function(){     //a travez de jquery se captura el evento on click del boton class=eliminar-lectura
      if(confirm('Estas seguro de eliminar la lectura')){    //se valida
        let elemento= $(this)[0].parentElement.parentElement;//obtiene toda la fila del boton que a sido clikeado para luego capturar el id
      let id=$(elemento).attr('idlectura_general'); //obtenemos su propiedad llamada IdLectura, es tiene dentro el valor del id de la Lectura y lo almacenamos en la variable Id
      $.post('eliminar-lectura.php', {id}, function(response){   //metodo corto de envio-respuesta ajax en este caso elimina dado el id
          //console.log(response);
          obtenerLecturas();
      })
      //console.log(id);
      }
    });

   
   
   
   //********************************ACTUALIZAR********************** */
   
    $(document).on('click', '.lectura-item', function(){
      let elemento= $(this)[0].parentElement.parentElement;
      let id=$(elemento).attr('idlectura_general');
      $.post('unalectura.php', {id}, function(response){   //metodo corto de envio-respuesta ajax en este caso elimina dado el id
        const lectura = JSON.parse(response);
        $('#inlectura').val(lectura.lectura);
        editar = true; //pone a editar en true para redirigir segun el archivo url
        
        //console.log(response);
        //obtenerLecturas();
    }) 
    });


});
