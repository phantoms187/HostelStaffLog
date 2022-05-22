class CreateStafflogs < ActiveRecord::Migration[5.2]
  def change
    create_table :stafflogs do |t|
      t.string :date, null: false
      t.text :subject, null: false
      t.text :message, null: false

      t.timestamps
    end
  end
end
