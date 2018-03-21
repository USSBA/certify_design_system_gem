# frozen_string_literal: true

Dummy::Application.routes.draw do
  root to: 'pages#root'
  get '/fonts', to: 'pages#fonts'
  get '/list', to: 'pages#list', defaults: { format: :json }
end
