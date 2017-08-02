module ManualsHelper
  include ActsAsTaggableOn::TagsHelper

  def manual_data(manual)
    { manual_id: manual.id, pages: manual.pages, current_page: 0, edit_mode: false }
  end

  def tags_list(tags)
    tags.map(&:inspect).join(', ').gsub('"', '')
  end
end
