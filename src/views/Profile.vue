<template>
 <div class="card">
              <div class="card-body">
                  <h3 class="card-title">Name:{{ userData[0].name }}</h3>
                  <h3 class="card-title">Email:{{ userData[0].email }}</h3>
                  <div class="row">
                      <div class="col-lg-5 col-md-5 col-sm-6">
                          <div class="white-box text-center"><img :src="userData[0].image" width="200px;" class="img-responsive"></div>
                      </div>
                     <h3>Upload Profile Image</h3>
            <form @submit.prevent="uploadIdentification">
                <div class="form-group">
                <label for="exampleFormControlFile1">Image:</label>
                <input type="file" class="form-control-file" @change="getiddentification" name="file" id="file">
                <button class="btn btn-primary" @click="uploadIdentification">Upload</button>
                </div>
          </form>
                      <div class="col-lg-12 col-md-12 col-sm-12">
                          <h3 class="box-title mt-5">Edit Info</h3>
                          <div class="table-responsive">
                              <table class="table table-striped table-product">
                                  <tbody>
                                      <tr>
                                          <td> Name</td>
                                          <td><input type="text" v-model="userData[0].name"></td>
                                      </tr>
                                      <tr>
                                          <td> Email</td>
                                          <td><input type="text" v-model="userData[0].email"></td>
                                      </tr> 

                                     
                                  </tbody>
                              </table>
                              <button @click="update">update</button>
                              
                          </div>
                      </div>
                  </div>
              </div>
          </div> 
</template>

<script>
import {app as app} from '../../firebase'
import { collection, getDocs, getFirestore,doc,arrayUnion,arrayRemove,updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL,uploadBytesResumable } from "firebase/storage";
const db = getFirestore(app)
const storage = getStorage(app);
export default {
  data(){
    return{
        id:this.$route.params.id,
        user:{},
        userData:[],
        identification:null,
    }
  },
  methods:{
    async getUserInfo(){
         const querySnapshot = await getDocs(collection(db,"Users"))
         querySnapshot.forEach((doc)=>{
              for(let user of doc.data().Users){
                    if(user.id === this.id){
                         this.userData.push(user)
                         Object.assign(this.user,user)
                    }
              }
         })
    },
    getiddentification(){
    this.identification = event.target.files[0];
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
            this.userData[0].image = downloadURL
            console.log(`File available at`, downloadURL)
           // this.getAlldocs()
        })
       }
       )
    },
    async update(){
        const UserRef = doc(db, "Users", "Users");
     await updateDoc(UserRef, {
        Users: arrayRemove(this.user)
      });
      await updateDoc(UserRef, {
        Users: arrayUnion(this.userData[0])
      });
      alert('Profile updated')
      this.$router.go(-1)
    }
  },
  created(){
     this.getUserInfo()
  }
}
</script>

<style>

</style>