class Label < ApplicationRecord
    has_many :thing_belong_to_label, dependent: :destroy
    has_many :things, through: :thing_belong_to_label
end
