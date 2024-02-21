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
end

