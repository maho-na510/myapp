require 'test_helper'

class Api::V1::TodosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one) # Fixtureからユーザーを取得
    @token = encode_token(user_id: @user.id) # 仮想のトークンを生成
    @todo = todos(:one) # FixtureからToDoを取得
  end

  test 'should create todo when authenticated' do
    post '/api/v1/todos', headers: { 'Authorization' => "Bearer #{@token}" }, params: { title: 'New Todo', completed: false }

    assert_response :success
    assert_not_nil Todo.find_by(title: 'New Todo')
  end

  test 'should not create todo when not authenticated' do
    post '/api/v1/todos', params: { title: 'New Todo', completed: false }

    assert_response :unauthorized
    assert_nil Todo.find_by(title: 'New Todo')
  end

  test 'should update todo when authenticated' do
    patch "/api/v1/todos/#{@todo.id}", headers: { 'Authorization' => "Bearer #{@token}" }, params: { completed: true }

    assert_response :success
    assert Todo.find(@todo.id).completed
  end

  test 'should not update todo when not authenticated' do
    patch "/api/v1/todos/#{@todo.id}", params: { completed: true }

    assert_response :unauthorized
    assert_not Todo.find(@todo.id).completed
  end

  test 'should delete todo when authenticated' do
    delete "/api/v1/todos/#{@todo.id}", headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :success
    assert_nil Todo.find_by(id: @todo.id)
  end

  test 'should not delete todo when not authenticated' do
    delete "/api/v1/todos/#{@todo.id}"

    assert_response :unauthorized
    assert_not_nil Todo.find_by(id: @todo.id)
  end
end
