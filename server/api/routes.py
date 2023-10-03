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
            name=ns.payload['name'],
            email=ns.payload['email'],
            profile_picture=ns.payload['profile_picture'],    
            password_hash = ns.payload['password'],
            public_id = str(uuid.uuid4())
        )

       

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"mesage":"successfully added user"})

        
'''-----------------L O G I N -----------------------------'''
@ns.route('/login')
class Login(Resource):
    
    @ns.expect(login_input_model)
    def post(self):
        auth = request.authorization
        print(auth.name)
        print(auth.password)
       

        if not auth or not auth.password or not auth.username:
            return jsonify({"message":"could not verify"})
        
        user = User.query.filter_by(name = auth.username).first()
        if not user: 
             return jsonify({"message":"user not found"})
        
        if  user.authenticat(auth.password):
            token = jwt.encode(
            {'public_id':user.public_id, 
             'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=59)},
             app.config['SECRET_KEY']
             
              
               )
             
        
        return jsonify({"token":token})



# api.add_resource