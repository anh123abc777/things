class AddPositionToThings < ActiveRecord::Migration[7.0]
  def change
    add_column :things, :position, :integer
  end
end
