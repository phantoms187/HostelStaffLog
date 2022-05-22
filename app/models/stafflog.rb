class Stafflog < ApplicationRecord
    validates :date, presence: true
    validates :subject, presence: true
    validates :message, presence: true
end
