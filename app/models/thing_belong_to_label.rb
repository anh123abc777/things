class ThingBelongToLabel < ApplicationRecord
  belongs_to :thing
  belongs_to :label
end
