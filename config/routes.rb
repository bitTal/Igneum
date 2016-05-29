Rails.application.routes.draw do

  #namespace :backoffice do
   # resources :users
  #end

  resources :fires
  
  get 'welcome/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'


  get 'month', to: 'welcome#month'
  get 'compare', to: 'welcome#compare'
  
  # get "/backoffice/users", to: redirect('/auth/google_oauth2')

  #resources :backoffice
  get 'backoffice', to: 'backoffice#index'
  #get 'backoffice/edit', to: redirect('/')
  get 'backoffice/edit', to: 'backoffice#edit'
  get 'backoffice/add_fire', to: 'backoffice#add_fire'
  post 'backoffice/add_fire', to: 'backoffice#create_fire'

  get "/auth/google_oauth2/callback", to: 'backoffice#googleAuth'
  get 'auth/failure', to: redirect('/')

  get 'backoffice/show_delete', to: 'backoffice#show_delete'
  post 'backoffice/show_delete', to: 'backoffice#delete_fire'


  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
