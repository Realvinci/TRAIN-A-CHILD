<template>
  <div class="upload">
       <h1>Upload Child</h1>
         <form @submit.prevent="uploadChildinfo">
            <input v-model="name" placeholder="Enter the Childs name">
            <input v-model="age" placeholder="Enter the childs age">
            <input v-model="proposedcareer" placeholder="Enter the child's proposed career">
            <textarea name="detail" id="detail" cols="30" rows="10" v-model="detail"></textarea>
             <select name="gender" id="gender" @change="getgender">
                <option value="select gender">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
             </select>
             <form @submit.prevent="uploadImage">
             <div class="form-group">
             <label for="exampleFormControlFile1">Image:</label>
             <input type="file" class="form-control-file" @change="getFile()" name="file" id="file">
             <button class="btn btn-primary" @click="uploadImage">Upload</button>
            </div>
            </form>
            <button @click="uploadChildinfo">Submit</button>
         </form>
         <button @click="GoBack">Go Back</button>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app as app} from '../../firebase'
import { arrayUnion, getFirestore ,updateDoc} from "firebase/firestore";
import {v4 as uuidv4} from 'uuid'
const storage = getStorage(app);
const db = getFirestore(app);
import { doc, setDoc } from "firebase/firestore"; 
export default {
 name:'RecruiterChildUpload',
data(){
    return{
        name:'',
        age:'',
        proposedcareer:'',
        detail:'',
        gender:'',
        file:null,
        imageurl:'',
        gender:'',
        childId:'',
        id:this.$route.params.id
    }
},
  methods:{
    getFile(){
     this.file = event.target.files[0];
    },
    getgender(){
        var gender = document.getElementById("gender");
        var value = gender.value;
        //var text = gender.options[gender.selectedIndex].text;
        this.gender = value;
        console.log(this.gender);
    },
    uploadImage(){
       //Create the file metadata
       /**type {any} */
       const metadata = {
        contentType:'image/jpeg'
       };
       //Upload file and metadata to the object 'images/nameofimage.jpeg
       const storageRef = ref(storage, 'children/' + this.file.name)
       const uploadTask = uploadBytesResumable(storageRef,this.file,metadata);

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
            this.imageurl = downloadURL
            console.log(`File available at`, downloadURL)
        })
       }
       )
    },
    async uploadChildinfo(){
    this.childId = uuidv4();
    console.log('uploading child details')
    await updateDoc(doc(db, "Children","yAdO4UC7V9CvLRx0tsbr"), {
        RecruiterChildren:arrayUnion({name:this.name,age:this.age,proposedcareer:this.proposedcareer,detail:this.detail,gender:this.gender,image:this.imageurl,id:this.childId,RecruiterId:this.id,Approved:false,Funded:false})
      });
    //   const AdminDocRef = doc(db, "Admin","C7Jng64ORvLGgCZvRYhy");
    //    await updateDoc(AdminDocRef, {
    //     Children: arrayUnion({name:this.name,age:this.age,proposedcareer:this.proposedcareer,detail:this.detail,gender:this.gender,image:this.imageurl,id:this.childId})
    //   });

     },
     GoBack(){
       this.$router.go(-1)
     }
  }
}
</script>

<style>

</style>



///on each child uploaded get the id of the recruiter from the this.$router.params.id and place on the child uploaded