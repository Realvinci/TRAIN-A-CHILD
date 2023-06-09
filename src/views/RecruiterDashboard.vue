<template>
    <div class="Recruiter">
      
         <img src="../assets/default1.png" alt="" width="200px;">
          <h3 style="padding-top:10px;">Welcome</h3>
          {{ Recruiterdetail.name}}.
           <div v-if="notcomplete">
               <h4>Complete your registration to get Verified.</h4>
               <div class="upload credentials">
       <h3>Upload credentials</h3>
        <label for="gurantor form">Filled Gurantor form</label>
        <form @submit.prevent="uploadguarantor">
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
           </div>
           <div v-else>
                <h5>Verified.</h5>
                <div v-if="children">
                  <h1>Children</h1>
                <div  v-for="(child,i) in children" :key="i">
                  <router-link :to="`/recruiterchildedit/${child.id}`">
                    <img :src="child.image" style="width:100px;">
                  </router-link>
                   <h6>{{ child.name }}</h6>
                   <h6>{{ child.proposedcareer }}</h6>
                </div>
                </div>
                <div v-else>
                    <h3>No Children Recruited yet</h3>
                </div>
               
                    <button @click="uploadChild">Upload</button>
                
           </div>

    </div>
</template>

<script>
import {app as app} from '../../firebase'
import { getFirestore,getDocs,doc,collection, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { getDownloadURL,getStorage,ref,uploadBytesResumable } from 'firebase/storage';
import jwtDecode from 'jwt-decode';

const db= getFirestore(app)
const storage = getStorage(app)
export default {
  name:'RecruiterDashboard',
  data(){
    return{
      guarantor:null,
      identification:null,
      guarantorformimageurl:'',
      identificationformurl:'',
     email:'',
     Recruiterdetail:{},
     uploadkiddisable:false,
     notcomplete:true,
     identification:{},
     guarantor:{},
     children:[],
     id:this.$route.params.id
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
       this.id = value;
       console.log(this.id)
    },
    getfile2(){
       this.identification = event.target.files[0];
    },
    uploadguarantor(){
         const metadata = {
           contentType:'image/jpeg'
         };
         //Upload file and metadata to the object 'image/nameofimage.jpeg
         const storageRef = ref(storage,'credential/' + this.guarantor.name)
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
              //User cancelled the upload
              break;
            case 'storage/unknown':
               //Unknown error occurred, inspect error.serverResponse
               break;    
          }
         },
         ()=>{
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            this.guarantorformimageurl = downloadURL
            console.log(`File available at`,downloadURL)
            //this.getAlldocs
             this.saveToguarantor(downloadURL)
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
            //this.getAlldocs()
            this.saveIdentification(downloadURL)
        })
       }
       )
    },
     async checkforplayerexistenceinTrainers(){
         let email = this.getEmail()
        const querySnapshot = await getDocs(collection(db,"Trainer"))
        querySnapshot.forEach((doc)=>{
          if(doc.data().email!=email)
          localStorage.removeItem("childdata")
        })
     },
     getEmail(){
       let signinToken = localStorage.getItem("signinToken")
       this.email = jwtDecode(signinToken).email
       return this.email
     },
     async getUserDetail(){
        const querySnapshot = await getDocs(collection(db,"Recruits"))
        querySnapshot.forEach((doc)=>{
             for(let item of doc.data().unverified){
                 if(this.email === item.email){
                   this.Recruiterdetail ={
                     name:item.name,
                     email:item.email,
                     id:item.id,
                      address:item.address,
                      phone:item.phone,
                      role:item.role,
                      state:item.state,
                      country:item.country,
                      credential:item.Credential,
                      verified:item.verified
                   }
                 }
             }
        })
         
        this.uploadkiddisable = this.Recruiterdetail.verified
     },
     async childuploadcheck(){
           const querySnapshot = await getDocs(collection(db,"Recruits"))
           querySnapshot.forEach((doc)=>{
                 for(let item of doc.data().unverified){
                    if(this.email === item.email){
                        if(item.verified){
                          return true
                        }else{
                          return false
                        }
                    }
                 }
           })
         
     },
     async getChildren(){
          const querySnapshot = await getDocs(collection(db,"Children"))
          querySnapshot.forEach((doc)=>{
             for(let item of doc.data().RecruiterChildren){
                 if(item.RecruiterId === this.id){
                    
                    this.children.push(item)
                 }
             }
          })
     },
     async checkforCompleteregistration(){
        const querySnapshot = await getDocs(collection(db,"Recruits"))
        querySnapshot.forEach((doc)=>{
              for(let item of doc.data().unverified){
                if(item.guarantorform==""){
                   console.log('Fill in all fields')
                }
              }
        })
     },
     async saveToguarantor(formurl){
      const UnverifiedRecruitRef = doc(db,"Recruits","Recruits")
       //get the actual guantantor from the email 
        this.guarantor = {}
         const querySnapshot = await getDocs(collection(db,"Recruits"))
        querySnapshot.forEach((doc)=>{
              for(let item of doc.data().unverified){
                   if(item.email === this.email){
                    console.log(item)
                    //copythis object with the new guarantor in it then delete it and update
                        gurantor = {
                          id:item.id,
                          verified:item.verified,
                          name:item.name,
                          Credential:item.Credential,
                          Nin:item.Nin,
                          country:item.country,
                          address:item.address,
                          email:item.email,
                          state:item.state,
                          role:item.role,
                          phone:item.phone,
                          guarantorform:formurl
                        }
                     console.log('from the guantor form',this.guarantor)
                     updateDoc(UnverifiedRecruitRef,{
                      unverified:arrayUnion(this.guarantor)
                     })
                     updateDoc(UnverifiedRecruitRef,{
                        unverified:arrayRemove(item)
                     })
                   }
              }
        }) 
     },
     async saveIdentification(idUrl){
        const UnverifiedRecruitRef = doc(db,"Recruits","Recruits")
       
        const querySnapshot = await getDocs(collection(db,"Recruits"))
        querySnapshot.forEach((doc)=>{
            for(let item of doc.data().unverified){
              if(item.email ===this.email){
                this.identification = {
                          id:item.id,
                          verified:item.verified,
                          name:item.name,
                          Credential:item.Credential,
                          Nin:item.Nin,
                          country:item.country,
                          address:item.address,
                          email:item.email,
                          state:item.state,
                          role:item.role,
                          phone:item.phone,
                          guarantorform:formurl
                        }
                  console.log('from the identification form',this.identification)  
                  updateDoc(UnverifiedRecruitRef,{
                    unverified:arrayUnion(this.identification)
                  })     
                  updateDoc(UnverifiedRecruitRef,{
                     unverified:arrayRemove(this.identification)
                  })
              }
               
            }
        })
     },
    async checkVerified(){
      const querySnapshot = await getDocs(collection(db,"Recruits"))
      querySnapshot.forEach((doc)=>{
          for(let recruit of doc.data().Verified){
              if(recruit.email === this.email){
                  this.notcomplete = false
              }
          }
      })
    },
    uploadChild(){
      //recruiterchildupload/${this.id}
       this.$router.push(`/recruitchildupload/${this.id}`)
    }
  },
  created(){
    console.log(this.id)
    this.checkVerified()
     //this.saveToguarantor();
     this.checkforCompleteregistration()
     this.childuploadcheck()
     this.getUserDetail()
     this.checkforplayerexistenceinTrainers()
     this.getChildren()
  }
}
</script>

<style>

</style>




The recruiter dashboard should have the upload form from the email guarantor formed 
as well as the the picture of the dp and the the child dashboard empty and the upload button disabled
if disable remind check if is verified if not in verified ctell the user to upload the empty fields else and say you are not registered