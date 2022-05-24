Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'stafflog/index'
      post 'stafflog/create'
      patch 'stafflog/:id', to: 'stafflog#update'
      delete 'stafflog/destroy/:id', to: 'stafflog#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
