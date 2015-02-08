class ContactsController < ApplicationController
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
    contact_params = params.require(:todo).permit(:name, :cell, :home, :address)
    @contact = Contact.find(params[:id])
    @contact.update(contact_params)
    respond_to do |format|
      format.json {render json: @contact}
    end
  end

end


