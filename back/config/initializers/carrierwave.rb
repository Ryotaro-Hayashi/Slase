# frozen_string_literal: true

require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.production?
    config.cache_storage = :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory = 'slase-photos'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: 'AKIAZ3BBQJWBZWHEWJMT',
      aws_secret_access_key: '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',
      region: 'ap-northeast-1',
      path_style: true
    }
  else
    config.asset_host = 'http://localhost:8000'
    config.storage :file
    config.enable_processing = false if Rails.env.test?
  end
end
