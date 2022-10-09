class Api::V1::LabelsController < ApplicationController
    before_action :set_label, only: %i[ show update destroy ]
    
    def index
        @labels = Label.all.order('created_at DESC')
        render json: @labels.to_json(include: {things: { include: :labels}})
    end

    def show
        render json: @label
    end
    
    def create
        @label = Label.new(label_params)
        if @label.save
            render json: @label, status: :created
        else
            render json: @label.errors, status: :unprocessable_entity
        end
    end

    def update
        if @label.update(label_params)
            render json: @label
        else
            render json: @label.errors, status: :unprocessable_entity            
        end
    end

    def destroy
        @label.destroy
    end

    private
        def label_params
            params.require(:label).permit(:name)
        end

    private
        def set_label
            @label = Label.find(params[:id])
        end
end
