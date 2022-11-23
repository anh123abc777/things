class Thing < ApplicationRecord
    after_create :add_position
    include Rails.application.routes.url_helpers

    has_many_attached :images
    has_many :thing_belong_to_label, dependent: :destroy
    has_many :labels, through: :thing_belong_to_label
    enum status: {archived: "archived", trashed: "trashed", published: "published"}, _prefix: :status

    def images_url
        return unless self.images.attachments
        image_urls = self.images.map do |image| 
         
            { id: image.id, iamge_url: url_for(image)}
        end
        image_urls   
    end

    private
        def add_position
            self.position = self.id
        end

end
