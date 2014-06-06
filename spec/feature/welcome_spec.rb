require 'spec_helper'

feature 'homepage' do

  scenario 'user can see game name on homepage' do
    visit root_path
    expect(page).to have_content 'Fast food guesser'
  end
end