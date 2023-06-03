<template>
  <div class="upload credentials">
       <h3>Upload credentials</h3>
        <label for="gurantor form">Filled Gurantor form</label>
        <form @submit.prevent=" uploadguarantor">
             <div class="form-group">
             <label for="exampleFormControlFile1">Image:</label>
             <input type="file" class="form-control-file" @change="getguarantor" name="file" id="file">
             <button class="btn btn-primary" @click="uploadguarantor">Upload</button>
            </div>
          </form>
        <h3>Upload any other form of identication</h3>
       <select name="identfication" id="identification" @change="getId">
         <option value="select">Select</option>
         <option value="nin">National identity Card</option>
         <option value="Driver's licence">Drivers licence</option>
       </select>
        <br>
        <br>
        <form @submit.prevent="uploadIdentification">
             <div class="form-group">
             <label for="exampleFormControlFile1">Image:</label>
             <input type="file" class="form-control-file" @change="getiddentification" name="file" id="file">
             <button class="btn btn-primary" @click="uploadIdentification">Upload</button>
            </div>
          </form>
  </div>
</template>

<script>
import {app as app} from '../../firebase'
import { getStorage, ref, getDownloadURL,uploadBytesResumable } from "firebase/storage";
import jwt_decode from 'jwt-decode'
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
const db = getFirestore(app)
const storage = getStorage(app);
export default {
 data(){
  return{
     guarantor:null,
     identification:null,
     id:'',
     guarantorformimageurl:'',
     identificationformurl:'',
     useremail:''
  }
 },
 methods:{
  getguarantor(){
    this.guarantor = event.target.files[0];
  },
  getiddentification(){
    this.identification = event.target.files[0];
  },
  getId(){
        var id = document.getElementById("identification");
        var value = id.value;
        //var text = gender.options[gender.selectedIndex].text;
        this.id = value;
        console.log(this.id);
    },
  getfile2(){
    this.identification = event.target.files[0];
  },
  uploadguarantor(){
       //Create the file metadata
       /**type {any} */
       const metadata = {
        contentType:'image/jpeg'
       };
       //Upload file and metadata to the object 'images/nameofimage.jpeg
       const storageRef = ref(storage, 'credential/' + this.guarantor.name)
       const uploadTask = uploadBytesResumable(storageRef,this.guarantor,metadata);

       //Listen for state changes,errors, and completion of the upload
       uploadTask.on('state_changed',
       (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`)
        switch(snapshot.state){
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
               console.log("Upload is running");
               break;  
        }
       },
       (error)=>{
         switch(error.code){
            case 'storage/unauthorized':
                //User doesnt have permission to access the object
                break;
            case 'storage/canceled':
                //User canceled the upload
                break;
            // ...
            case 'storage/unknown' :
               // Unknown error occurred, inspect error.serverResponse
             break;
         }
       },
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            this.guarantorformimageurl= downloadURL
            console.log(`File available at`, downloadURL)
            this.getAlldocs()
        })
       }
       )
       
    },
    uploadIdentification(){
       //Create the file metadata
       /**type {any} */
       const metadata = {
        contentType:'image/jpeg'
       };
       //Upload file and metadata to the object 'images/nameofimage.jpeg
       const storageRef = ref(storage, 'credential/' + this.identification)
       const uploadTask = uploadBytesResumable(storageRef,this.identification,metadata);

       //Listen for state changes,errors, and completion of the upload
       uploadTask.on('state_changed',
       (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`)
        switch(snapshot.state){
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
               console.log("Upload is running");
               break;  
        }
       },
       (error)=>{
         switch(error.code){
            case 'storage/unauthorized':
                //User doesnt have permission to access the object
                break;
            case 'storage/canceled':
                //User canceled the upload
                break;
            // ...
            case 'storage/unknown' :
               // Unknown error occurred, inspect error.serverResponse
             break;
         }
       },
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            this.identificationformurl = downloadURL
            console.log(`File available at`, downloadURL)
            this.getAlldocs()
        })
       }
       )
    },
    getUser(){
      const userToken = localStorage.getItem('signInToken')
      let token = userToken
      let decoded = jwt_decode(token);
      let email = decoded.email
      this.useremail = email
    },
    async getAlldocs(){
      const querySnapshot = await getDocs(collection(db, "Admin"));
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().UnverifiedRecruit);
      const unverifiedRecruit = doc.data().UnverifiedRecruit
      console.log(unverifiedRecruit)
      for(let user of unverifiedRecruit){
        if(this.useremail == user.email)
        {
         user.identificationformurl = this.identificationformurl
         user.guarantorformimageurl = this.guarantorformimageurl
         const AdminDocRef = doc(db, "Admin","C7Jng64ORvLGgCZvRYhy");
        }
      }
      console.log(doc.data().unverifiedRecruit)
     });
    }
 },
 created(){
   this.getUser() 
   this.getAlldocs()
 }
}
</script>

<style>

</style>


///get access to te 
///find the user and update the credential part