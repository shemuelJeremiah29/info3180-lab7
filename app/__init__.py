from flask import Flask 
from flask_wtf.csrf import CSRFProtect
#Configuration Values 
USERNAME= 'Admin' 
PASSWORD='$ecr6tK4y' 
UPLOAD_FOLDER= 'app/static/uploads'

app = Flask(__name__)  
csrf= CSRFProtect(app)
app.config.from_object(__name__) 
app.config['SECRET_KEY'] = 'v\xf9\xf7\x11\x13\x18\xfaMYp\xed_\xe8\xc9w\x06\x8e\xf0f\xd2\xba\xfd\x8c\xda'

from app import views 

file_folder= app.config['UPLOAD_FOLDER']
