# json.array! @messages do |message|
#   json.id message.id
#   json.content message.content
#   json.image message.image
# end
json.content @message.content
json.image @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.name @message.user.name
