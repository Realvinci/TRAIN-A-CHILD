<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#"><span class="text-primary">TRA</span>CH</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#about">About</a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/recruitersignup">Become a Recruit</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#team">Team</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
           
          </div>
        </div>
      </nav>
  <div>
    <div class="hero">
      <img src="../assets/group.jpg" style="width:100%; object-fit: cover;">
      <div class="text">A good education is a foundation for a better future <br> <h3 class="author">Elizabeth Warent</h3>
        <b-button variant="outline-primary">Support</b-button>
         <router-link :to="{path:`/trainerdashboard/${this.id}`}">
          <b-button variant="outline-primary" v-if="loggedin">Dashboard</b-button>
         </router-link>
         <router-link :to="{path:`/recruiterdashboard/${this.id}`}">
           <b-button variant="outline-primary" v-if="loggedRecruit">Dashboard</b-button>
         </router-link>
      </div> 
    </div>
  <!--About -->
  <section id="about" class="about section-padding">
       <div class="container">
          <div class="row">
             <div class="col-lg-4 col-md-12 col-12">
                <div class="about-img">
                    <img src="../assets/children-1.jpg" alt="" class="img-fluid">
                </div>
             </div>
              <div class="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
                  <div class="about-text">
                    <h2>TRAIN A CHILD IS AN INIATIVE <br> TO TAKE KIDS OF THE STREETS. </h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas sit adipisci necessitatibus quasi recusandae voluptas veritatis itaque, repudiandae blanditiis dolor, tempora dignissimos, deleniti velit nobis id quos! Totam, laboriosam inventore.</p>
                    <a href="#" class="btn btn-warning">Learn More</a>
                  </div>

              </div>
          </div>
       </div>
  </section>
  <!--Children -->
  <section id="children" class="children section-padding">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                   <div class="section-header text-center pb-5">
                         <h2>Children</h2>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nihil vero, accusantium esse voluptates alias libero rerum neque, nisi laboriosam odio officia non deleniti suscipit illum consectetur et quasi obcaecati?</p>
                   </div>
               </div>
            </div>

            <div class="row">
                 <div class="col-12 col-md-12 col-lg-4" v-for="(child,i) in children" :key="i">
                       <div class="card text-center bg-white pb-2">
                            <div class="card-body text-dark">
                                 <div class="img-area mb-47">
                                     <img :src="child.image" alt="" class="img-fluid">
                                 </div>
                                 <h3 class="card-title">{{ child.name }}</h3>
                                 <p class="lead">{{ child.detail }}</p>
                                 <button class="btn bg-warning text-dark">View</button>
                            </div>
                       </div>
                 </div>
            </div>
         </div>
  </section>


 <!--children-->
    <b-container>
          <h1>Children.</h1>
            <b-row>
               <b-col v-for="(child,i) in children" :key="i">
                <router-link :to="`/detail/${child.id}`">   
                  <img :src="child.image" style="width:200px; border-raduis:50%;">
                </router-link>
                
               </b-col>
            </b-row>
    </b-container>
    <!--Footer page-->
    <!-- Footer -->
<footer class="text-center text-lg-start bg-light text-muted">
  <!-- Section: Social media -->
  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    <!-- Left -->
    <div class="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    <!-- Left -->

    <!-- Right -->
    <div>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-google"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <!-- Right -->
  </section>
  <!-- Section: Social media -->

  <!-- Section: Links  -->
  <section class="">
    <div class="container text-center text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">

        <!-- Grid column -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i class="fas fa-home me-3"></i>Ojudo Berger Lagos Nigeria</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            trainachild@gmail.com
          </p>
          <p><i class="fas fa-phone me-3"></i> + 234 721 93 7987</p>
          <p><i class="fas fa-print me-3"></i> + 01 7248 82717 7</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>
  </section>
  <!-- Section: Links  -->

  <!-- Copyright -->
  <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2021 Copyright:
    <a class="text-reset fw-bold" href="#">Train a child</a>
  </div>
  <!-- Copyright -->
