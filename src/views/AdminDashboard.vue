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
        <!-- <router-link to="/adminFundedKids">
           <li>FundedKids</li>
        </router-link> -->
        <!-- <router-link to="/adminUnFundedKids">
           <li>UnFundedKids</li>
        </router-link> -->
        <!-- <router-link to="/adminVerifiedRecruits">
           <li>VerifiedRecruits</li>
        </router-link>
        <router-link to="/adminUnverifiedRecruits">
           <li>UnverifiedRecruits</li>
        </router-link>
        <router-link to="/adminUncompletedReg">
           <li>UnCompletedReg</li>
        </router-link>
        <router-link to="/adminCompletedReg">
           <li>CompletedReg</li>
        </router-link>
        <router-link to="/adminRecruiterChildren">
           <li>RecruiterChildren</li>
        </router-link> -->
      </ul>
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
        id:''
       }

   },
   methods:{
    async getAllTrainers(){
      //get the trainer details in an array with th children there are training and return as an arrau
        const querySnapshot = await getDocs(collection(db,"Trainer"))
        querySnapshot.forEach((doc)=>{
              console.log('this are the Trainers',doc.data())
             this.Trainers = doc.data()
        })
    },
    async getChildren(){
        const querySnapshot = await getDocs(collection(db,"Children"))
        querySnapshot.forEach((doc)=>{
            for(let child of doc.data().children){
              this.Children.push('This is part of the child',child)
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
     // this.getAllTrainers()
     // this.getVerifiedRecruits()
      
      //this.getChildren()
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