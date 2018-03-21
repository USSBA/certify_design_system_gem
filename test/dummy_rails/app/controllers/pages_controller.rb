# frozen_string_literal: true

class PagesController < ApplicationController
  def root; end

  def fonts; end

  def list
    @asset_list = Rails.application.assets.each_file.map do |f|
      File.basename f
    end
    respond_to do |format|
      format.json { render json: @asset_list }
      format.text { render json: @asset_list }
    end
  end
end
