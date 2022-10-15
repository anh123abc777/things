class LabelSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :things , serializer: ThingSerializer

end
  