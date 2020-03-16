module Api
  module Auth
    class RegistrationsController < DeviseTokenAuth::RegistrationsController

      private
      # ストロングバラメーター
      def sign_up_params
        params.permit(:name, :email, :password, :password_confirmation, :introduce, :address)
      end

      def account_update_params
        params.permit(:name, :email, :password, :password_confirmation, :introduce, :address)
      end

    end
  end
end
