$(document).on('turbolinks:load', function(){
  $(function() {
  
    var search_list = $("#user-search-result");
   // ユーザーリスト作成HTML
    function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                  </div>`;
        search_list.append(html);
    }
    // ユーザー名が存在しない
    function appendNoUser(user){
      var html = `<div class='chat-group-user clearfix'>${ user }</div>`
      search_list.append(html);
    }
  
    var member_list = $("#chat-group-users");
  // 追加ユーザーリスト作成
    function addUser(userId,userName) {
    
      var html = `<div class='chat-group-user' id='${userId}'>
                    <input name='group[user_ids][]' type='hidden' value='${userId}'>
                      <p class='chat-group-user__name'>${userName}</p>
                      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`;
    member_list.append(html);  //viweのmember_listに上のHTMLを出力している
      }

    
  // ユーザー検索
  // イベント発火、keyupメソッド
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      // ユーザーの検索に成功
        // 非同期通信の結果をdoneの関数の引数から受け取り、viewに追加するHTMLを作成
      .done(function(users){
        // console.log(users)
        $("#user-search-result").empty();
        // jbuilderから送られてきた配列の情報によって場合分け、関数呼び出し
        if (users.length !== 0) {
          users.forEach(function(user){  //usersが0 じゃないとき forEachでuserを
            appendUser(user);    //eachメソッドの様にjbuilderの配列から取り出し
          });    //上で定義したappendUserをuser.idとuser.nameを入力して 出力している
        }
        
        else {
          appendNoUser("一致するユーザはいません");
        }
      })
      .fail(function(){
        alert('検索に失敗しました');
      })
    });
    // 追加ボタンクリック時の処理
      $(document).on("click", ".user-search-add", function () {
      $('#chat-group-users').val();
        var userId = $(this).data('user-id');
        var userName = $(this).data('user-name');
        addUser(userId,userName);
        $(this).parent().remove();
      });
       // 削除ボタンクリック時の処理
      $(document).on("click", ".user-search-remove", function () {
        var userId = $(this).data('user-id');
        var userName = $(this).data('user-name');
        $(this).parent().remove();
      });
    });
  });

  // push shift