</footer>
<!-- Footer -->
 </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import {app as app} from '../../firebase'
// @ is an alias to /src
import {collection,query,where,getDocs,getFirestore} from "firebase/firestore"
const db = getFirestore(app);
export default {
  name: 'HomeView',
  components: {
    
  },
  data(){
   return{
    Username:'',
    name:'',
    children:[],
    role:'',
    name:'',
    loggedin:false,
    loggedRecruit:false,
    id:''
   }
  },
 methods:{
   getEmail(){
      let user = localStorage.getItem('signinToken')
      let userEmail = jwtDecode(user);
      this.Username = userEmail.email 
   },
  async Welome(){
    const querySnapshot = await getDocs(collection(db, "Trainer"));
    querySnapshot.forEach((doc)=>{
      if(doc.data().email === this.Username){
      //  this.name = doc.data().name
     
      }
    })
    this.getEmail();
    if(this.Username!==''){
      alert(`Welome ${this.name}`)
    }else{
      alert('Welcome');
    }
     
   },
   async getAllChildren(){
      const querySnapshot = await getDocs(collection(db,"Children"));
      querySnapshot.forEach((doc)=>{
         this.children = doc.data().children
      })
    
   },
   async checkUserdatainLS(){
       let Admin = false;
      let userData = localStorage.getItem("Userdata")
      if(userData){
        userData = JSON.parse(userData)/// carry out the check here and return data
  
         let signinToken = localStorage.getItem("signinToken")
         let email = jwtDecode(signinToken).email
         let coll = userData.credential
         let userdata = []
         const querySnapshot = await getDocs(collection(db,coll))
         querySnapshot.forEach((doc)=>{
            userdata.push(doc.data())
         })
         for(let user of userdata){
            if(user.email===email){
             this.children = user.Children
            }
         }
         //get prviledge here and clear the userdata
        let role =  userData.role
         this.role = role;
         if(role === "User"){
          
         }else{
          //call escalate user priviledges probably with a function 
          //
         }
      }else{
        //do nothing
      } 
   },
   async PushUserDatatoLS(){
  //return the credential and the role
  //get the email and  ....carryout a check on the localstorage find out if the signintoken exist and get the signintoken from there and decode to get the email if it doesnt exist get the this.email
  //on press login get the this.email and replace the email here 
 
   let siginToken = localStorage.getItem("signinToken");
   let email = jwtDecode(siginToken).email
 
  let users = []; 
  const querySnapshot = await getDocs(collection(db,"Users"))
    querySnapshot.forEach((doc)=>{
         users.push(doc.data().Users)
    })
    for(let user of users){
        for(let u of user){
          //"Trainer@gmail.com" 
          if(email === u.email){
            
            let userdata = {
               Trainer : u.Trainer,
               role:u.role,
               credential:u.credential
             }
           
           localStorage.setItem("Userdata",JSON.stringify(userdata))
          }
        }
    }
   
 },
 async getName(){
    //get email  
     let signinToken = localStorage.getItem("signinToken")
     let email = jwtDecode(signinToken).email
    
    const querysnapshot = await getDocs(collection(db,"Trainer"))
    querysnapshot.forEach((doc)=>{
        if(doc.data().email ===email){
             this.name  = doc.data().name
        }
    })
    return this.name
 },
 async loggedinasTrainer(){
     let siginToken = localStorage.getItem("signinToken")
     let email = jwtDecode(siginToken).email
    const querysnapshot = await getDocs(collection(db,"Trainers"))
     querysnapshot.forEach((doc)=>{
          if(doc.data().email === email){
               this.loggedin = true
               this.id = doc.data().id
          }
     })
 },
 async loggedinasRecruit(){
  let siginToken = localStorage.getItem("signinToken")
     let email = jwtDecode(siginToken).email
    const querySnapshot = await getDocs(collection(db,"Recruits"))
    querySnapshot.forEach((doc)=>{
          console.log(doc.data().Verified)
          
          for(let item of doc.data().Verified){
                if(email === item.email){
                     this.id = item.id
                     this.loggedRecruit = true
                }
          }
          
    })
 }
 },
 created(){
  //this.loggedinasRecruit()
   this.loggedinasTrainer()
  //this.getName()
  //this.PushUserDatatoLS();
  //this.getEmail();
  //this.checkUserdatainLS();
 //this.Welome();
 //this.getAllChildren();
 }
}
</script>

