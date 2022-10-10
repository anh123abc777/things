class Api::V1::ThingsController < ApplicationController
  before_action :set_thing, only: %i[ show update destroy labelToThing]

  # GET /things
  def index
    @things = Thing.all.order('created_at')
   
    render json: @things.to_json(include: :labels)
  end

  # GET /things/1
  def show
    render json: @thing.to_json(include: :labels)
  end

  def new
    @thing = Thing.new()
    render json: @thing
  end

  # POST /things
  def create
    @thing = Thing.new(thing_params)

    if @thing.save
      render json: @thing.to_json(include: :labels), status: :created
    else
      render json: @thing.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /things/1
  def update
    if @thing.update(thing_params)
      render json: @thing
    else
      render json: @thing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /things/1
  def destroy
    @thing.destroy
  end

  def labelToThing
    @labels = Label.find(params[:list_id])
    @thing.labels = @labels
    render json: @thing.to_json(include: :labels)
  end

  private
    def set_thing
      @thing = Thing.find(params[:id])
    end

    def thing_params
      params.require(:thing).permit(:title, :body)
    end
end
