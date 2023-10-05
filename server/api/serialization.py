from api import  make_response,jsonify,Product,Vendor,Customer,User,Order,Category,app,ma
from flask_restx import Api,Resource,Namespace,fields

api = Api()
api.init_app(app)
ns=Namespace('/')
api.add_namespace(ns)





class VendorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Vendor
        ordered = True

    id=ma.auto_field()
    first_name=ma.auto_field()
    last_name=ma.auto_field()
    company=ma.auto_field()
    phone_number = ma.auto_field(data_key="phone_number")    
    email=ma.auto_field()
    products = ma.List(ma.Nested('ProductSchema',
                                 only=('prod_name','prod_description','image','price','quantity','category',)))

vendor_schema = VendorSchema()
vendors_schema = VendorSchema(many=True)

vendor_model_input =api.model('add-vendor',{
    
    'first_name':fields.String,
    'last_name':fields.String,
    'company':fields.String,
    'phone_number':fields.String
  

})
vendor_model_update =api.model('update-vendor',{
    
 
    'company':fields.String,
    'phone_number':fields.String
  

})

vendor_model_update =api.model('update-vendor',{
    
    
    'company':fields.String,
    'phone_number':fields.String
  

})




class CustomerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Customer
        ordered = True

    id=ma.auto_field()
    # name=ma.auto_field()
    phone_number = ma.auto_field(data_key="phone_number")    
    email=ma.auto_field()
    joined=ma.auto_field()
    # orders = ma.List(ma.Nested('OrderCustomerSchema'))
    

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
    discount=ma.auto_field()
    vendor_id = ma.auto_field()

product_schema = ProductSchema(many=True)




class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        ordered = True
        exclude = ('_password',)
    

 

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        ordered =   True
      
    id=ma.auto_field()
    item_price=ma.auto_field()
    item_quantity=ma.auto_field()
    amount=ma.auto_field()
    address=ma.auto_field()
    created_at=ma.auto_field()
    customer=ma.Nested('CustomerSchema')
    product=ma.Nested('ProductSchema')

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

order_model_input =api.model('post_order',{
    
    'item_price':fields.Integer,
    'item_quantity':fields.Integer,
    'amount':fields.Integer,
    'address':fields.String
  

})



'''-----------------------------C A T E G O R I E S ---------------------'''
class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model=Category
        ordered= True
    id =ma.auto_field()
    category_name = ma.auto_field()
    products = ma.List(ma.Nested('ProductSchema'))

category_schema = CategorySchema(many=True)


'''--------------M O D E L -------------------------'''
user_model_input =api.model('signup',{
    
    'user_name':fields.String,
    'profile_picture':fields.String,
    'password':fields.String,
    'roles':fields.String
  

})
post_user =api.model('signup',{
    'id':fields.String,
    'user_name':fields.String,
    'profile_picture':fields.String,
    'password':fields.String,
    'roles':fields.String
  

})


login_input_model =api.model('login',{
    
    'username':fields.String,
    'password':fields.String,
  

})






