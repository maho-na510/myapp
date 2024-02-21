require 'test_helper'

class TodoTest < ActiveSupport::TestCase
  test "should not save todo without title" do
    todo = todos(:valid_todo)
    todo.title = nil
    assert_not todo.save, "Saved the todo without a title"
  end

  test "should save todo with valid attributes" do
    todo = todos(:valid_todo)
    assert todo.save, "Failed to save the todo with valid attributes"
  end

end