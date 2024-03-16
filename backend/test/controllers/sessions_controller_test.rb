require 'test_helper'

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should return token when valid credentials provided' do
    user = users(:one) # Fixtureからユーザーを取得

    post '/api/v1/login', params: { email: user.email, password: 'password' }

    assert_response :success
    assert_not_nil response.parsed_body['token']
  end

  test 'should return error when invalid credentials provided' do
    post '/api/v1/login', params: { email: 'invalid_email@example.com', password: 'invalid_password' }

    assert_response :unauthorized
    assert_equal 'Invalid email or password', response.parsed_body['error']
  end

  test 'should return error when user attempts to logout without being logged in' do
    delete '/api/v1/logout'

    assert_response :unauthorized
    assert_equal 'You need to log in first', response.parsed_body['error']
  end

  test 'should handle expired token gracefully' do
    user = users(:one)
    expired_token = JWT.encode({ user_id: user.id, exp: Time.now.to_i - 3600 }, Rails.application.secrets.secret_key_base)
    delete '/api/v1/logout', headers: { 'Authorization' => "Bearer #{expired_token}" }

    assert_response :unauthorized
    assert_equal 'Your session has expired, please log in again', response.parsed_body['error']
  end

  test 'should return error when user provides invalid email format' do
    post '/api/v1/login', params: { email: 'invalid_email_format', password: 'password' }

    assert_response :unprocessable_entity
    assert_equal 'Invalid email format', response.parsed_body['error']
  end

  test 'should return error when user provides empty password' do
    post '/api/v1/login', params: { email: 'valid_email@example.com', password: '' }

    assert_response :unprocessable_entity
    assert_equal "Password can't be blank", response.parsed_body['error']
  end
end