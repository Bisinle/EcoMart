from flask import Flask,request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api,Resource
from models import Vendor,Customer,Product
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///online.market.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)

class Home(Resource):
     def get(self):
        
        response_dict = {
            "message": "Welcome to our Online Marketing services",
        }
        
        response = make_response(
            response_dict,
            200
        )

        return response
api.add_resource(Home, '/')

#create class Vendor
class VendorList(Resource):

    def get(self):
        #create an empty list
        vendors=[]
        #loop through the class TO GET all that is in the class
        for vendor in Vendor.query.all():
            vendor_dict={
                "id":vendor.id,
                "name":vendor.name,
                "company" :vendor.company, # Corrected column name
                "phone_number": vendor.phonenumber,
                "email": vendor.email

                
            }
            #The restaurant list will append the restaurant_dict
            vendors.append(vendor_dict)
        response=make_response(jsonify(vendors),200)
        return response
        

        #we addd the class to the resource plus its url
api.add_resource(VendorList, '/vendors')

class VendorAdd(Resource):
    def post(self):
        data = request.get_json()

        if not all(key in data for key in ("name", "company", "phone_number","email")):
            return {"errors": ["Validation errors: Include all required keys"]}, 400

        name = data["name"]
        company= data["company"]
        phone_number = data["phone_number"]
        email=data["email"]

        new_vendor=Vendor(name=name,company=company,phone_number=phone_number,email=email)
        db.session.add(new_vendor)
        db.session.commit()

        vendor_data = {
            "id": new_vendor.id,
            "name":new_vendor.name,
            "company": new_vendor.company,
            "phone_number":new_vendor.phone_number,
            "email":new_vendor.email
        }

        return vendor_data, 201

api.add_resource(VendorAdd, '/vendors/add')


class UpdateVendor(Resource):
    def patch(self,vendor_id):

        data = request.get_json()
        vendor = Vendor.query.get(vendor_id)

        if not vendor:
            return {"error": "Vendor not found"}, 404

        if "name" in data:
            vendor.name = data["name"]
        if "company" in data:
            vendor.company = data["company"]
        if "phone_number" in data:
            vendor.phone_number = data["phone_number"]

        db.session.commit()

        vendor_data = {
            "id": vendor.id,
            "name":vendor.name,
            "company": vendor.company,
            "phone_number":vendor.phone_number
        }
        return vendor_data
api.add_resource(UpdateVendor, '/vendors/update')


class VendorById(Resource):
    def get(self, id):
        #Get each restaurant by its id
        vendor = Vendor.query.get(id)  
        if vendor:
            vendor_dict = {
                 "id":vendor.id,
                "name":vendor.name,
                "company" :vendor.company, # Corrected column name
                "phone_number": vendor.phonenumber,
                "email": vendor.email

                
            }
            response = make_response(jsonify(vendor_dict), 200)
        else:
            response = make_response(jsonify({"error": "Vendor not found"}), 404)
        #The return should be outside not inside
        return response
    def delete(self, id):
        #Get the vendor by id
        vendor = Vendor.query.get(id)  

        if vendor:
            db.session.delete(vendor)
            db.session.commit()
            response = make_response(jsonify({"message": "Vendor successfully deleted"}), 204)
        else:
            response = make_response(jsonify({"error": "Vendor not found"}), 404)

        return response

# Add the class plus its URL to the resources
api.add_resource(VendorById, '/vendors/<int:id>')

########################################################################################################################################################################################################################################################################################################


# creating CRUD for the customer class
class CustomerList(Resource):

    def get(self):
        #create an empty list
        customers=[]
        #loop through the class TO GET all that is in the class
        for customer in Customer.query.all():
            customer_dict={
                "id":customer.id,
                "name":customer.name,
               
                "phone_number":customer.phonenumber,
                "email":customer.email

                
            }
            #The customer list will append the restaurant_dict
            customers.append(customer_dict)
        response=make_response(jsonify(customers),200)
        return response
        

        #we addd the class to the resource plus its url
api.add_resource(CustomerList, '/customers')


class AddCustomer(Resource):
    def post(self):
        data = request.get_json()

        if not all(key in data for key in ("name", "phone_number","email")):
            return {"errors": ["Validation errors: Include all required keys"]}, 400

        name = data["name"]
        email= data["email"]
        phone_number = data["phone_number"]

        new_customer=Vendor(name=name,phone_number=phone_number,email=email)
        db.session.add(new_customer)
        db.session.commit()

        customer_data = {
            "id": new_customer.id,
            "name": new_customer.name,
            "email": new_customer.company,
            "phone_number":new_customer.phone_number
        }

        return customer_data, 201
    
api.add_resource(AddCustomer, '/add/customer')

