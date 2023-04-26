<template>
  <div class="signup">
    <h1>Sign Up Trainer</h1>
      <form @submit.prevent="signup">
        <label>Name</label>
        <input v-model="name">
        <label for="email">Email</label>
        <input type="text" v-model="email">
        <br>
        <label for="password">Password</label>
        <input type="password" v-model="password">
        <br>
        <label for="confirm">Confirm Password</label>
        <input type="password" v-model="confirmpassword">
      </form>
      <button @click="signup">SignUp as Trainer <i class="fa-solid fa-heart"></i></button>
       <button @click="support">Support</button>
      <div class="recruiter">
        <router-link to="/recruiter">
           <button>Become Recruiter<i class="fa-solid fa-shield-halved"></i></button>
      </router-link>
      </div>
     
  </div>
</template>

<script>
import {app as app} from '../../firebase'
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { getFirestore,doc, updateDoc,setDoc ,arrayUnion } from "firebase/firestore";
import {v4 as uuidv4} from 'uuid'

const db = getFirestore(app);
const auth = getAuth(app);

//auth.languageCode = 'it';
auth.useDeviceLanguage();
export default {
   data(){
    return{
         password:'',
         confirmpassword:'',
         email:'',
         phone:'',
         name:'',

    }
   },
   methods:{
      signup(){
        //check for empty first
        if(this.email ==='' || this.password ==='' || this.confirmpassword ===''){
           alert("enter the fields")
        }else{
            //check for password match
        if(this.password ===this.confirmpassword){
              createUserWithEmailAndPassword(auth, this.email,this.password)
             .then((userCredential) => {
             // Signed in 
             const user = userCredential.user;
             localStorage.setItem("signinToken",user.accessToken)
             
             this.addToTrainers(this.name,this.email,[])
             //push token to signup
             //localStorage.setItem(signupToken,user.accessToken)
             console.log(user.accessToken);
             // ...
             })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    // ..
          });
            }else{
              alert('Password doesnt match');
            }
        }
      },
      async addToTrainers(name,email,children){
        /// for the users end run this function
         await setDoc(doc(db,"Trainer",this.name),{
           id:uuidv4(),
           name:this.name,
           email:this.email,
           childen:[],
           credential:"Trainer",
           role:"user"
         })
        //for admin should run in background at timeout i think
        const adminRef = doc(db, "Admin", "C7Jng64ORvLGgCZvRYhy");
     await updateDoc(adminRef, {
      Trainers: arrayUnion({id:uuidv4(),name:this.name,email:this.email,children:[],credential:"Trainer",role:"user"})
     });
     const userRef = doc(db,"Users","Users");
     await updateDoc(userRef,{
      Users:arrayUnion({ id:uuidv4(),name:this.name,email:this.email,children:[],credential:"Trainer",role:"User"})
     })
     this.gohome();
     this.clearfields();
        //add to trainers
        //take to home page
      //call clear fields
      },

      gohome(){
        this.$router.push({path:'/'})
      },
      clearfields(){
       this.name = '',
       this.email = '',
       this.password = '',
       this.confirmpassword = ''
      },
      support(){
          router.push({path:'/support'})
      },
      loginTheUser(){
        //check the localstorage for the signin credential and clear it and put the new one before pushing to the homepage
        let _signinToken = this.checkforsignintoken()
         if(_signinToken){
             localStorage.removeItem("signinToken")
             //login the user with the provided credential
             this.loginwithemailpassword(this.email,this.password)
         }else{
            this.loginwithemailpassword(this.email,this.password)
         }
      },
      checkforsignintoken(){
         let _signin = localStorage.getItem("signinToken");
          if(_signin){
            return true;
          }else{
            return false;
          }
      },
      loginwithemailpassword(email,password){
          signInWithEmailAndPassword(auth,email,password)
          .then((userCredential)=>{
            const user = userCredential.user;
             this.signinToken = user.accessToken
             localStorage.setItem("signinToken",this.signinToken)
             this.clearfields();
             this.gohome();
          })
      },
      clearfields(){
        this.email = '',
        this.password = ''
      },
      gohome(){
         this.$router.push('/')
      }
   },
   
}
</script>

<style>
.fa-heart{
  color: red;
}
.recruiter{
  margin-top: 800px;
}
</style>



//sharp check for the just entered or logged in person to return the properties if it exist if not just keep empty
this login function will be later be a global function callable from the the vuex




//after successful signup

a function to check the the localstrorage for the childId if it exists if it does check the child and return as objects else 