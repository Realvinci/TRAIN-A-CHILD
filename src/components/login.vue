<template>
 <div class="login">
      <h1>Login</h1>
     <form @submit.prevent="login">
          <label for="email">email</label>
          <input type="email" v-model="email">
          <label for="password">password</label>
          <input type="password" v-model="password">
     </form>
     <button @click="login">Login</button>
     <button @click="forgotpassword">Forgot Password</button>
 </div>  
</template>

<script>
import {app as app} from '../../firebase'
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail  } from "firebase/auth";
import router from '@/router';
import { collection,getDocs,getFirestore } from 'firebase/firestore';

const auth = getAuth(app)
const db = getFirestore(app);
export default {
  data(){
    return{
        email:'',
        password:'',
        signinToken:'',
        id:''
    }
  },
  methods:{
    login(){
        signInWithEmailAndPassword(auth, this.email, this.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.signinToken = user.accessToken
    this.PushUserDatatoLS(this.email)
    console.log(this.signinToken)
    console.log(typeof(this.signinToken))
    this.saveTolocalstorage()
    // ...
    this.checkuserID(this.email);
    
    //this.clearfield();
   
    //take the person to his trainer dash board instead of taking him home
   
  
  //  this.gohome();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    
  },
    forgotpassword(){
        sendPasswordResetEmail(auth, this.email)
  .then(() => {
    // Password reset email sent!s
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
      },
  gohome(){
    this.$router.push({path:`/`})
  },
  clearfield(){
   this.email = '',
   this.password = ''
  },
   saveTolocalstorage(){
    window.localStorage.setItem('signinToken', this.signinToken);
   },
   checksigninToken(){
     let _signinToken = localStorage.getItem("signinToken")
     if(_signinToken){
        return true;
     }else{
      return false
     }
   },
   loginUser(email,password){
       let signin = this.checksigninToken()
        if(signin){
           localStorage.removeItem("signinToken")
           //login proper and push the signinToken to the localstorage and 

           //get the user data by searching it in the user collection and  pull out the user credential to return you to the approprate collection for a search and 
        }
   },
   loginproper(email,password){
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        //Signed in
        const user = userCredential.user;
        this.signinToken = user.accessToken
        this.getUserData(email)
        localStorage.setItem("signinToken",this.signinToken)
        this.clearfield();
        //get the user data and privileges
         this.checkuserID()
        //this.gohome()
      }).catch((error)=>{
         console.log(error)
      })
   },
   async PushUserDatatoLS(email){
    //return the credential and the role
    //get the email and  ....carryout a check on the localstorage find out if the signintoken exist and get the signintoken from there and decode to get the email if it doesnt exist get the this.email
    //on press login get the this.email and replace the email here 
    let users = []; 
    const querySnapshot = await getDocs(collection(db,"Users"))
      querySnapshot.forEach((doc)=>{
           users.push(doc.data().Users)
      })
      for(let user of users){
          for(let u of user){
            //"Trainer@gmail.com" 
            if(email=== u.email){
              
              let userdata = {
                 Trainer : u.Trainer,
                 role:u.role,
                 credential:u.credential
               }
               console.log(userdata)
             localStorage.setItem("Userdata",JSON.stringify(userdata))
            }
          }
      }
     
   },
   //check the userid
  async checkuserID(email){
   
    let users = []
     const querySnapshot = await getDocs(collection(db,"Users"))
     querySnapshot.forEach((doc)=>{
         users.push(doc.data().Users)
     })
     for(let user of users){
        for(let u of user){
           if(u.email === email){
             console.log('this is the detail', u)
             this.id = u.id
             this.goToTrainerDashboard(u.id)
           }
        }
     }
  },
     goToTrainerDashboard(id){
      this.$router.push(`/trainerdashboard/${id}`)
   },
   goToRecruiterDasboard(id){
     this.$router.push(`/recruiterdash/${id}`)
   }
  },
  created(){
 
  }
}
</script>

<style>

</style>
// on login check for the user id and push to the id
///check  for the localstorage if the user is recruite check for admin or not if is admin
push the function







///admin is the first recruiter











///on login make userdata and push to localstorage 
to be used at the home to get the user credential which is going to be used for the collection value as well as to get the data // on goin home get the userdata and clear the userdata
login(){
  signInWithEmailAndPassword(auth, this.email, this.password)
.then((userCredential) => {
// Signed in 
const user = userCredential.user;
this.signinToken = user.accessToken
console.log(this.signinToken)
console.log(typeof(this.signinToken))
this.saveTolocalstorage()
// ...
this.clearfield();
this.gohome();
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
});

},





//on login check the localstorage for the signintoken if it exist clear it and push in the new signintoken and fetch the user data
//and take the person home //should i put a role and credential on the signup side so that when the person just sign if the credential is used as a form of  collection check if is a Trainer you go to the trainer collection on the 
next login to fetch his data and also his privileges excalation