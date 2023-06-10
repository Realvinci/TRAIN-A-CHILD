<template>
  <div class="container">
  <h2>Verified Recruits</h2>       
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(recruit,i ) in VerifiedRecruits" :key="i">
        <td>
            <router-link :to="`/recruiter/${recruit.id}`">
              {{ recruit.name }}    
            </router-link>     
          </td>
        <td>{{ recruit.email }}</td>
        <td>{{ recruit.state}}</td>
      </tr>
    </tbody>
  </table>
  <h2>UnVerified Recruits</h2>       
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(recruit,i ) in UnVerifiedRecruits" :key="i">
          <td>
            <router-link :to="`/unverifiedrecruiter/${recruit.id}`">
              {{ recruit.name }}    
            </router-link>     
          </td>
        <td>{{ recruit.email }}</td>
        <td>{{ recruit.state}}</td>
      </tr>
    </tbody>
  </table>
</div>

</template>

<script>
import {app as app} from '../../../firebase'
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
const db = getFirestore(app)
export default {
    data(){
      return{
         id:this.$route.params.id,
         VerifiedRecruits:[],
         UnVerifiedRecruits:[]
      }
    },
   methods:{
       async getAllRecruits(){
           const querySnapshot = await getDocs(collection(db,"Recruits"))
           querySnapshot.forEach((doc)=>{
          
              for(let recruit of doc.data().Verified){
                 this.VerifiedRecruits.push(recruit)
                
              }
              for(let unverified of doc.data().unverified){
                 this.UnVerifiedRecruits.push(unverified)
              }
           })
           //console.log(this.UnVerifiedRecruits)
           console.log(this.VerifiedRecruits)
       }
   },
   created(){
      this.getAllRecruits()
   }
}
</script>

<style>

</style>