class UpdateCustomer(Resource):
    def patch(self,customer_id):

        data = request.get_json()
        customer = Customer.query.get(customer_id)

        if not customer:
            return {"error": "Customer not found"}, 404

        if "name" in data:
            customer.name = data["name"]
        if "email" in data:
            customer.company = data["email"]
        if "phone_number" in data:
            customer.phone_number = data["phone_number"]

        db.session.commit()

        customer_data = {
            "id": customer.id,
            "name":customer.name,
            "email": customer.email,
            "phone_number":customer.phone_number
        }
        return customer_data
api.add_resource(UpdateCustomer, '/customers/update')




class CustomerById(Resource):
    def get(self, id):
        #Get each restaurant by its id
        customer = Customer.query.get(id)  
        if customer:
            customer_dict = {
                 "id":customer.id,
                "name":customer.name,
                "phone_number": customer.phonenumber,
                "email":customer.email
            }
            response = make_response(jsonify(customer_dict), 200)
        else:
            response = make_response(jsonify({"error": "Vendor not found"}), 404)
        #The return should be outside not inside
        return response
    def delete(self, id):
        #Get the vendor by id
        customer = Customer.query.get(id)  
        if customer:
            db.session.delete(customer)
            db.session.commit()
            response = make_response(jsonify({"message": "Customer successfully deleted"}), 204)
        else:
            response = make_response(jsonify({"error": "Customer not found"}), 404)

        return response

# Add the class plus its URL to the resources
api.add_resource(CustomerById, '/customers/<int:id>')


#################################################################################################################################################################################################

# create a CRUD for Product class
class ProductList(Resource):

    def get(self):
        #create an empty list
        products=[]
        #loop through the class TO GET all that is in the class
        for product in Product.query.all():
            product_dict={
                "id":product.id,
                "prod_name":product.prod_name,
                "prod_description":product.description,
                "image":product.image,
                "price":product.price,
                "quantity":product.quantity,
                "category":product.category
            }
            #The customer list will append the restaurant_dict
            products.append(product_dict)
        response=make_response(jsonify(products),200)
        return response
        

        #we addd the class to the resource plus its url
api.add_resource(ProductList, '/products')



class PostProduct(Resource):
    def post(self):
        data = request.get_json()

        if not all(key in data for key in ("prod_name", "prod_description","image","price","quantity","category","")):
            return {"errors": ["Validation errors: Include all required keys"]}, 400

        prod_name = data["prod_name"]
        prod_description= data[" prod_description"]
        image= data["image"]
        price= data["price"]
        quantity= data["quantity"]
        category= data["category"]


        new_product=Product(prod_name=prod_name,prod_description=prod_description,image=image,price=price,quantity=quantity,category=category)
        db.session.add(new_product)
        db.session.commit()

        product_data={
                "id":new_product.id,
                "prod_name":new_product.prod_name,
                "prod_description":new_product.description,
                "image":new_product.image,
                "price":new_product.price,
                "quantity":new_product.quantity,
                "category":new_product.category
            }

       
        return product_data, 201
    
api.add_resource(PostProduct, '/post/product')

class UpdateProduct(Resource):
    def patch(self,product_id):

        data = request.get_json()
        product = Product.query.get(product_id)

        if not product:
            return {"error": "Product not found"}, 404

        if "prod_name" in data:
            product.name = data["prod_name"]
        if " prod_description" in data:
            product.company = data[" prod_description"]
        if "image" in data:
            product.phone_number = data["image"]
        if "price" in data:
            product.name = data["price"]
        if "quantity" in data:
            product.company = data["quantity"]
        if " category" in data:
            product.phone_number = data[" category"]

        db.session.commit()
        product_data={
                "id":product.id,
                "prod_name":product.prod_name,
                "prod_description":product.description,
                "image":product.image,
                "price":product.price,
                "quantity":product.quantity,
                "category":product.category
            }

       
        return product_data
api.add_resource(UpdateProduct, '/update/product')


class ProductById(Resource):
    def get(self, id):
        #Get each restaurant by its id
        product = Product.query.get(id)  
        if product:
            product_dict={
                "id":product.id,
                "prod_name":product.prod_name,
                "prod_description":product.description,
                "image":product.image,
                "price":product.price,
                "quantity":product.quantity,
                "category":product.category
            }
           
            response = make_response(jsonify(product_dict), 200)
        else:
            response = make_response(jsonify({"error": "Vendor not found"}), 404)
        #The return should be outside not inside
        return response
    def delete(self, id):
        #Get the product by id
        product= Product.query.get(id)  
        if product:
            db.session.delete(product)
            db.session.commit()
            response = make_response(jsonify({"message": "Product successfully deleted"}), 204)
        else:
            response = make_response(jsonify({"error": "Product not found"}), 404)

        return response

# Add the class plus its URL to the resources
api.add_resource(ProductById, '/product/<int:id>')



