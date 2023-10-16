from api import  make_response,jsonify,Product,Vendor,Customer,User,Order,Category,app,db,request
from api.serialization import api,vendor_schema,vendors_schema, customer_schema,users_schema,order_model_input
from api.serialization import order_schema,orders_schema, customers_schema, product_schema,category_schema
from api.serialization import user_schema,ns,auth,Resource,user_model_input,login_input_model,vendor_model_update
from api.serialization import vendor_model_input,post_user
import uuid

from faker import Faker
import random 
from random import randint, choice as rc
fake = Faker()

import jwt
from functools import wraps

from flask_jwt_extended import JWTManager,jwt_required
from flask_jwt_extended import create_refresh_token,create_access_token, get_jwt_identity
# from flask_jwt_extended import get_jwt_claims

jwt = JWTManager(app)



# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token =None
#         if 'x-access-token' in request.headers:
#             token = request.headers['x-access-token']
#             # print(token)

#         if not token:
#             return jsonify({"message" : "Token is missing"})

#         try:
#             print('------------------------------------------------')
#             data= jwt.decode(token,app.config['SECRET_KEY'],algorithms=['HS256'])
#             # print(data)

#             current_user = User.query.filter_by(public_id= data['public_id']).first()
#             print(current_user)

#             if not current_user:
#                 return jsonify({"message" : "something went wrong"})


#         except:
#                 return jsonify({"message" : "Token is invalid"},401)
#         return f(current_user,*args, **kwargs)
#     return decorated


@ns.route('/vendors')
class Vendors(Resource):
    # @token_required
    # @jwt_required()
    def get(self):
        # current_user = get_jwt_identity()
        # return jsonify(logged_in_as=current_user), 200

        # if  current_user.roles !='Admin':
        #     return jsonify({"message":"only Admins are allowed to access  this "})
        all_vendors = Vendor.query.all()

        if not all_vendors:
            return make_response(jsonify({"message":"no vendors found"}))
        
        return make_response(vendors_schema.dump(all_vendors),200)
    
    @ns.expect(vendor_model_input)
    # @token_required
    @jwt_required()
    def post(current_user,self):
        data = request.get_json()
        print(data)
        # if current_user.roles !='Admin':
        #     return jsonify({"message":"only admins can perform this task "})
        email=data['first_name']+'@' + data['company'][:4]+'.com'
        vendor =Vendor(
            first_name=data['first_name'],
            last_name=data['last_name'],
            company=data['company'],
            email=email,
            phone_number=data['phone_number'],
            user_id=current_user.id
             
         )
        db.session.add(vendor)
        db.session.commit()
        return jsonify({"message":" vendor created successfully "},vendor_schema.dump(vendor))

''' ___________________T O K E N _____________D E C O R A T O R         '''

@ns.route('/vendor')
class Vendoer_by_id(Resource):

    @jwt_required()
    def get(self):
        current_user= get_jwt_identity()
        vendor= Vendor.query.all()
    
        return jsonify(vendors_schema.dump(vendor))



    @ns.expect(vendor_model_update)
    @jwt_required()
    def put(self):
        current_user= get_jwt_identity()
        print(current_user)
        # get the user from and check the role
        user = User.query.filter_by(id=current_user).first()
        # if not user or user.roles !='Admin':
        #     return jsonify({"Access":" DENIED !!"        ,
        #                     "message":"only Admins can perform this action"})
        
        # print(user)

        data = request.get_json()
        # find the vendor using the id in the request
        vendor = Vendor.query.filter_by(id=data['id']).first()
        
        
        print('----------------------------------------------------------------')
        data['email'] = vendor.first_name+'@'+data['company'][:5]+'.com'
          
  
        vendor.company=data['company']
        vendor.email=data['email']
        vendor.phone_number=data['phone_number']
      
        # for attr in data:
        #     setattr(vendor, attr,data[attr])

        # db.session.add(vendor_update)
        db.session.commit()
        print(vendor)
        return jsonify(vendor_schema.dump(vendor),200)
        # # # return jsonify({"message":" vendor updated successfully "},200)
        # # return jsonify({"message":" vendor updated successfully "})

    @jwt_required()
    def delete(selft):
        current_user= get_jwt_identity()
        # print(current_user)

        vendor = Vendor.query.filter_by(user_id=current_user).first()
        # print(vendor)

        if not vendor:
            return jsonify({"message":"vendor not found"})
        
        db.session.delete(vendor)
        db.session.commit()


        '''------------delete from the user table as well ----------------'''
        user = User.query.filter_by(id=current_user).first()
        db.session.delete(user)
        db.session.commit()
        return jsonify({"Deleted":True,
                        "message":"vendor deleted successfully"})



''' ___________________C U S T O M E R S __________________________ R O U T E S        '''

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




''' ___________________O R D E R S__________________________ R O U T E S        '''

