module Api
  module Auth
    class RegistrationsController < DeviseTokenAuth::RegistrationsController

      private
      # ストロングバラメーター
      def sign_up_params
        params.permit(:name, :email, :password, :password_confirmation)
      end

      def account_update_params
        params.permit(:name, :email, :password, :password_confirmation, :introduce, :age, :sex, :address)
      end

    end
  end
end
