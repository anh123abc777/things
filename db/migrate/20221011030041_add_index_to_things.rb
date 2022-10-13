class AddIndexToThings < ActiveRecord::Migration[7.0]
  def change
    add_index :things, :status
  end
end
