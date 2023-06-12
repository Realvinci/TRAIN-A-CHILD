<template>
   <div class="admin">
      <ul>
        <router-link :to="`/profile/${id}`">
          <li>Profile</li>
        </router-link>
        <router-link to="/adminTrainers">
           <li>Trainers</li>
        </router-link>
        <router-link to="/adminChildren">
           <li>Children</li>
        </router-link>
        <router-link to="/adminRecruits">
            <li>Recruits</li>
        </router-link>
        <router-link to="/">
            <li>Home</li>
        </router-link>
        <router-link to="">
            <li>Logout</li>
        </router-link>
      </ul>
      <h3>No of Trainers: {{ NoOfTrainers }}</h3>
      <h3>No of Kids: {{ NoOfChildren }}</h3>
      <h3>No of Recruits: {{ NoOfRecruits }}</h3>
   
<div class="container text-center">    
  <div class="row">
    <div class="col">
      <h3>Trainers</h3>
      <ul>
         <li v-for="trainer in Trainers" :key="trainer.id">
             <router-link :to="`/adminTrainerinfo/${trainer.id}`">
               {{ trainer.name }}
             </router-link>
         </li>
      </ul>
    </div>
    <div class="col">
      <h3>Kids</h3>
      <ul>
         <li v-for="kid in Children" :key="kid.id">
            <router-link :to="`/adminChildDetail/${kid.id}`">
               {{ kid.name }}
            </router-link>
           
         </li>
      </ul>
    </div>
    <div class="col">
      <h3>Recruits</h3>
      <ul>
         <li v-for="recruit in VerifiedRecruits" :key="recruit.id">
            <router-link :to="`/recruiter/${recruit.id}`">
                 {{ recruit.name }}
            </router-link>
            
         </li>
      </ul>
    </div>
  </div>
</div>
   </div>
</template>

<script>
import {app as app} from '../../firebase'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import jwtDecode from 'jwt-decode'
const db = getFirestore(app)
export default {
   name:'AdminDashboard',
   data(){
       return{
        FundedKids:[],
        UnfundedKids:[],
        VerifiedRecruits:[],
        UnverifiedRecruits:[],
        Children:[],
        Trainers:[],
        CompletedReg:[],
        Uncompleted:[],
        Recruiterchildren:[],
        email:'',
        id:'',
        NoOfChildren:0,
        NoOfTrainers:0,
        NoOfRecruits:0
       }

   },
   methods:{
    async getAllTrainers(){
      //get the trainer details in an array with th children there are training and return as an arrau
        const querySnapshot = await getDocs(collection(db,"Trainer"))
        querySnapshot.forEach((doc)=>{
              //console.log('this are the Trainers',doc.data())
               this.NoOfTrainers +=1

              this.Trainers.push(doc.data())
             
        })
        console.log(this.NoOfTrainers)
    },
    async getChildren(){
        const querySnapshot = await getDocs(collection(db,"Children"))
        querySnapshot.forEach((doc)=>{
            for(let child of doc.data().children){
              this.Children.push('This is part of the child',child)
              this.NoOfChildren +=1
            }
           for(let child of doc.data().RecruiterChildren){
                console.log('This is part of Recruiter children',child)
                this.Recruiterchildren.push(child)
           }
        })
    },
     async getVerifiedRecruits(){
        const querySnapshot = await getDocs(collection(db,"Recruits"))
         querySnapshot.forEach((doc)=>{
             for(let recruit of doc.data().Verified){
                   this.NoOfRecruits += 1;
                   this.VerifiedRecruits.push(recruit)
             }
         })
     },
     async getUnverified(){
       const querySnapshot = await getDocs(collection(db,"Recruits"))
       querySnapshot.forEach((doc)=>{
             for(let unverified of doc.data().unverified){
                  this.UnverifiedRecruits.push(unverified)
                   console.log(unverified)
             }
       })
     },
     async uncompleted(){
        const querySnapshot = await getDocs(collection(db,"Recruits"))
        querySnapshot.forEach((doc)=>{
             for(let recruit of doc.data().unverified){
                 if(recruit.Nin===''|| recruit.guarantorform === ''){
                     this.Uncompleted.push(recruit)
                 }
             }
        })
        console.log('This are the uncompleted',this.Uncompleted)
     },
     async completed(){
        const querySnapshot = await getDocs(collection(db,"Recruits"))
        querySnapshot.forEach((doc)=>{
              for(let recruit of doc.data().unverified){
                   if(recruit.Nin !='' || recruit.guarantorform !=''){
                        this.CompletedReg.push(recruit)
                   }
              }
        })
     },
     async getFunded(){
        const querySnapshot = await getDocs(collection(db,"Children"))
        querySnapshot.forEach((doc)=>{
               for(let item of doc.data().children){
                   if(item.Funded){
                      console.log(item)
                      this.FundedKids.push(item)
                   }
               }
        })
     },
     async getUnFunded(){
       const querySnapshot = await getDocs(collection(db,"Children"))
       querySnapshot.forEach((doc)=>{
          for(let item of doc.data().children){
             if(!item.Funded){
               
                console.log(item)
             }
          }
       })
     },
     getEmail(){
         let signinToken = localStorage.getItem('signinToken')
         this.email = jwtDecode(signinToken).email
         console.log(this.email)
     },
     async getId(){
        const querySnapshot = await getDocs(collection(db,"Users"))
         querySnapshot.forEach((doc)=>{
              for(let user of doc.data().Users){
                  if(this.email === user.email){
                      this.id = user.id
                  }
              }
         })
        
     }

   },
   created(){
      this.getEmail()
      this.getId()
    //this.getFunded()
    //this.getUnFunded()
     // this.uncompleted()
   // this.getUnverified()
     this.getAllTrainers()
     this.getVerifiedRecruits()
      
      this.getChildren()
   }
}
</script>

<style scoped>
html,
body,
.intro {
  height: 100%;
}

table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

thead th {
  color: #fff;
}

.card {
  border-radius: .5rem;
}

.table-scroll {
  border-radius: .5rem;
}

.table-scroll table thead th {
  font-size: 1.25rem;
}
thead {
  top: 0;
  position: sticky;
}
</style>


//admin has acess to all the children
//all the trainers
//all the verified recruits
//all the unverified recruits4
//upgrade a cer