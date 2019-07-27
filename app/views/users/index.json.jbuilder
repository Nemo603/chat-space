json.array! @users do |user|
  json.id user.id
  json.name user.name
end

# 配列オブジェクトとしてuserの情報を出してきて
# user.idと user.nameをjson 様に設定する