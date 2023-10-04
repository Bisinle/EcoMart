from api import  make_response,jsonify,Product,Vendor,Customer,User,app,db,request
from api.serialization import api,vendor_schema,vendors_schema, customer_schema, customers_schema, product_schema,user_schema,ns,Resource,user_model_input,users_schema,login_input_model
import uuid
import jwt
import datetime
from functools import wraps




def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token =None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({"message" : "Token is missing"})

        try:
            data= jwt.decode(token,app.config['SECRET_KEY'])

            current_user = User.query.filter_by(public_id= data['public_id']).first()
        except:
                return jsonify({"message" : "Token is invalid"},401)
        return f(current_user,*args, **kwargs)
    return decorated


@ns.route('/vendors')
class Vendors(Resource):

    def get(self):
        all_vendors = Vendor.query.all()

        if not all_vendors:
            return make_response(jsonify({"message":"no vendors found"}))
        
        return make_response(vendors_schema.dump(all_vendors),200)
    # # @ns.expect(vendor_model_input)
    # def post(self):
    #     data = request.get_json()
    #     print(data)
        # return jsonify(data)
    
@ns.route('/vendors/<id>')
class Vendoer_by_id(Resource):
    def put(self,id):
        # get the vendor
        vendor = Vendor.query.filter_by(id=id).first()
        if not vendor:
            return jsonify({"message":"vendor not found"})

        data = request.get_json()
        data['email'] = vendor.first_name+'@'+data['company'][:5]+'.com'
        for  attr in data:
            setattr(vendor, attr, data[attr])
        db.session.commit()

        # return jsonify(vendor_schema.dump(vendor),200)
        return jsonify({"message":" vendor updated successfully "},200)


    def delete(selft,id):
        vendor = Vendor.query.filter_by(id=id).first()

        if not vendor:
            return jsonify({"message":"vendor not found"})
        
        db.session.delete(vendor)
        db.session.commit()
        return jsonify({"Deleted":True,
                        "message":"vendor deleted successfully"})


        





@ns.route('/customers')
class CustomerS(Resource):
    def get(self):
        all_customers = Customer.query.all()
        return make_response(customers_schema.dump(all_customers),200)

@ns.route('/customer/<id>')
class customer_by_id(Resource):
    def put(self,id):
        # get the vendor
        customer = Customer.query.filter_by(id=id).first()
        if not customer:
            return jsonify({"message":"customer not found"})

        data = request.get_json()
        # data['email'] = customer.first_name+'@gmail.com'
        for  attr in data:
            setattr(customer, attr, data[attr])
        db.session.commit()

        return jsonify(customer_schema.dump(customer),200)
        # return jsonify({"message":" customer updated successfully "},200)


    def delete(selft,id):
        customer = Customer.query.filter_by(id=id).first()

        if not customer:
            return jsonify({"message":"customer not found"})
        
        db.session.delete(customer)
        db.session.commit()
        return jsonify({"Deleted":True,
                        "message":"customer deleted successfully"})



@ns.route('/products')
class Products(Resource):
    def get(self):
        all_products = Product.query.all()
        return make_response(product_schema.dump(all_products),200)

@ns.route('/product/<id>')
class product_by_id(Resource):
    def put(self,id):
        # get the vendor
        product = Product.query.filter_by(id=id).first()
        if not product:
            return jsonify({"message":"product not found"})

        data = request.get_json()
        # data['email'] = product.first_name+'@gmail.com'
        for  attr in data:
            setattr(product, attr, data[attr])
        db.session.commit()

        return jsonify(product_schema.dump(product),200)
        # return jsonify({"message":" product updated successfully "},200)


    def delete(selft,id):
        product = Product.query.filter_by(id=id).first()

        if not customer:
            return jsonify({"message":"product not found"})
        
        db.session.delete(product)
        db.session.commit()
        return jsonify({"Deleted":True,
                        "message":"product deleted successfully"})




# @ns.route('/users')
# class Users(Resource):
#     def get(self):
#         all_users = User.query.all()
#         return make_response(users_schema.dump(all_users),200)





'''-------- S I G N -------- U P ----------------------------'''

@ns.route('/signup')
class Signup (Resource):

    @ns.expect(user_model_input)
    def post(self):
        

        new_user = User(
            user_name=ns.payload['user_name'],
            profile_picture=ns.payload['profile_picture'],    
            password_hash = ns.payload['password'],
            public_id = str(uuid.uuid4()),
            roles=ns.payload['roles']

        )

       

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"mesage":"successfully added user"})

        
'''-----------------L O G I N -----------------------------'''
@ns.route('/login')
class Login(Resource):
    
    @ns.expect(login_input_model)
    def post(self):
        if request.authorization:
            auth = request.authorization
            username=auth.username
            password=auth.password
        elif ns.payload:
            data = ns.payload  # Access JSON data from the request body

            username = data.get('username')
            password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Please provide both username and password"}), 400

        user = User.query.filter_by(user_name=username).first()
        if not user:
             return jsonify({"message": "User not found"}), 404
        
        if user.authenticate(password):
            # Import these modules at the top of your script:
            # import jwt
            # import datetime
            
            # Generate a JWT token
            token = jwt.encode(
                {'public_id': user.public_id, 
                 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=59)},
                 app.config['SECRET_KEY'])
            
            return make_response(jsonify({"token": token}), 200)
        
        return jsonify({"message": "Authentication failed"}), 401


