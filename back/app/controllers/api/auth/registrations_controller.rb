module Api
  module Auth
    class RegistrationsController < DeviseTokenAuth::RegistrationsController

      private
      # ストロングバラメーター
      def sign_up_params
        params.permit(:name, :email, :password, :password_confirmation)
      end

      # def account_update_params
      #   params.permit(:name, :email, :avatar)
      # end

      # def configure_account_update_params
      #   devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :avatar, :avatar_cache, :remove_avatar])
      # end

    end
  end
end
