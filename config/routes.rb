Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :create, :destroy, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update ] do
    resources :messages, only: [:index, :create]
    
  end
end

# 自分のファイルに行きたい時はmessage#index
