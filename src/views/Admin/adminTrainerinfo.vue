<template>
  <div>
    <h1>Admin Trainer Info</h1>
    <div>
        <h3>{{ TrainerInfo[0].name }}</h3>
        <h4>{{ TrainerInfo[0].email }}</h4>
        <div class="children">
            <li v-for="(child,i) in TrainerInfo[0].Children" :key="i">
                <img :src="child.image" style="width:200px;" alt="">
                <h6>{{ child.name }}</h6>
            </li>
        </div>
    </div>
  </div>
</template>

<script>
import {app as app} from '../../../firebase'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
const db = getFirestore(app)
export default {
   name:'adminTrainerinfo',
   data(){
    return{
      id:this.$route.params.id,
      TrainerInfo:[]
    }
   },
   methods:{
     async getTrainer(){
         const querySnapshot = await getDocs(collection(db,"Trainer"))
         querySnapshot.forEach((doc)=>{
             if(doc.data().id === this.id){
                 console.log(doc.data())
                 this.TrainerInfo.push(doc.data())
             }
         })
     }
   },
   created(){
      this.getTrainer()
   }
}
</script>

<style>

</style>