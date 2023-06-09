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
       <p>Already a trainer?</p>
       <router-link to="/login">login</router-link>
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
import { getFirestore,doc, updateDoc,setDoc ,arrayUnion ,getDocs,collection} from "firebase/firestore";
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
         childdata:{  },
         id:'',
         Trainerdashboard:false
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
            // console.log(user.accessToken);
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
        this.id = uuidv4()
        /// for the users end run this function
         await setDoc(doc(db,"Trainer",this.name),{
           id:this.id,
           name:this.name,
           email:this.email,
           childen:[],
           Trainer:true,
           role:"user",
           credential:"Trainer"
         })
        //for admin should run in background at timeout i think
    //     const adminRef = doc(db, "Admin", "C7Jng64ORvLGgCZvRYhy");
    //  await updateDoc(adminRef, {
    //   Trainers: arrayUnion({id:this.id,name:this.name,email:this.email,children:[],Trainer:true,role:"user",credential:"Trainer"})
    //  });
     const userRef = doc(db,"Users","Users");
     await updateDoc(userRef,{
      Users:arrayUnion({ id:this.id,name:this.name,email:this.email,children:[],Trainer:true,role:"User",credential:"Trainer",image:'Default'})
     })
     //log the person in there push the data
     this.loginwithemailpassword(this.email,this.password)
      
     if(this.Trainerdashboard){
        localStorage.setItem("childdata",JSON.stringify(this.childdata))
        this.$router.push(`/trainerdashboard/${this.id}`)
     }
    //  }else{
    //   this.gohome();
    //   this.clearfields();
    //  }


        //add to trainers
        //take to home page
      //call clear fields
      },
      //function to push childdata to the new formed trainer
      //if child exist push to trainer id if not push to the home
      gohome(){
        this.$router.push({path:'/'})
      },
      goTrainerdashboard(){
         this.$router.push({path:`/support`})
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
             ///login here function and push userdata to localstorage
            // this.PushUserDatatoLS()
             this.clearfields();

             //try check here
             if(!this.Trainerdashboard){
              this.gohome();
             }
            // this.gohome();
          })
      },
      clearfields(){
        this.email = '',
        this.password = ''
      },
      gohome(){
         this.$router.push('/')
      },
    async checkchildid(){
        let _childid = localStorage.getItem('childId')
        if(_childid){
          let docdata = []
        let children = []
        const querySnapshot = await getDocs(collection(db,"Children"))
        querySnapshot.forEach((doc)=>{
          docdata.push(doc.data())
        })
        children = docdata[0].children
         for(let item of children){
           if(item.id === _childid){
             Object.assign(this.childdata,item)
             this.Trainerdashboard = true
           }
         }
        
        return this.childdata
        }
       
     }
     
   },
    created(){
      this.checkchildid()
    }
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

//on signup check the childdata if it exist and push it to the new formed trainer email and delete it from the local

//on signup try pulling the data from the database trainer and get the data and push the userdata into the localstorage






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







check if the child id exist check the child into to the database then go home


///on signup ? login push the userdata to the local storage as well

//sharp check for the just entered or logged in person to return the properties if it exist if not just keep empty
this login function will be later be a global function callable from the the vuex




//after successful signup

a function to check the the localstrorage for the childId if it exists if it does check the child and return as objects else 



