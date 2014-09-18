Rails.application.routes.draw do


  resources :api_keys
  
  match 'backup_schedules', to: 'backup_schedules#options', via: [:options]
  match 'backup_schedules/:id', to: 'backup_schedules#options', via: [:options]
  resources :backup_schedules

  match 'logs', to: 'logs#options', via: [:options]
  match 'logs/:id', to: 'logs#options', via: [:options]
  resources :logs

  match 'devices', to: 'devices#options', via: [:options]
  match 'devices/:id', to: 'devices#options', via: [:options]
  resources :devices

  match 'permissions', to: 'permissions#options', via: [:options]
  match 'permissions/:id', to: 'permissions#options', via: [:options]
  resources :permissions

  match 'roles', to: 'roles#options', via: [:options]
  match 'roles/:id', to: 'roles#options', via: [:options]
  resources :roles

  match 'users', to: 'users#options', via: [:options]
  match 'users/:id', to: 'users#options', via: [:options]
  resources :users

  match 'locations', to: 'locations#options', via: [:options]
  match 'locations/:id', to: 'locations#options', via: [:options]
  resources :locations

  match 'session', to: 'session#options', via: [:options]
  post 'session' => 'session#create'
  
  match 'roles_to_permissions', to: 'roles_to_permissions#options', via: [:options]
  post 'roles_to_permissions' => 'roles_to_permissions#assign_rights'
  delete 'roles_to_permissions' => 'roles_to_permissions#destroy_all'
  resources :roles_to_permissions

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

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
