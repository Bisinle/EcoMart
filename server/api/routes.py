from api import  make_response,jsonify,Product,Vendor,Customer,User,app,db,request
from api.serialization import api,vendor_schema,vendors_schema, customer_schema, customers_schema, product_schema,user_schema,ns,Resource,user_model_input,users_schema,login_input_model
import uuid
from flask_jwt_extended import  jwt_required

# import jwt
# import datetime
# from functools import wraps

#pass the dictionary below to the to your name space whhe you instantiate it under the same name


# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token =None
#         if 'x-access-token' in request.headers:
#             token = request.headers['x-access-token']

#         if not token:
#             return jsonify({"message" : "Token is missing"})

#         try:
#             data= jwt.decode(token,app.config['SECRET_KEY'],algorithms=['HS256'])

#             current_user = User.query.filter_by(public_id= data['public_id']).first()
#         except:
#                 return jsonify({"message" : "Token is invalid"},401)
        

#         return f(current_user,*args, **kwargs)
#     return decorated

# @token_required 
# def  access_limit(instance):
#     if instance.roles=='Customer':
#         return jsonify({"message":"-------------------"})
@ns.route('/vendors')
class Vendors(Resource):
    method_decorators =[jwt_required()]

    
    @ns.doc(security ="jsonwebToken")
    def get(self):
        

        all_vendors = Vendor.query.all()

        if not all_vendors:
            return make_response(jsonify({"message":"no vendors found"}))
        
        
        return make_response(vendors_schema.dump(all_vendors),200)
    





@ns.route('/customers')
class CustomerS(Resource):
    def get(self):
        all_customers = Customer.query.all()
        return make_response(customers_schema.dump(all_customers),200)




@ns.route('/products')
class Products(Resource):
    def get(self):
        all_products = Product.query.all()
        return make_response(product_schema.dump(all_products),200)



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

        
# '''-----------------L O G I N -----------------------------'''
# @ns.route('/login')
# class Login(Resource):
    
#     @ns.expect(login_input_model)
#     def post(self):
#         if request.authorization:
#             auth = request.authorization
#             username=auth.username
#             password=auth.password
#         elif ns.payload:
#             data = ns.payload  # Access JSON data from the request body

#             username = data.get('username')
#             password = data.get('password')

#         if not username or not password:
#             return jsonify({"message": "Please provide both username and password"}), 400

#         user = User.query.filter_by(user_name=username).first()
#         if not user:
#              return jsonify({"message": "User not found"}), 404
        
#         if user.authenticate(password):
#             # Import these modules at the top of your script:
#             # import jwt
#             # import datetime
            
#             # Generate a JWT token
#             token = jwt.encode(
#                 {'public_id': user.public_id, 
#                  'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=59)},
#                  app.config['SECRET_KEY'])
            
#             return make_response(jsonify({"token": token}), 200)
        
#         return jsonify({"message": "Authentication failed"}), 401



# api.add_resource