from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user
from . import jsonify
from flask_restx import Resource, Namespace
from flask import make_response
from .serialization import user_model_input, post_user
import uuid

auth = Blueprint('auth', __name__)
api = Namespace('auth')

@auth.route('/login', methods=['GET','POST'])
def login():
    # Your login logic here...
    pass

class Signup(Resource):  # Use Resource instead of auth
    @api.expect(user_model_input)  # Use Resource.expect instead of auth.expect
    @api.marshal_with(post_user)  # Use Resource.marshal_with instead of auth.marshal_with
    def post(self):
        data = request.get_json()
        new_user = User(
            user_name=data['user_name'],
            profile_picture=data['profile_picture'],    
            password_hash=generate_password_hash(data['password']),  # Hash the password
            public_id=str(uuid.uuid4()),
            roles=data['roles']
        )
        db.session.add(new_user) 
        db.session.commit()  

        return make_response(jsonify(new_user), 201)
    