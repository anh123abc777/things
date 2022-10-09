class CreateThingBelongToLabels < ActiveRecord::Migration[7.0]
  def change
    create_table :thing_belong_to_labels do |t|
      t.references :thing, null: false, foreign_key: true
      t.references :label, null: false, foreign_key: true

      t.timestamps
    end
  end
end
