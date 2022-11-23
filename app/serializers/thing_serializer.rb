class ThingSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :position, :pinned, :created_at, :updated_at, :labels, :status, :images_url
end
