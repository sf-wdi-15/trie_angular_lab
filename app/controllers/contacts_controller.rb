class ContactsController < ApplicationController
  def index
      @contacts = Contact.all
      respond_to do |f|
        f.html
        f.json { render json: @contacts, status: 200}
      end
  end

  def create
      @contact = Contact.new(contact_params)
      if @contact.save
         respond_to do |f|
          f.json { render json: @contact, status: 201 }
        end
      else
        respond_to do |f|
          f.json {render nothing: true, status: 422 }
        end
      end
  end

  def update
      @contact = Contact.find_by({id: params[:id]})
      if @contact.try(:update, contact_params)
         respond_to do |f|
          f.json { render nothing: @contact, status: 200 }
        end
      else
        respond_to do |f|
          f.json { render nothing: true, status: 422 }
        end
      end
  end

  def destroy
      @contact = Contact.find_by({id: params[:id]})
      if @contact.try(:destroy)
        respond_to do |f|
          f.json { render nothing: true, status: 200 }
        end
      else
        respond_to do |f|
          f.json { render nothing: true, status: 422 }
        end
      end
  end


      private
          def contact_params
              params.require(:contact).permit(:name, :cell, :home, :address)
          end
end
