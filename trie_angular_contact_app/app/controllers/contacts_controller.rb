class ContactsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:create, :update, :destroy]

  def index
    @contacts = Contact.all
    respond_to do |format|
      format.html
      format.json {render json: @contacts}
    end
  end

  def create
    contact_params = params.require(:contact).permit(:name, :cell, :home, :address)
    @contact = Contact.create(contact_params)
    respond_to do |format|
      format.json {render json: @contact}
    end
  end

  def update
    contact_params = params.require(:contact).permit(:name, :cell, :home, :address)
    @contact = Contact.find(params[:id])
    @contact.update(contact_params)
    respond_with Contact.update(params[:id], params[:contact])
  end

  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy
    respond_to do |format|
      format.json {render nothing: true}
    end
  end

end