@ns.route('/orders')
class Orders(Resource):
    # @jwt_required(refresh=True)
    def get(self):
        orders = Order.query.all()

        if not orders:
            return jsonify({"message":"NO in the database"})
        
        return make_response(orders_schema.dump(orders))

    @ns.expect(order_model_input)
    def post(self):
        data = request.get_json()
        # if not data:
        #     return jsonify({"message":"you have not submitted an order"})

        order_list =[]
        if type(data) is list:
            for order in data:
                order = Order(
                customer_id = order['customer_id'],
                product_id = order['product_id'],
                item_price=order['item_price'],
                item_quantity=order['item_quantity'],
                address=order['address'],
                amount = int(order['item_price']) * int(order['item_quantity'])
            )
                order_list.append(order)
        db.session.add_all(order_list)
        db.session.commit()
        if type(data) is dict:
                 order = Order(
                customer_id = data['customer_id'],
                product_id = data['product_id'],

                item_price=data['item_price'],
                item_quantity=data['item_quantity'],
                address=data['address'],
                amount = int(data['item_price']) * int(data['item_quantity'])
            )
        db.session.add(order)
        db.session.commit()

        return jsonify({"message":"Order has been placed successfully "})
        


 




''' ___________________P R O D U C T S___________________________ R O U T E S        '''

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

        if not product:
            return jsonify({"message":"product not found"})
        
        db.session.delete(product)
        db.session.commit()
        return jsonify({"Deleted":True,
                        "message":"product deleted successfully"})




'''-----------------------------C A T E G O R I E S ---------------------'''
@ns.route('/categories')
class Categories(Resource):
    def get(self):
        categories = Category.query.all()

        if not categories:
            return jsonify({"message":"NO in the database"})
        
        return make_response((category_schema.dump(categories)))





@ns.route('/users')
class Users(Resource):
    def get(self):
        all_users = User.query.all()
        return make_response(users_schema.dump(all_users),200)





'''-------- S I G N -------- U P ----------------------------'''


@auth.route('/signup')
class Signup (Resource):

    @ns.expect(user_model_input)
    @ns.marshal_with(post_user)
    def post(self):
      
        data =request.get_json()
        print(data)
    
        
        data = request.get_json()
      
        new_user = User(
            user_name=data['user_name'],
            profile_picture=data['profile_picture'],    
            password_hash = data['password'],
            public_id = str(uuid.uuid4()),
            roles=data['roles']

        )
        

       

        db.session.add(new_user)
        db.session.commit()
        
        code =['+254','+256','+252','+251']
        if new_user.roles =='Vendor':
            company = fake.company()
    
            vendor = Vendor(            
            first_name=new_user.user_name,
            last_name = fake.last_name(),
            company=company,
            phone_number=str(rc(code)) +'7'+ str(random.randint(111111111,9999999999)),
            email=new_user.user_name+'@' + company[:4]+'.com',
            user_id = new_user.id

            )
            db.session.add(vendor)
            db.session.commit()

        if new_user.roles =='Customer':
                       
       
            customer = Customer(
                
            first_name=new_user.user_name,
            last_name=fake.last_name(),
            phone_number=str(rc(code)) +'7'+ str(random.randint(111111111,9999999999)),
            email=new_user.user_name+'@gmail.com',
            user_id = new_user.id
            )
            
            db.session.add(customer)
            db.session.commit()
        print('-----------------------------------------------')

        print(new_user)

        return new_user,200

        
'''-----------------L O G I N -----------------------------'''

'''___userObject for the login toke____
class UserObject:
    def __init__(self,user_id, user_name,user_role):
        self.user_id = user_id
        self.user_name = user_name
        self.user_role = user_role
      

    
    def __repr__(self):
        return f'(id: {self.user_id}, user_name: {self.user_name}, roles: {self.user_role}'


# ---------------we define what custom claims we are adding to the token------------------------
@jwt.user_lookup_loader
def add_claims_to_access_token(user):
    return {"user_id": user.user_id,
            "user_name":user.user_name,
            "user_role":user.user_role,}


# -------------we defin which one of the custom claims will be the token identity------------------
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user

    '''
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@auth.route('/login')
class Login(Resource):
    def post(self):
        print('---------------------------')
        print(request.get_json())
        username = request.get_json().get("username",None)
        password = request.get_json().get("password",None)


        if not username and not password:
            return jsonify({"msg": "Bad username or password"})
        
        user = User.query.filter_by(user_name=username).first()
        print(user)
    
        print('----------------------------------------')    
        if not user:
            return jsonify({"message": "User not found"})
        print(user)
        # user_claims= UserObject( user_id=user.id ,user_name=user.user_name,user_role=user.roles)
        # print(user_claims)
     
     
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        return jsonify({
            "access_token": access_token,
            "refresh_token":refresh_token,
            "user_id":user.id,
            "user_name":user.user_name,
            "user_role":user.roles,
            "user_profile_pic":user.profile_picture

            

        })


@auth.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        # print(request.get_json())
        identity = get_jwt_identity()
        print(identity)
        # access = create_access_token(identity = identity)

    
        return jsonify({"access_token":'access'})


