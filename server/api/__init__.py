import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import request, make_response, jsonify
from flask_cors import CORS


from flask_login import LoginManager
from os import path
from flask_restful import Resource, Api


from flask_marshmallow import Marshmallow


# from flask_restx import Api, Resource, fields

# create both app and api instances
# app = Flask(__name__)
# CORS(app)



# ma = Marshmallow(app)


# secret_key = app.config['SECRET_KEY'] = 'a16e4b678a12af3ac6df0b0d9b40db31'
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///online_market.db"

# from api.models import db,Vendor,Customer,Product,User,Order,Category

# migrate = Migrate(app, db)
# db.init_app(app)
# from  api import routes



db = SQLAlchemy()
ma = Marshmallow()
DB_NAME = "database.db"

from .models import User, Customer, Vendor
# from .auth import Signup
from flask_restx import Api

api = Api()

def create_app():
    app = Flask(__name__)
    # api = Api(app)
    api = Api()
    api.init_app(app)
    ma.init_app(app)
    CORS(app)
    app.config["SECRET_KEY"] = "a16e4b678a12af3ac6df0b0d9b40db31"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    db.init_app(app)

    from .views import views, Vendors 
    from .auth import Signup

    # api.add_resource(Vendors, "/vendors")

    # app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(views, url_prefix="/")

    api.add_resource(Vendors, "/vendors")
    api.add_resource(Signup, "/signup")

    with app.app_context():
        create_database()

    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        user = User.query.get(int(id))
        if user:
            if user.roles == "customer":
                return Customer.query.get(int(id))
            elif user.roles == "vendor":
                return Vendor.query.get(int(id))
        return None
    
    for rule in app.url_map.iter_rules():
        print(rule)

    return app


def create_database():
    if not path.exists("api/" + DB_NAME):
        db.create_all()
        print("Database created!")

