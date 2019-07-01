class UsersController < ApplicationController

  def index
  end
  
  def edit
  end

  def update
    if current.user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
    
    private

    def user_params
      params.require(:user).parmit(:name,:email)
    end
end
