class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken

        # deviseコントローラーにストロングパラメータを追加する
        before_action :configure_permitted_parameters, if: :devise_controller?

        protected
        def configure_permitted_parameters
          # サインアップ時にnameのストロングパラメータを追加
          devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
        end
end
