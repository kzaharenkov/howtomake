class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @manual = Manual.includes(:user, :category).all
    @new_manuals = @manual.order(created_at: :desc).limit(6)
    @popular_manuals = @manual.order(manual_views_count: :desc).limit(6)
    @tags = @manual.tag_counts_on(:tags)
  end
end