<style scoped>
.hero{
  position:relative;
  text-align:center;
  color:white;
}
.text{
  position:absolute;
  top: 50%;
  left:50%;
  transform:translate(-50%,-50%);
  font-size: 2em;
  font-style: italic;
}
.author{
  font-size: .7em;
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

body {
    font-family: "Poppins", sans-serif;
    color: #444444;
}

a,
a:hover {
    text-decoration: none;
    color: inherit;
}

.section-products {
    padding: 80px 0 54px;
}

.section-products .header {
    margin-bottom: 50px;
}

.section-products .header h3 {
    font-size: 1rem;
    color: #fe302f;
    font-weight: 500;
}

.section-products .header h2 {
    font-size: 2.2rem;
    font-weight: 400;
    color: #444444; 
}

.section-products .single-product {
    margin-bottom: 26px;
}

.section-products .single-product .part-1 {
    position: relative;
    height: 290px;
    max-height: 290px;
    margin-bottom: 20px;
    overflow: hidden;
}

.section-products .single-product .part-1::before {
		position: absolute;
		content: "";
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		transition: all 0.3s;
}

.section-products .single-product:hover .part-1::before {
		transform: scale(1.2,1.2) rotate(5deg);
}

.section-products #product-1 .part-1::before {
    background: url("https://i.ibb.co/L8Nrb7p/1.jpg") no-repeat center;
    background-size: cover;
		transition: all 0.3s;
}

.section-products #product-2 .part-1::before {
    background: url("https://i.ibb.co/cLnZjnS/2.jpg") no-repeat center;
    background-size: cover;
}

.section-products #product-3 .part-1::before {
    background: url("https://i.ibb.co/L8Nrb7p/1.jpg") no-repeat center;
    background-size: cover;
}

.section-products #product-4 .part-1::before {
    background: url("https://i.ibb.co/cLnZjnS/2.jpg") no-repeat center;
    background-size: cover;
}

.section-products .single-product .part-1 .discount,
.section-products .single-product .part-1 .new {
    position: absolute;
    top: 15px;
    left: 20px;
    color: #ffffff;
    background-color: #fe302f;
    padding: 2px 8px;
    text-transform: uppercase;
    font-size: 0.85rem;
}

.section-products .single-product .part-1 .new {
    left: 0;
    background-color: #444444;
}

.section-products .single-product .part-1 ul {
    position: absolute;
    bottom: -41px;
    left: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
    opacity: 0;
    transition: bottom 0.5s, opacity 0.5s;
}

.section-products .single-product:hover .part-1 ul {
    bottom: 30px;
    opacity: 1;
}

.section-products .single-product .part-1 ul li {
    display: inline-block;
    margin-right: 4px;
}

.section-products .single-product .part-1 ul li a {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    color: #444444;
    text-align: center;
    box-shadow: 0 2px 20px rgb(50 50 50 / 10%);
    transition: color 0.2s;
}

.section-products .single-product .part-1 ul li a:hover {
    color: #fe302f;
}

.section-products .single-product .part-2 .product-title {
    font-size: 1rem;
}

.section-products .single-product .part-2 h4 {
    display: inline-block;
    font-size: 1rem;
}

.section-products .single-product .part-2 .product-old-price {
    position: relative;
    padding: 0 7px;
    margin-right: 2px;
    opacity: 0.6;
}

.section-products .single-product .part-2 .product-old-price::after {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #444444;
    transform: translateY(-50%);
}
</style>



///in the created check the userdata and get the userdata the collection is the credential and 



//when you want to go trainerdashboard there should be a function that apppends the 
unique id to the url