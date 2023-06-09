<template>
         <div class="card">
              <div class="card-body">
                  <h3 class="card-title">{{ childInfo[0].name }}</h3>
                  <div class="row">
                      <div class="col-lg-5 col-md-5 col-sm-6">
                          <div class="white-box text-center"><img :src="childInfo[0].image" width="200px;" class="img-responsive"></div>
                      </div>
                      <div class="col-lg-7 col-md-7 col-sm-6">
                          <h4 class="box-title mt-5">Child Details</h4>
                          <p>{{ childInfo[0].description }}</p>
                          <h2 class="mt-5">
                            Gender: {{ childInfo[0].gender }}
                          </h2>
                          <h2 class="mt-5">
                            Age: {{ childInfo[0].age }}
                          </h2>
                          <h2 class="mt-5">
                             Progress: 
                             <li v-for="(progress,i) in childInfo[0].Progress" :key="i">
                                Class:{{ progress.Class }}
                                Result: <img :src="progress.ResultSheet" alt="">
                                Remark:{{ progress.Remark }}
                             </li>
                          </h2>
                          <h2 class="mt-5">
                            Funded: {{ childInfo[0].Funded }}
                          </h2>
                          <h2 class="mt-5">
                            Amount:N {{ childInfo[0].Amount }}
                          </h2>
                          <h2 class="mt-5">
                            School Fees:{{ childInfo[0].SchoolFees }}
                          </h2>
                         <button v-if="CanPay" class="btn btn-primary">PayFees</button>
                      </div>
                      <div class="col-lg-12 col-md-12 col-sm-12">
                          <h3 class="box-title mt-5">Edit/Update Info</h3>
                          <div class="table-responsive">
                              <table class="table table-striped table-product">
                                  <tbody>
                                      <tr>
                                          <td width="390">Name</td>
                                          <td><input type="text" v-model="childInfo[0].name"></td>
                                      </tr>
                                      <tr>
                                          <td>Age</td>
                                          <td><input type="text" v-model="childInfo[0].age"></td>
                                      </tr>
                                      <tr>
                                          <td>Child Detail</td>
                                          <td><textarea  id="" cols="30" rows="10" v-model="childInfo[0].detail"></textarea></td>
                                      </tr>
                                  </tbody>
                              </table>
                              <h1>Progress Result</h1>
                                 <form @submit.prevent="uploadResult">
                                    <label for="Remark">Remark:</label>
                                    <input type="text" v-model="progress.Remark">
                                    <label for="Remark">Class:</label>
                                     <input type="text" v-model="progress.Class">
                                      <div class="form-group">
                                      <label for="exampleFormControlFile1">Image:</label>
                                     <input type="file" class="form-control-file" @change="getResult" name="file" id="file">
                                     <button class="btn btn-primary" @click="uploadResult">Upload</button>
                                     </div>
                                 </form>
                              <button @click="update">update</button>
                              <button @click="deleteChild">Delete</button>
                              <button @click="goBack">Back</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div> 
</template>

<script>
import {app as app} from '../../../firebase'
import { arrayRemove, arrayUnion, collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL,uploadBytesResumable } from "firebase/storage";
const db = getFirestore(app)
const storage = getStorage(app);
export default {
   data(){
      return{
        id:this.$route.params.id,
        Result:null,
        child:{},
        childInfo:[],
        CanPay:false,
        progress:{
            Class:'',
            Remark:'',
            ResultSheet:''
        }
      }
   },
   methods:{
     async getChild(){
        const querySnapshot = await getDocs(collection(db,"Children"))
        querySnapshot.forEach((doc)=>{
             for(let child of doc.data().children){
                  if(child.id === this.id){
                     Object.assign(this.child,child)
                     this.childInfo.push(child)
                  }
             }
        })
     },
     getResult(){
       this.Result = event.target.files[0];
      },
      uploadResult(){
       //Create the file metadata
       /**type {any} */
       const metadata = {
        contentType:'image/jpeg'
       };
       //Upload file and metadata to the object 'images/nameofimage.jpeg
       const storageRef = ref(storage, 'Result/' + this.Result)
       const uploadTask = uploadBytesResumable(storageRef,this.Result,metadata);

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
            this.progress.ResultSheet = downloadURL
            console.log(`File available at`, downloadURL)
            //this.getAlldocs() function that get the url and push to the 
          
        })
       }
       )
    },
     async update(){
        const ChildrenRef = doc(db,"Children","yAdO4UC7V9CvLRx0tsbr")
         if(this.progress.Remark!='' || this.progress.ResultSheet!='' || this.progress.Class){
             this.childInfo[0].Progress.push(this.progress)
         }
         await updateDoc(ChildrenRef,{
           Children:arrayRemove(this.child)
         });
         await updateDoc(ChildrenRef,{
            Children:arrayUnion(this.childInfo[0])
         })
         this.$router.go(-1)
     },
     async deleteChild(){
        const ChildrenRef = doc(db,"Children","yAdO4UC7V9CvLRx0tsbr")
        await updateDoc(ChildrenRef,{
            Children:arrayRemove(this.child)
        })
        await updateDoc(ChildrenRef,{
            children:arrayRemove(this.child)
        })
        this.$router.go(-1)
      },
     goBack(){
       this.$router.go(-1)
     },
     payFees(){
          
     },
     async checkforEnough(){
        const querySnapshot = await getDocs(collection(db,"Children"))
        querySnapshot.forEach((doc)=>{
             for(let child of doc.data().children){
                  if(child.id === this.id){
                        if(child.Amount > child.SchoolFees){
                            this.CanPay = true
                        }
                  }
             }
        })
     }
   },
   created(){
      this.getChild()
      this.checkforEnough()
   }

}
</script>

<style>

</style>



//amount
//funded
//payment btn 
//Delete Child
//Child Progress
//upload progress image 
//Edit Child detail
//should carry approved true