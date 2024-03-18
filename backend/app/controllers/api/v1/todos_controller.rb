class Api::V1::TodosController < ApplicationController
    before_action :set_todo, only: [:update, :destroy]
  
    def index
      @todos = Todo.all
      render json: @todos
    end
  
    def create
      @todo = Todo.new(todo_params)
    
      if @todo.save
        render json: @todo, status: :created, location: api_v1_todo_url(@todo)
      else
        render json: @todo.errors, status: :unprocessable_entity
      end
    end
    
  
    def update
      if @todo.update(todo_params)
        render json: @todo
      else
        render json: @todo.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      if @todo.destroy
        render json: { message: "Todo was successfully destroyed." }, status: :ok
      else
        render json: { error: "Failed to destroy todo." }, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_todo
      @todo = Todo.find(params[:id])
    end
  
    def todo_params
      params.require(:todo).permit(:title, :completed)
    end
  end