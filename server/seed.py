from api import app,db,Vendor,Product,Customer
from faker import Faker
import random 
from random import randint, choice as rc

fake = Faker()

with app.app_context():
    Vendor.query.delete()


    code =['+254 ','+256 ','+252 ','+251 ']
    vendor_list = []
    for i in range(10):
        f_name = fake.unique.first_name()
        l_name = fake.unique.last_name()
        company = fake.company()
        vendor = Vendor(
            
        name=f_name +' '+ l_name,
        company=company,
        phone_number=str(rc(code)) +'7'+ str(random.randint(111111111,9999999999)),
        email=f_name+'@' + company[:4]+'.com',

        )

        vendor_list.append(vendor)
    db.session.add_all(vendor_list)




    Customer.query.delete()


    code =['+254 ','+256 ','+252 ','+251 ']
    customer_list = []
    for i in range(10):
        f_name = fake.unique.first_name()
        l_name = fake.unique.last_name()
        company = fake.company()
        customer = Customer(
            
        name=f_name +' '+ l_name,
        phone_number=str(rc(code)) +'7'+ str(random.randint(111111111,9999999999)),
        email=f_name+'@gmail.com',

        )

        customer_list.append(customer)
    db.session.add_all(customer_list)





    products = [
    {
        "prod_name": "Men's Running Shoes",
        "prod_description": "High-performance running shoes for men, perfect for marathon training.",
        "image": "mens_running_shoes.jpg",
        "price": 99.99,
        "quantity": 50,
        "category": "Footwear"
    },
    {
        "prod_name": "Women's Yoga Mat",
        "prod_description": "Premium non-slip yoga mat for women, ideal for yoga and Pilates workouts.",
        "image": "womens_yoga_mat.jpg",
        "price": 29.99,
        "quantity": 100,
        "category": "Fitness Accessories"
    },
    {
        "prod_name": "Smartphone Holder for Bikes",
        "prod_description": "Adjustable smartphone mount for bicycles, compatible with most smartphones.",
        "image": "bike_phone_holder.jpg",
        "price": 19.99,
        "quantity": 75,
        "category": "Cycling Accessories"
    },
    {
        "prod_name": "Professional DSLR Camera",
        "prod_description": "High-quality DSLR camera with advanced features for photography enthusiasts.",
        "image": "dslr_camera.jpg",
        "price": 899.99,
        "quantity": 20,
        "category": "Electronics"
    },
    {
        "prod_name": "Wireless Bluetooth Earbuds",
        "prod_description": "True wireless earbuds with noise-canceling technology and long battery life.",
        "image": "wireless_earbuds.jpg",
        "price": 79.99,
        "quantity": 60,
        "category": "Audio"
    },
    {
        "prod_name": "Leather Wallet",
        "prod_description": "Genuine leather wallet with multiple card slots and a coin pocket.",
        "image": "leather_wallet.jpg",
        "price": 49.99,
        "quantity": 30,
        "category": "Accessories"
    },
    {
        "prod_name": "Stainless Steel Water Bottle",
        "prod_description": "Insulated water bottle with a sleek design, keeps beverages cold for hours.",
        "image": "water_bottle.jpg",
        "price": 24.99,
        "quantity": 70,
        "category": "Outdoor Gear"
    },
    {
        "prod_name": "Organic Green Tea",
        "prod_description": "Premium organic green tea leaves, rich in antioxidants and flavor.",
        "image": "green_tea.jpg",
        "price": 9.99,
        "quantity": 150,
        "category": "Food & Beverage"
    },
    {
        "prod_name": "Men's Dress Shirt",
        "prod_description": "Classic men's dress shirt made from high-quality cotton, suitable for formal occasions.",
        "image": "mens_dress_shirt.jpg",
        "price": 59.99,
        "quantity": 45,
        "category": "Apparel"
    },
    {
        "prod_name": "Fitness Tracker Watch",
        "prod_description": "Smart fitness tracker watch with heart rate monitoring and GPS tracking.",
        "image": "fitness_tracker_watch.jpg",
        "price": 129.99,
        "quantity": 25,
        "category": "Wearable Tech"
    },
    {
        "prod_name": "Wireless Gaming Mouse",
        "prod_description": "High-precision wireless gaming mouse with customizable RGB lighting.",
        "image": "gaming_mouse.jpg",
        "price": 69.99,
        "quantity": 40,
        "category": "Gaming Accessories"
    },
    {
        "prod_name": "Ceramic Coffee Mug",
        "prod_description": "Elegant ceramic coffee mug with a unique design, perfect for enjoying your morning coffee.",
        "image": "coffee_mug.jpg",
        "price": 12.99,
        "quantity": 90,
        "category": "Kitchenware"
    },
    {
        "prod_name": "HD LED TV",
        "prod_description": "High-definition LED TV with a large screen for an immersive viewing experience.",
        "image": "led_tv.jpg",
        "price": 599.99,
        "quantity": 15,
        "category": "Electronics"
    }
    ]
    product_list=[]
    for product in products:
        prod = Product(
            prod_name = product['prod_name'],
            prod_description= product['prod_description'],
            image=product['image'],
            price=product['price'],
            quantity=product['quantity'],
            category=product['category'],

        )
        product_list.append(prod)

    db.session.add_all(product_list)
    db.session.commit()

