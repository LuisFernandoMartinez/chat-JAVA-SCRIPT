$(function(){
    const socket=io();

    //OBtener elementos del DOM
    const $messageForm= $('#message-form');
    const $messageBox=$('#message');
    const $chat=$('#chat');

    //Obtener regstro de usuarios
    const $nickForm=$('#nickForm');
    const $nickError=$('#nickError');
    const $nickname=$('#nickName');
    const $users=$('#usernames');
    
    //events
    $nickForm.submit(e=>{
      e.preventDefault();
      console.log('nuevo susuario');

      socket.emit('new user',$nickname.val(),data=>{
        if(data){
          $('#nickWrap').hide();
          $('#container').show();        
        }else{
          $nickError.html(`
          <div class="alert alert-danger">
          Usuario ya en uso.
          <div>
          `);
        }   
        $nickname.val('');
      });
    });


    $messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message',$messageBox.val(), data=>(
          $chat.append(`<p class="error"> ${data} </p> `)
        ));  
      
        $messageBox.val(''); 
    });
    
    socket.on('new message', function(data){
      $chat.append('<b>'+data.nick +' - </b>' +data.msg + '<br/>');
    });
 
    socket.on('usernames' , data=>{
      let html='';
      for (let i=0;i<data.length;i++){
        html += `<p><b> ${data[i]} <b><p>`
        console.log(data[i]);
      }
      $users.html(html);
    });

     socket.on('whisper', data=>{
         $chat.append(`<p class="whisper"><b>${data.nick} : 
         </b> ${data.msg}</p>  ` )
     });

     socket.on('load old msgs', msgs=>{
       for(let i=0; i< msgs.length;i++){
         displayMsg(msgs[i]);
       }
     })
     
     function displayMsg(data){
      $chat.append(` <p class="whisper"><b> ${data.nick} : </b> ${data.msg} </p>`);
     }

});