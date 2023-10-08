# from api import app

# from api import routes
# if __name__ == "__main__":
#     app.run(debug=True, port=5555)

from api import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5555)