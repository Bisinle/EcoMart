from flask import Blueprint, request, flash, jsonify, make_response
from flask_login import login_required, current_user
from .models import Product, Category, Order, Vendor
from . import db
import json
from . import Resource
from .serialization import vendor_schema, vendors_schema

views = Blueprint('views', __name__)

class Vendors(Resource):
    def get(self):
        all_vendors = Vendor.query.all()
        if not all_vendors:
            return make_response(jsonify({"message":"no vendors found"}))
        print(all_vendors)
        return make_response(jsonify(vendors_schema.dump(all_vendors)), 200) 
    
# api.add_resource(Vendors, '/vendors')