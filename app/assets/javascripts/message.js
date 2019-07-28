$(function(){
  $(document).on('turbolinks:load', function(){
    function bulidMessage(message){


      
      var image = message.image === null ? image = '' : image = `<img src="${message.image}" alt="画像">`

    if (message.content && image) {
      var html = `  <div class="message" data-id="${message.id}">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.name}
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message" >
                        <p class="lower-message__content">
                        ${message.content}
                        ${image}
                        </p>
                      
                      </div>
                    </div>`;
      } else if  (message.content) {
        var html = `  <div class="message" data-id="${message.id}">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.name}
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message" >
                        <p class="lower-message__content">
                        ${message.content}
                        </p>
                      
                      </div>
                    </div>`;
      } else if (image) {
        var html = `  <div class="message" data-id="${message.id}">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.name}
                        </div>
                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="lower-message" >
                        <p class="lower-message__content">
                        ${image}
                        </p>
                      
                      </div>
                    </div>`;
      };
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message').last().data('id');
    var href = 'api/messages'
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: href,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
        console.log('messages');
        messages.forEach(function(message){  //eachメソッドの様にmessage要素を配列で取得
          var html = buildHTML(message)
          $('.message').append(html) //appendで上のhtml要素にmessage情報を代入
          $('.text').animate({scrollTop: $('.text')[0].scrollHeight}, 'fast')
      })
    })
    .fail(function() {
      console.log('error');
    });

    setInterval(reloadMessages, 5000);
  };
});