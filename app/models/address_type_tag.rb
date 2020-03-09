# frozen_string_literal: true

# == Schema Information
#
# Table name: address_type_tags
#
#  id           :bigint           not null, primary key
#  address      :string           not null
#  name         :string
#  data         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  address_type :string
#
class AddressTypeTag < ApplicationRecord
  validates :address, :address_type, presence: true

end
