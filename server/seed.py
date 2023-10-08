#from api import app,db,Vendor,Product,Customer,User,Order,Category
from faker import Faker
import random 
from random import randint, choice as rc
import uuid

fake = Faker()

from api import create_app, db
from api.models import Vendor,Product,Customer,User,Order,Category

app = create_app()

with app.app_context():
    '''-------------- USER AUTHENTICATION TABLE-----------------------'''
    User.query.delete()

    user_list = []
    for user in range(50):      

        
        user_name = fake.unique.user_name()
        company = fake.company()

        user = User(
            user_name=user_name,
            # email=user_name.split(' ')[0]+"@"+company[:5]+".com",
            profile_picture='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            password_hash = str(random.randint(2,54324423)),
            public_id = str(uuid.uuid4()),
            roles=rc(['Admin','Vendor','Customer'])

         
        )
        user_list.append(user)
    db.session.add_all(user_list)
    db.session.commit()






    Vendor.query.delete()

    profile_image =[]
    code =['+254','+256','+252','+251']
    vendor_list = []
    vendors = [ user for user in user_list if user.roles=='Vendor']
    for i in range(len(vendors)):
        user_obj=rc(vendors)
        l_name = fake.last_name()
        company = fake.company()
  
    
        vendor = Vendor(            
        first_name=user_obj.user_name,
        last_name = fake.last_name(),
        company=company,
        phone_number=str(rc(code)) +'7'+ str(random.randint(111111111,9999999999)),
        email=user_obj.user_name+'@' + company[:4]+'.com',
        user_id = user_obj.id

        )


       
        if user_obj.user_name not  in [vendor.first_name for vendor  in vendor_list]:
            vendor_list.append(vendor)


    db.session.add_all(vendor_list)
    db.session.commit()




    Customer.query.delete()


    code =['+254 ','+256 ','+252 ','+251 ']
    customer_list = []
    customers=[ user for user in user_list if user.roles=='Customer']
    print(len(customers))
    for i in range(len(customers)):

        
        cutomer_form_user_table=rc(customers)
        l_name = fake.last_name()
        customer = Customer(
            
        first_name=cutomer_form_user_table.user_name,
        last_name=fake.last_name(),
        phone_number=str(rc(code)) +'7'+ str(random.randint(111111111,9999999999)),
        email=cutomer_form_user_table.user_name+'@gmail.com',
        user_id = cutomer_form_user_table.id

        )
          
        if cutomer_form_user_table.id not  in [customer.user_id for customer  in customer_list ]:
            customer_list.append(customer)
    db.session.add_all(customer_list)
    db.session.commit()



    '''________________________CATEGORIES TABLE POPULATION___________________________'''
    Category.query.delete()
    categories_list =['Electronics','Games', 'Fashion','Sports','Food and Groceries','Fitness','Home and Furniture','Health ','Beauty','Books','Media']

    for i in range(len(categories_list)):
        category = Category(
            category_name =categories_list[i]
        )
        db.session.add(category)
        db.session.commit()



    Product.query.delete()
    products = [
    {
        "prod_name": "Men's Running Shoes",
        "prod_description": "High-performance running shoes for men, perfect for marathon training.",
        "image": "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/05/333176/1.jpg?1506",
        "price": 99.99,
        "quantity": 50,
        "category": "Footwear"
    },
    {
        "prod_name": "Women's Yoga Mat",
        "prod_description": "Premium non-slip yoga mat for women, ideal for yoga and Pilates workouts.",
        "image": "https://m.media-amazon.com/images/I/81a9mSKpkvL._AC_UF1000,1000_QL80_.jpg",
        "price": 29.99,
        "quantity": 100,
        "category": "Fitness Accessories"
    },
    {
        "prod_name": "Smartphone Holder for Bikes",
        "prod_description": "Adjustable smartphone mount for bicycles, compatible with most smartphones.",
        "image": "https://m.media-amazon.com/images/I/6104nsuFpWL._AC_UF894,1000_QL80_.jpg",
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
        "image": "https://media.wired.com/photos/641cbccdc81d68060ce359bf/1:1/w_1473,h_1473,c_limit/Anker-Soundcore-Space-A40-Earbuds-and-Case-Best-Wireless-Earbuds--Gear.jpg",
        "price": 79.99,
        "quantity": 60,
        "category": "Audio"
    },
    {
        "prod_name": "Leather Wallet",
        "prod_description": "Genuine leather wallet with multiple card slots and a coin pocket.",
        "image": "https://therealleathercompany.com/cdn/shop/collections/leather-wallets.jpg?v=1691140742",
        "price": 49.99,
        "quantity": 30,
        "category": "Accessories"
    },
    {
        "prod_name": "Stainless Steel Water Bottle",
        "prod_description": "Insulated water bottle with a sleek design, keeps beverages cold for hours.",
        "image": "https://media.istockphoto.com/id/920681320/photo/plastic-drink-water-bottle.jpg?s=612x612&w=0&k=20&c=_TJzF3E2pWD72C-BAyq5Psz0iwf05UWAzabGpB0fd7k=",
        "price": 24.99,
        "quantity": 70,
        "category": "Outdoor Gear"
    },
    {
        "prod_name": "Organic Green Tea",
        "prod_description": "Premium organic green tea leaves, rich in antioxidants and flavor.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTQ--QoEChqrwO3ILNWTxzqkixKNcYJWIyw&usqp=CAU",
        "price": 9.99,
        "quantity": 150,
        "category": "Food & Beverage"
    },
    {
        "prod_name": "Men's Dress Shirt",
        "prod_description": "Classic men's dress shirt made from high-quality cotton, suitable for formal occasions.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwiEcP3es9PJ8-ChugIt__RGLe9-9GmS54Fw&usqp=CAU",
        "price": 59.99,
        "quantity": 45,
        "category": "Apparel"
    },
    {
        "prod_name": "Fitness Tracker Watch",
        "prod_description": "Smart fitness tracker watch with heart rate monitoring and GPS tracking.",
        "image": "https://hips.hearstapps.com/hmg-prod/images/fitness-trackers-6424a32a86f6e.jpg",
        "price": 129.99,
        "quantity": 25,
        "category": "Wearable Tech"
    },
    {
        "prod_name": "Wireless Gaming Mouse",
        "prod_description": "High-precision wireless gaming mouse with customizable RGB lighting.",
        "image": "https://www.ubuy.ke/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFORUMyWGRvVUwuX0FDX1NMMTUwMF8uanBn.jpg",
        "price": 69.99,
        "quantity": 40,
        "category": "Gaming Accessories"
    },
    {
        "prod_name": "Ceramic Coffee Mug",
        "prod_description": "Elegant ceramic coffee mug with a unique design, perfect for enjoying your morning coffee.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmSce72qbiyuWkjdprDvhNBNGVBpByYKrruQ&usqp=CAU",
        "price": 12.99,
        "quantity": 90,
        "category": "Kitchenware"
    },
    {
        "prod_name": "HD LED TV",
        "prod_description": "High-definition LED TV with a large screen for an immersive viewing experience.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_GIEIg-2QSE1h8JOiBuGuiwnA0dsLWBBczQ&usqp=CAU",
        "price": 599.99,
        "quantity": 15,
        "category": "Electronics"
    }
    ]
    product_list=[]
    for product in products:
        limit = random.randint(1,4)
        for i in range(limit):
            prod = Product(
                prod_name = product['prod_name'],
                prod_description= product['prod_description'],
                image=product['image'],
                price=product['price'],
                quantity=product['quantity'],
                discount=product['price'],
                vendor_id =rc([v.id for v in Vendor.query.all()]),
                category_id = rc([category.id for category in     Category.query.all()])

            )
            product_list.append(prod)

    db.session.add_all(product_list)
    db.session.commit()




    # ''' S E E D I N G__________________O R D E R S________________T A B L E '''

    Order.query.delete()
    order_list = []
    for i in range(10):
        product_obj = rc(product_list)
        order = Order(
            item_price = product_obj.price,
            item_quantity = random.randint(1,5),
            address= fake.address(),
            product_id= rc([prod.id for prod in product_list]),
            customer_id=rc([cust.id for cust in customer_list])
        )
        order_list.append(order)
    db.session.add_all(order_list)
    db.session.commit()








    '''R E L A T I O N ---S H I P _________________ T E S T I N G'''
    # # vendor1 = Vendor.query.all()[0]
    # # print(vendor1.products)

    # ven1  = Vendor.query.all()[0]
    # print(ven1.user)

    # customer1  = Customer.query.all()[2]
    # prod1  = Product.query.all()[3]
    # print(customer1.products)
    # print(customer1.orders)
    # print(prod1.orders)



    # category1 = Category.query.all()[0]
    # print(category1.products)


