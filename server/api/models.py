from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData,UniqueConstraint
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash,check_password_hash


from flask_login import UserMixin
from . import db




# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })

# db = SQLAlchemy(metadata=metadata)



class Vendor(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    company = db.Column(db.String)  # Corrected column name
    phone_number = db.Column(db.String)
    email = db.Column(db.String)

    # user relationship
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='user',uselist=False)

    #product relationship
    products = db.relationship('Product', backref ='vendor')

    __table_args__ = (UniqueConstraint("phone_number", "email", name="Vendor_unique_constraint"),)



    def __repr__(self):
        return f'(id: {self.id}, first_name: {self.first_name},last_name: {self.last_name}, company: {self.company}, phone_number: {self.phone_number}, email: {self.email} )'

class Customer(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    phone_number = db.Column(db.String)
    email = db.Column(db.String)
    joined = db.Column(db.DateTime, server_default=db.func.now())


    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='customer', uselist=False)


    orders = db.relationship('Order', back_populates='customer',cascade='all, delete-orphan')
    products = association_proxy('orders','product')


    



    __table_args__ = (UniqueConstraint("phone_number", "email", name="Customer_unique_constraint"),)


    def __repr__(self):
        return f'(id: {self.id},first_name: {self.first_name},last_name: {self.last_name}, ,phone_number: {self.phone_number}, email: {self.email} , joined: {self.joined})'



class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prod_name = db.Column(db.String)
    prod_description = db.Column(db.String)
    image = db.Column(db.String)
    price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    # category = db.Column(db.String)
    discount = db.Column(db.Integer)



    vendor_id = db.Column(db.Integer, db.ForeignKey('vendor.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    orders = db.relationship('Order', back_populates='product')
    customers = association_proxy('orders','customer')

    


    


    @hybrid_property
    def discounted_price(self):
        # Calculate the discounted price
        return self.price 

    @discounted_price.setter
    def discounted_price(self, value):
        # Set the discount based on the desired discounted price
        if self.price > 0 and self.quantity>0:
            self.discount = (self.price *value) /100
        else:
            self.discount = 0


    def __repr__(self):
        return f'(id: {self.id}, prod_name: {self.prod_name}, price: {self.price}, category: {self.category}, quantity: {self.quantity} ,vendor_id: {self.vendor_id})'


class User(db.Model, UserMixin):
    __tablename__ ='users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String)
    public_id = db.Column(db.String(50))
    _password = db.Column(db.String)
    roles =  db.Column(db.String)
    profile_picture = db.Column(db.String)
    joined = db.Column(db.DateTime, server_default=db.func.now())


  

    __table_args__ = (UniqueConstraint("public_id","user_name", name="User_unique_constraint"),)

    @hybrid_property
    def password_hash(self):
        return self._password
    
    @password_hash.setter
    def password_hash(self, password):
        self._password = generate_password_hash(password,method='pbkdf2:sha256')

    def authenticate(self,password):
        return True if check_password_hash(self._password, password) else False



    def __repr__(self):
        return f'(id: {self.id}, user_name: {self.user_name}, roles: {self.roles},  joined: {self.joined} )'




class Order(db.Model):
    __tablename__='orders'


    id = db.Column(db.Integer, primary_key=True)
    item_price = db.Column(db.Integer)
    item_quantity = db.Column(db.Integer)
    amount = db.Column(db.Integer)
    address = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


    customer_id = db.Column("customer_id",db.Integer, db.ForeignKey('customer.id'))
    product_id = db.Column("product_id",db.Integer, db.ForeignKey('product.id'))


    customer = db.relationship('Customer', back_populates='orders')
    product = db.relationship('Product', back_populates='orders')


    def __repr__(self):
        return f'(id: {self.id}, item_price: {self.item_price}, item_quantity: {self.item_quantity},  amount: {self.amount} )'



class Category(db.Model):
    __tablename__ ='categories'

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String)

    products = db.relationship('Product', backref ='category')

    def __repr__(self):
        return f'(id: {self.id}, category_name: {self.category_name} )'












