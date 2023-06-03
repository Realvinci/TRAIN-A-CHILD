<template>
   <div>
      <h1>SignUp as Recruiter</h1>
           
         <form @submit.prevent="registerAsRecruiter">
             <label for="name">Enter FullName:</label>
             <input type="text" v-model="name">
             <br>
             <br>
             <label for="Country">Enter Country of Residence:</label>
             <input type="text" v-model="country">
             <br>
             <br>
             <label for="state">Enter state of Residence:</label>
             <input type="text" v-model="state">
             <br>
             <br>
             <label for="address">Enter Home address:</label>
             <input type="text" v-model="address">
             <br>
             <br>
             <label for="email">Enter a valid Email:</label>
             <input type="email" v-model="email">
             <br>
             <br>
             <label for="phone">Enter Mobile Number:</label>
             <input type="number" v-model="phone">
             <br>
             <br>
             <label for="password">Password:</label>
              <input type="password" v-model="password">
              <br>
              <br>
              <label for="confirm">Conmfirm password:</label>
               <input type="password" v-model="confirmpassword">
         </form>
         <br>
         <button @click="registerAsRecruiter">Submit</button>
         <h2>Note:A guarantor form has being sent to the email provided please fill and upload in the upload document page to complete registration</h2>
   </div> 
</template>

<script>
import Downloadfile from '@/components/Downloadfile.vue'
import {app as app} from '../../firebase'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
import jwtDecode from 'jwt-decode';
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);

export default {
   components:{
    Downloadfile
   },
    data(){
        return{
        name:'',
        address:'',
        country:'',
        password:'',
        confirmpassword:'',
        state:'',
        email:'',
        phone:'',
        imageurl:'https://firebasestorage.googleapis.com/v0/b/trach-701b0.appspot.com/o/Guarantor.jpg?alt=media&token=0a965b36-f2e0-412f-abfb-7c59b2c7802a',
        unverifiedRecruits:[],
        docid:'',
        RecruiterId:'',
        signinToken:'',
        Recruiterdashboard:true
      }
        
    },

  methods:{
registerAsRecruiter(){
        createUserWithEmailAndPassword(auth,this.email,this.password)
        .then((userCredential)=>{
          const user = userCredential.user   
          localStorage.setItem("signinToken",user.accessToken)
          localStorage.removeItem("Userdata")
            //1.clear the signinToken from localstorage done
            //2.signup the person on click
            //inside it addtrecruiter
            //3.addTorecruiter space
            //call the login function immidiately afterwards
            //4.login the person with the password
            //5.take the unique id created and push the person to the recruiter/${this.uniqueid}
            this.addTorecruiter();
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.errorMessage
        })
       
  },
     gotoRecruiterDashboard(){
      //${this.RecruiterId}
      console.log('Currently in the recruiter dashboard')
      this.$router.push(`/recruiterdashboard/${this.RecruiterId}`)
     },
     clearfields(){
        this.name = '',
        this.email = '',
        this.country = '',
        this.state = '',
        this.address = '',
        this.phone = '',
        this.password = ''
      ///push the user to the upload credential page //there the user can be promoted if he want to go back home
       
     },
     async addTorecruiter(){
      //name,email,password,state,phone
       this.RecruiterId = uuidv4()
      console.log('Entering trainer info')
        // const querysnapshot = await getDocs(collection(db,"Recruits"))
        // querysnapshot.forEach((doc)=>{
        //   console.log(doc.data())
        // })
      
   
      const RecruitRef = doc(db,"Recruits","Recruits");
        await updateDoc(RecruitRef,{
          unverified:arrayUnion({ id:this.RecruiterId,name:this.name,address:this.address,state:this.state,country:this.country,email:this.email,phone:this.phone,guarantorform:"",Nin:"",verified:false,Trainer:false,role:"User",credential:"Recruit"})
       })
      
      const userRef = doc(db,"Users","Users");
       await updateDoc(userRef,{
      Users:arrayUnion({ id:this.RecruiterId,name:this.name,email:this.email,children:[],Trainer:false,role:"User",credential:"Recruit"})
     })
       this.loginwithemailpassword(this.email,this.password)
       if(this.Recruiterdashboard){
        this.$router.push(`/recruiterdashboard/${this.RecruiterId}`)
       }

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
      checkforsignintokenandClear(){
       
         let _signin = localStorage.getItem("signinToken");
          if(_signin){
             localStorage.removeItem("signinToken")
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
             localStorage.removeItem("docid")
             localStorage.removeItem("Userdata")
             ///login here function and push userdata to localstorage
            // this.PushUserDatatoLS()
            //this.checkTrainer();
             this.clearfields();
            
             //try check here
             if(!this.Recruiterdashboard){
              this.gohome();
             }
            // this.gohome();
          })
      },
      // async checkTrainer(){
      //   let signinToken = localStorage.getItem("signinToken")
      //   let email = jwtDecode(signinToken).email
      //    const querySnapshot = await getDocs("Users");
      //    querySnapshot.forEach((doc)=>{
      //           if(doc.data().email === email){
      //                //check for the trainer field and push to localstorage the  trainer value
      //               if(!doc.data().Trainer){
      //                    let Userdata = {
      //                      Trainer: doc.data().Trainer,
      //                      role:doc.data().role,
      //                      credential:doc.data().credential
      //                    }
      //                     localStorage.setItem("Userdata",JSON.stringify(Userdata))
      //               }
      //           }
      //    })
      // }
  },
  created(){
    this.checkforsignintokenandClear();
    this.checkTrainer()
  }
  
}
</script>

<style>

</style>

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






signup the user then that pushes the signintoken to the localstorage which in turn pushes the use 



// basically search the localstoarge for signinToken if any exist clear it out and put the new one there 
that carries the login token and login the new user for the duration 

//clearfirst
clearoutthe signinToken(){
   let signinToken = localStorage.getItem("signinToken");
   if(signinToken){
     localstorage.removeItem("signinToken")
   }else{
    return false
   }
}
signup(){
  
}
login();













onloggin check the localstorage if signinToken exist 
clear it out and set the











downloadimage(url) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = () => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(xhr.response);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.setAttribute("download", "test");
    link.setAttribute("target", "new");
    document.body.appendChild(link);
    link.click();
  };
  xhr.open("GET", url);
  xhr.send();
},
 tryimagedownload(url){
  getDownloadURL(ref(storage, 'image/Guarantor.jpg'))
  
.then((url) => {
const xhr = new XMLHttpRequest();
xhr.responseType = 'blob';
xhr.onload = () => {
  var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(xhr.response);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.setAttribute("download", "test");
    link.setAttribute("target", "new");
    document.body.appendChild(link);
    link.click();
};
xhr.open('GET', url);
xhr.send();

// Or inserted into an <img> element
const img = document.getElementById('myimg');
img.setAttribute('src', url);
})
.catch((error) => {
// Handle any errors
});
 }





///basicallly request for the guanrantor form and submit other information and come back later to submit the other information

//onsubmit here the notification comes up that tells you that you have a guarantor form sent to you


