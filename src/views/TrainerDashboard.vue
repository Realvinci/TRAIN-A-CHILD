<template>
  <div>
    <h1>Trainer Dashboard</h1>
    {{ Trainerdetail.name }}
  </div>
</template>

<script>
import {app as app} from '../../firebase'
import { getFirestore,getDocs,doc,collection } from 'firebase/firestore'
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
        
     }
  },
  created(){
     this.getparamid();
     this.getTrainersChildren();
  }
}
</script>

<style>

</style>