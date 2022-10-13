class AddStatusToThings < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      CREATE TYPE thing_status AS ENUM ('archived', 'trashed', 'published');
      SQL
      add_column :things, :status, :thing_status
  end

  # def down 
  #   remove_column :things, :status
  #   execute <<-SQL
  #     DROP TYPE thing_status;
  #   SQL
  # end
end
