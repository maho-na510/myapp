require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should not save user without email" do
    user = users(:valid_user)
    user.email = nil
    assert_not user.save, "Saved the user without an email"
  end

  test "should not save user with invalid email format" do
    user = users(:valid_user)
    user.email = "invalidemail"
    assert_not user.save, "Saved the user with an invalid email format"
  end

end
