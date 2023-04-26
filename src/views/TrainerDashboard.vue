<template>
  <div>
    <h1>Trainer Dashboard</h1>
    {{ Trainerdetail.name }}
  </div>
</template>

<script>
import {app as app} from '../../firebase'
import { getFirestore,getDocs,doc,collection, updateDoc,arrayUnion } from 'firebase/firestore'
import jwtDecode from 'jwt-decode'
const db = getFirestore(app)
export default {
  name:'TrainerDashboard',
  data(){
    return{
      uniqueid:'',
      Trainerdetail:{
        children:[],
        country:'',
        email:'',
        id:'',
        name:'',
        phone:''
      }
    }
  },
  methods:{
     async getTrainersChildren(){
      let Trainers = [];
       const querySnapshot = await getDocs(collection(db,"Admin"))
       querySnapshot.forEach((doc)=>{
         //console.log(doc.data().Trainers)
         for(let item of doc.data().Trainers){
            Trainers.push(item);
         }
       })
       for(let item of Trainers){
        if(item.id === this.uniqueid){
          console.log(item);
          this.Trainerdetail = {
            children:item.children,
            country:item.country,
            email:item.email,
            id:item.id,
            name:item.name,
            phone:item.phone
          }
        }
       }
       console.log(this.Trainerdetail)
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
    console.log('this is from the users field',users)
    for(let user of users){
        for(let u of user){
          //"Trainer@gmail.com" 
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
 }
  },
  beforeMount(){
    this.PushUserDatatoLS();
  },
  created(){
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