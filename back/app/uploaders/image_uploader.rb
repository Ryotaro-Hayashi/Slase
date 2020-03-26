class ImageUploader < CarrierWave::Uploader::Base
  
  if Rails.env.development?
    storage :file
  elsif Rails.env.test?
    storage :file
  else
    storage :fog
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # 許可する画像の拡張子
  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  # 変換したファイルのファイル名の規則
  def filename
    original_filename if original_filename

    # if original_filename.present?
    #   "#{Time.zone.now.strftime('%Y%m%d%H%M%S')}.jpg"
    # end
  end

end
