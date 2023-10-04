from api import  make_response,jsonify,Product,Vendor,Customer,User,app,ma
from flask_restx import Api,Resource,Namespace,fields
from flask_jwt_extended import  JWTManager

api = Api()
api.init_app(app)
authorizations = {
    'jsonwebToken':{
        "type":"apiKey",
        "in":"header",
        "name":'Authorization'
    }
}
ns=Namespace('/',authorizations=authorizations)
api.add_namespace(ns)

jwt = JWTManager()
jwt.init_app(app)


    


class VendorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Vendor
        ordered = True

    id=ma.auto_field()
    # name=ma.auto_field()
    company=ma.auto_field()
    phone_number = ma.auto_field(data_key="phone_number")    
    email=ma.auto_field()
    products = ma.List(ma.Nested('ProductSchema',
                                 only=('prod_name','prod_description','image','price','quantity','category',)))

vendor_schema = VendorSchema()
vendors_schema = VendorSchema(many=True)



class CustomerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Customer
        ordered = True

    id=ma.auto_field()
    # name=ma.auto_field()
    phone_number = ma.auto_field(data_key="phone_number")    
    email=ma.auto_field()
    joined=ma.auto_field()

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)


class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        ordered = False
    id=ma.auto_field()
    prod_name=ma.auto_field()
    prod_description=ma.auto_field()
    image=ma.auto_field()
    price=ma.auto_field()
    quantity=ma.auto_field()
    category=ma.auto_field()

product_schema = ProductSchema(many=True)




class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        ordered = True
        exclude = ('_password',)
    

 

user_schema = UserSchema()
users_schema = UserSchema(many=True)




'''--------------M O D E L -------------------------'''
user_model_input =api.model('signup',{
    
    'user_name':fields.String,
    'profile_picture':fields.String,
    'password':fields.String,
    'roles':fields.String
  

})


login_input_model =api.model('login',{
    
    'username':fields.String,
    'password':fields.String,
  

})