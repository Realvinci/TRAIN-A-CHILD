<template>
  <!-- <div>
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
         
  </div> -->
  <div class="trainerDashboard">
    
      <ul>
        <router-link :to="`/profile/${ID}`">
          <li>Profile</li>
        </router-link>
        <router-link to="/">
          <li>Home</li>
        </router-link>
        <router-link to="/">
          <li>Logout</li>
        </router-link>
       </ul>
   
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
      children:[],
      ID:this.$route.params.id
    }
  },
  methods:{
     async getTrainersChildren(){
      let Trainers = [];
       const querySnapshot = await getDocs(collection(db,"Trainers"))
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
    let trainerinfo ={}
    let trainera = []
    let childdata = localStorage.getItem('childdata')
    childdata = JSON.parse(childdata)
    if(!childdata){
         const querySnapshot = await getDocs(collection(db,"Trainers"))
         querySnapshot.forEach((doc)=>{
             for(let trainer of doc.data().Trainers){
                 if(trainer.id === this.ID){
                    console.log(trainer)
                    trainera.push(trainer)
                    Object.assign(trainerinfo,trainer)
                 }
             }
         })
         const TrainerRef = doc(db,"Trainers","Trainers")
      
    }
 },

 //check the localstorage and get the child id from there and check the database and get the child with that id and update the children 
  async checkforchildupdate(){
     let id = localStorage.getItem('childId')
     
     const Traineref = doc(db, "Trainers","Trainers");
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
     
  },
  
  },
  beforeMount(){
    this.PushUserDatatoLS();
   
  },
  created(){
     //this.getNumberofChildren()
   // this.checkforchildupdate()
  //   this.getDocid()
  //   this.checkforprofilepicture();
  //  this.getEmail()
      this.checklsforchilddata()
  //    this.getparamid();
  //    this.getTrainersChildren();
     
  }
}
</script>

<style>

</style>

//getchildid and clear upon turning it to the childdata

///check the localstorage for the childdata if it exist parse it and arrayUnion it to the 