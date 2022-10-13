class AddPinnedToThings < ActiveRecord::Migration[7.0]
  def change
    add_column :things, :pinned, :boolean
  end
end
