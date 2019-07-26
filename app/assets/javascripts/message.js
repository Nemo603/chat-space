$(function(){
  $(document).on('turbolinks:load', function(){
    function bulidMessage(message){


      var image
      message.image === null ? image = '' : image = `<img src="${message.image}" alt="画像">`

      var html = `  <div class="message">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.name}
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                        ${message.content}
                        ${image}
                        </p>
                      
                      </div>
                    </div>`;
      return html;
      }

      $('#new_message').on('submit',function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action')
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
      .done(function(message){
        var html = bulidMessage(message);
        $('.center-text').append(html);
        $('#new_message')[0].reset();
        var height = $('.text')[0].scrollHeight;
        $('.text').animate({scrollTop:height});
        
        
      
      })
      .fail(function(){
        alert('送信が失敗しました');
      })
      return false;  //これで連続で送信ボタンを押せるようにしている
    }); 
  })
});