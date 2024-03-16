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

  test 'should return unauthorized when token is invalid' do
    post '/api/v1/todos', headers: { 'Authorization' => "Bearer invalid_token" }, params: { title: 'New Todo', completed: false }

    assert_response :unauthorized
    assert_nil Todo.find_by(title: 'New Todo')
  end

  test 'should return forbidden if user tries to update other user\'s todo' do
    patch "/api/v1/todos/#{todos(:two).id}", headers: { 'Authorization' => "Bearer #{@token}" }, params: { completed: true }

    assert_response :forbidden
    assert_not Todo.find(todos(:two).id).completed
  end

  test 'should return forbidden if user tries to delete other user\'s todo' do
    delete "/api/v1/todos/#{todos(:two).id}", headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :forbidden
    assert_not_nil Todo.find_by(id: todos(:two).id)
  end
  test 'should not create todo with invalid parameters' do
    post '/api/v1/todos', headers: { 'Authorization' => "Bearer #{@token}" }, params: { completed: false }

    assert_response :unprocessable_entity
    assert_nil Todo.find_by(title: 'New Todo')
  end

  test 'should handle not found error gracefully' do
    get '/api/v1/todos/99999', headers: { 'Authorization' => "Bearer #{@token}" }

    assert_response :not_found
  end

  test 'should handle internal server error gracefully' do
    # 仮想的なエラーを発生させることで、500エラーをシミュレートする
    Todo.stub(:find, ->(_id) { raise StandardError.new }) do
      get "/api/v1/todos/#{@todo.id}", headers: { 'Authorization' => "Bearer #{@token}" }
      assert_response :internal_server_error
    end
  end

  # パフォーマンスのテスト
  test 'should handle large number of todos without performance degradation' do
    # 大量のToDoを生成して、応答時間が一定であることを確認する
    assert_performance_constant do |n|
      n.times do
        post '/api/v1/todos', headers: { 'Authorization' => "Bearer #{@token}" }, params: { title: 'New Todo', completed: false }
      end
    end
  end
end
