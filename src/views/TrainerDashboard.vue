<template>
  <div>
     <div v-if="!profilepicture">
      <img src="../assets/trainerdefault.jpg" alt="" width="200px;">
     </div> 
     <div >
        <img :src="profilepictureUrl" alt="" width="200px">
     </div>
  
          <h3 style="padding-top:10px;">Welcome</h3>
           {{ Trainerdetail.name }}
           <h2>Thank you!</h2>
           <form @submit.prevent="uploadDisplayPic">
                <div class="form-group">
                <label for="exampleFormControlFile1">Image:</label>
                <input type="file" class="form-control-file" @change="getdisplaypic" name="file" id="file">
                <button class="btn btn-primary" @click="uploadDisplayPic">Upload</button>
            </div>
          </form>
           <div class="children">
                  <div v-for="(child,i) in children" :key="i">
                          <router-link :to="`/TraineeChildDetail/${child.id}`">
                            <img :src="child.image" alt="" width="100px">
                            <h3>{{ child.name }}</h3>
                          </router-link>
                  </div>
           </div>
           <router-link to="/">
            <button class="btn btn-primary">Home</button>
           </router-link>
         
  </div>
</template>

<script>
import {app as app} from '../../firebase'
import { getFirestore,getDocs,doc,collection, updateDoc,arrayUnion, setDoc } from 'firebase/firestore'
import jwtDecode from 'jwt-decode'
import {getDownloadURL,uploadBytesResumable,ref,getStorage } from 'firebase/storage'
const db = getFirestore(app)
const storage = getStorage(app)
export default {
  name:'TrainerDashboard',
  data(){
    return{
      uniqueid:'',
      email:'',
      Trainerdetail:{},
      dp:'',
      display:null,
      id:'',
      profilepicture:false,
      profilepictureUrl:'',
      newchildDetail:{},
      children:[]
    }
  },
  methods:{
    getdisplaypic(){
      this.display = event.target.files[0];
    },
     async getTrainersChildren(){
      let Trainers = [];
       const querySnapshot = await getDocs(collection(db,"Trainer"))
       querySnapshot.forEach((doc)=>{
           if(doc.data().email === this.email){
             //  console.log(doc.data())
               this.Trainerdetail ={
                  name:doc.data().name,
                  id:doc.data().id,
                  email:doc.data().email,
                  children:doc.data().Children
               },
               this.children = doc.data().Children
           }
       })
      
      
     },
     getparamid(){
       this.uniqueid = this.$route.params.id
        
     },
     async PushUserDatatoLS(){
  //return the credential and the role
  //get the email and  ....carryout a check on the localstorage find out if the signintoken exist and get the signintoken from there and decode to get the email if it doesnt exist get the this.email
  //on press login get the this.email and replace the email here 
     
   let siginToken = localStorage.getItem("signinToken");
   let email = jwtDecode(siginToken).email
   
  let users = []; 
  const querySnapshot = await getDocs(collection(db,"Users"))
    querySnapshot.forEach((doc)=>{
         users.push(doc.data().Users)
    })
   
    for(let user of users){
        for(let u of user){
          if(email === u.email){
            
            let userdata = {
               Trainer : u.Trainer,
               role:u.role,
               credential:u.credential
             }
            
           localStorage.setItem("Userdata",JSON.stringify(userdata))
          }
        }
    }
   
 },
async checklsforchilddata(){
  //get add and delete it from the local storage
  let childdata = localStorage.getItem('childdata')
   childdata = JSON.parse(childdata)
   if(childdata){
      //add to the trainer section
      //1.get the email ref 
       let email = localStorage.getItem('signinToken')
       email = jwtDecode(email).email
       let ref;
        const querySnapshot = await getDocs(collection(db,"Trainer"))
         querySnapshot.forEach((doc)=>{
              if(doc.data().email === email){
                ref = doc.id
              }
         })
         const TrainerRef = doc(db,"Trainer",ref)
      await updateDoc(TrainerRef,{
        children:arrayUnion(childdata)
       })
       //clear the ls for the particular
       localStorage.removeItem("childId");
   }
   localStorage.removeItem("childdata")
 },
 uploadDisplayPic(){
     const metadata = {
         contentType:'image/jpeg'
     };
     //Upload file and metadata to the object 'image/nameofimage.jpeg
     const storageRef = ref(storage,'credential/'+ this.display.name)
     const uploadTask = uploadBytesResumable(storageRef,this.display,metadata);
     //Listen for state changes, errors, and completion of the upload
     uploadTask.on('state_changed',
     (snapshot)=>{
       const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
       console.log(`Upload is ${progress}% done`)
       switch(snapshot.state){
          case 'paused':
            console.lg('Upload is paused');
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
            //Unknown error occured, inspect error.serverResponse
            break;
      }
     },
     ()=>{
       getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
         this.dp =downloadUrl
         console.log(`File avalable at`,downloadUrl)
         this.savedp(downloadUrl)
         window.location.reload()
       })
     }
     )
 },
 async savedp(imageurl){
    let signInToken = localStorage.getItem("signinToken")
     let email = jwtDecode(signInToken).email
     let item ={}
   //get access to the user from the trainers
    let docid = localStorage.getItem("docid")
     const TrainerRef = doc(db, "Trainer",docid);
     const querySnapshot = await getDocs(collection(db,"Trainer"))
     querySnapshot.forEach((doc)=>{
          if(doc.data().email == email){
              console.log('The properties',doc.data())
               item = {
                 name:doc.data().name,
                 Children:doc.data().Children,
                 email:doc.data().email,
                 credential:doc.data().credential,
                 id:doc.data().id,
                 role:doc.data().role,
                 Trainer:doc.data().Trainer,
                 
              }
             
          }
         
     })
    
     console.log('this are items of the object item',item)
     await setDoc(TrainerRef,{
               Children:item.Children,
               email:item.email,
               credential:item.credential,
               id:item.id,
               role:item.role,
               Trainer:item.Trainer,
               dp:imageurl
     })
 },
  getEmail(){
    let signinToken = localStorage.getItem("signinToken")
    let email = jwtDecode(signinToken).email
    this.email = email
 },
 async getDocid(){
   let signinToken = localStorage.getItem("signinToken")
   let email = jwtDecode(signinToken).email
    const querySnapshot = await getDocs(collection(db,"Trainer"))
       querySnapshot.forEach((doc)=>{
           if(doc.data().email === email){
              this.id = doc.id          
              }
       })
     localStorage.setItem("docid",this.id)
 },
 async checkforprofilepicture(){
   let signin = localStorage.getItem("signinToken")
   let email = jwtDecode(signin).email
   const querySnapshot = await getDocs(collection(db,"Trainer"))
    querySnapshot.forEach((doc)=>{
        if(doc.data().email === email){
            //checkfor existence of propertie
            if(doc.data().dp){
               console.log('Picture exists');
               this.profilepicture = true
               this.profilepictureUrl = doc.data().dp
               console.log(this.profilepicture)
            }else{
               console.log('Picture doesnt exists')
            }
        }
    })
    
 },
 //check the localstorage and get the child id from there and check the database and get the child with that id and update the children 
  async checkforchildupdate(){
     let id = localStorage.getItem('childId')
     let docid = localStorage.getItem('docid')
     const Traineref = doc(db, "Trainer", docid);
     if(id){
      const querySnapshot = await getDocs(collection(db,"Children"))
     querySnapshot.forEach((doc)=>{
        for(let child of doc.data().children){
            if(id === child.id){
                //basically get the child detail 

                 Object.assign(this.newchildDetail,child)
                localStorage.removeItem('childId')
                 
                 let find = this.children.find(child=>child.id === this.newchildDetail.id)
                 if(!find){
                      //push it into the  this.child  and update the online record with the this.newchild
                      this.children.push(this.newchildDetail)
                       updateDoc(Traineref,{
                        Children:arrayUnion(this.newchildDetail)
                       })
                       alert('A new Child has Being Added');
                 }
            }
        }
     })
     }
     
  }
  },
  beforeMount(){
    this.PushUserDatatoLS();
   
  },
  created(){
    this.checkforchildupdate()
    this.getDocid()
    this.checkforprofilepicture();
   this.getEmail()
     this.checklsforchilddata()
     this.getparamid();
     this.getTrainersChildren();
     
  }
}
</script>

<style>

</style>

//getchildid and clear upon turning it to the childdata

///check the localstorage for the childdata if it exist parse it and arrayUnion it to the 