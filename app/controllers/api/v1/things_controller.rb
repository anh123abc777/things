class Api::V1::ThingsController < ApplicationController
  before_action :set_thing, only: %i[ show update destroy labelToThing archive]

  # GET /things
  def index
    @things = Thing.status_published.order('position')
    # things = []
    # @things.each do |thing|
    #   things.push(ThingSerializer.new(thing).serializable_hash[:data][:attributes])
    # end
    render json: @things
  end

  # GET /archived/things
  def archived
    @things = Thing.status_archived.order('created_at')

    render json: @things
  end

  def archive
    @thing.status_archived!
    
    render json: @thing
  end

  # GET /things/1
  def show
    render json: @thing
  end

  def new
    @thing = Thing.new()
    render json: @thing
  end

  # POST /things
  def create
    @thing = Thing.new(thing_params)
    @thing.status_published!
    if @thing.save
      render json: @thing, status: :created
    else
      render json: @thing.errors, status: :unprocessable_entity
    end

  end

  # PATCH/PUT /things/1
  def update
    if @thing.update(thing_params)
      @thing.images.attach(params[:images])
      render json: @thing
    else
      render json: @thing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /things/1
  def destroy
    @thing.status_trashed!
  end

  def labelToThing
    @labels = Label.find(params[:list_id])
    @thing.labels = @labels
    render json: @thing.to_json(include: :labels)
  end

  def delete_image_attachment
    @image = ActiveStorage::Attachment.find(params[:id])
    @image.purge
  end

  private
    def set_thing
      @thing = Thing.find(params[:id])
    end

    def thing_params
      params.require(:thing).permit(:title, :body, :status, images: [])
    end
end
