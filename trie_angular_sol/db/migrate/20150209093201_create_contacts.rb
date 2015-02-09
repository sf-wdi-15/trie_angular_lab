class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :home
      t.string :cell
      t.string :address

      t.timestamps null: false
    end
  end
end
