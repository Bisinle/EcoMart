from api import  make_response,jsonify,Product,Vendor,Customer,app,ma
from flask_restful import Api,Resource,Namespace,fields

api = Api()
api.init_app(app)
ns=Namespace('/')
api.add_namespace(ns)


    


class VendorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Vendor
        ordered = True

    id=ma.auto_field()
    name=ma.auto_field()
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
    name=ma.auto_field()
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


