class Thing < ApplicationRecord
    include Rails.application.routes.url_helpers

    has_many_attached :images
    has_many :thing_belong_to_label, dependent: :destroy
    has_many :labels, through: :thing_belong_to_label
    enum status: {archived: "archived", trashed: "trashed", published: "published"}, _prefix: :status

    def images_url
        return unless self.images.attachments
        image_urls = self.images.map do |image| 
         
            url_for(image)
        end
        image_urls   
     end

end
