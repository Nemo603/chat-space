Rails.application.routes.draw do
  devise_for :users
  root 'message#index'
  get 'groups/edit'
  patch 'groups/update'

  resources :users, only: [:index, :edit, :update] 
  resources :groups, only: [:new, :create, :edit, :update ] do
    resources :messages, only: [:index, :create]
  end
end

# 自分のファイルに行きたい時はmessage#index
