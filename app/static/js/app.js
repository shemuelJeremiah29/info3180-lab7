/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li> 
          <li class ="nav-item"> 
            <router-link class="nav-link" to="/api/upload">uploadform <span class="sr-only">(current)</span></router-link> 
          </li>    
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const uploadform= Vue.component('upload-form', {
    template: `  
    <div>   
    
    <div> 
        
         <ul v-for= "(message, fname, descript) in message_notif"> 
            <div v-if= "fname == 'errors'">  
              <div class="check">   
                    <li v-for= "fname in message_notif.errors"> 
                        {{fname}}
                    </li>    
                 </li>
              </div>   
             </div> 
             
            <div v-else> 
                <div class= "passed"> 
                    <li v-for = "(message, index, descript) in message_notif"> 
                        {{descript}}
                    </li>
                </div>
            </div>
        </ul>  
        
    </div>        
    
    <form @submit.prevent="uploadPhoto" method='post' id="uploadForm" enctype='multipart/form-data' > 
       <div class="layout">
    
            <label for="description">Description</label>
            <input type ="text" name= "description" class="description" /> 
        
            <label for="photo">Photo</label>
            <input type="file" name="photo" class="photo" accept= "image/*" />  
        </div> 
        
        <button type="submit" name="btn">Upload Photo</button>
        
    </form>  
    </div> 

    `, 
    methods:{ 
        uploadPhoto: function (){ 
            let uploadForm = document.getElementById('uploadForm'); 
            let form_data = new FormData(uploadForm); 
            let self= this;  
            fetch("/api/upload", {
                
                method: 'POST',  
                body: form_data,  
                
                headers: {
                    'X-CSRFToken': token
                }, 
                
                credentials: 'same-origin'
              }) 
              
                .then(function (response){
                    return response.json(); 
                })
                .then(function (jsonResponse){
                    //display a success message 
                    console.log(jsonResponse); 
                    self.message_notif=jsonResponse; 
                })
                .catch(function (error){
                    console.log(error);
                }); 
            } 
        }, 
        data: function () {  
            return {
            message_notif: [] 
            }
                
            }
}); 
    
const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

// Define Routes
const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/api/upload", component: uploadform }
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});