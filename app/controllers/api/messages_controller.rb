class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json{ @new_messages = @messages.where('id > ?', params[:id]) }
    end
  end
  # 全体のグループをまず検索しておく
  # その後にgroupsのメッセージを取得 whereでidの数値が高い順に取得して
  # 最新のものを取得する
end