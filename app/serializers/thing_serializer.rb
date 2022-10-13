class ThingSerializer 
  include JSONAPI::Serializer
  attributes :id, :title, :body, :pinned, :created_at, :updated_at, :labels, :status, :images_url
end
