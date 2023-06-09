<template>
  <div>
    <h1>Trainers</h1>
    <ul>
      <li v-for="(trainer,i) in Trainers" :key="i">
       <router-link :to="`/adminTrainerinfo/${trainer.id}`">
        <p>{{ trainer.name }}</p>
       </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {app as app} from '../../../firebase'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
const db = getFirestore(app)
export default {
   name:'AdminTrainer',
   data(){
     return{
        Trainers:[]
     }
   },
   methods:{
    async getAllTrainers(){
      //get the trainer details in an array with th children there are training and return as an arrau
        const querySnapshot = await getDocs(collection(db,"Trainer"))
        querySnapshot.forEach((doc)=>{
             this.Trainers.push(doc.data())
        })
        console.log(this.Trainers)
    },
   },
   created(){
     this.getAllTrainers()
   }
}
</script>

<style>

</style>