class Thing < ApplicationRecord
    has_many :thing_belong_to_label, dependent: :destroy
    has_many :labels, through: :thing_belong_to_label
end
