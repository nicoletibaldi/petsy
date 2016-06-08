class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login(@user)
      render "api/users/show"
    else
      render(
        json: {
          base: ['Invalid username/password combination'],
        },
        status: 401
      )
    end
  end

  def auth_create
    @user = User.find_or_create_by_auth_hash(auth_hash)

    if @user
      login(@user)
      redirect_to "/"
    else
      render(
        json: {
          base: ['Invalid username/password combination'],
        },
        status: 401
      )
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render "api/users/show"
    else
      render(
        json: {
          base: ['No user logged in!'],
        },
        status: 404
      )
    end
  end

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

end
