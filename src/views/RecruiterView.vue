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
              <input type="text" v-model="password">
              <br>
              <br>
              <label for="confirm">Conmfirm password:</label>
               <input type="text" v-model="confirmpassword">
         </form>
         <br>
         <button @click="registerAsRecruiter">Submit</button>
         <h2>Note:A guarantor form has being sent to the email provided please fill and upload in the upload document page to complete registration</h2>
   </div> 
</template>

<script>
//import imageDataURI from 'image-data-uri'
//const imageDataURI = require('image-data-uri');
//import { saveAs } from 'file-saver'
import saveAs from 'file-saver'
import axios from 'axios'
import Downloadfile from '@/components/Downloadfile.vue'
import {app as app} from '../../firebase'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
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
        RecruiterId:''
      }
        
    },

  methods:{
registerAsRecruiter(){
        //has access to dashboard and the children his training 
        //1.Dashboard created and takes you there imidiately
        //2.all kids you are training
        //3.*progress of the kid
        //4.probably access to searchbox
        createUserWithEmailAndPassword(auth,this.email,this.password)
        .then((userCredential)=>{
            //Signed in
            this.addTorecruiter(this.name,this.email,this.country,this.state,this.address,this.mobile,this.password);
            //clear the input fields
           
            const user = userCredential.user
            console.log(user)
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.errorMessage
        })
        
     },
     clearfields(){
        this.name = '',
        this.email = '',
        this.country = '',
        this.state = '',
        this.address = '',
        this.phone = '',
        this.password = '',
        alert('upload credentials to complete registration')
      ///push the user to the upload credential page //there the user can be promoted if he want to go back home
       
     },
     async addTorecruiter(name,email,password,state,phone){
      this.RecruiterId = uuidv4();
      console.log('Entering trainer info')
      const querySnapshot = await getDocs(collection(db, "Admin"));
      querySnapshot.forEach((doc) => {
       this.docid = doc.id
     console.log(doc.id, " => ", doc.data().UnverifiedRecruit);
     });
       const AdminDocRef = doc(db, "Admin",this.docid);
     await updateDoc(AdminDocRef, {
      
       UnverifiedRecruit: arrayUnion({name:this.name,email:this.email,password:this.password,state:this.state,phone:this.phone,id:this.RecruiterId})
    });
    this.clearfields()
     },
 
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
  },
  created(){
   
  }
  
}
</script>

<style>

</style>





///basicallly request for the guanrantor form and submit other information and come back later to submit the other information

//onsubmit here the notification comes up that tells you that you have a guarantor form sent to you


