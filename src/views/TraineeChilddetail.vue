<template>
  <div>
       <h1>Child's detail</h1>
          <img :src="childDetail.image" alt="">
          <h4>{{ childDetail.name }}</h4>
          {{ childDetail.progress }}
  </div>
</template>

<script>
import { collection, getDocs,getFirestore } from 'firebase/firestore'
import {app as app} from '../../firebase'
import jwtDecode from 'jwt-decode'
const db = getFirestore(app)
export default {
   data(){
     return{
         id:this.$route.params.id,
         childDetail:{}
     }
   },
   methods:{
     ///getChilds detail and work on it
     async getChild(){
        //get email here
          let signinToken = localStorage.getItem("signinToken")
           let email = jwtDecode(signinToken).email
           const querySnapshot = await getDocs(collection(db,"Trainer"))
           querySnapshot.forEach((doc)=>{
                 if(doc.data().email === email){
                    //check for the child with the id
                        for(let item of doc.data().Children){
                             if(item.id === this.id){
                                 console.log(item)
                                 this.childDetail={
                                   name:item.name,
                                   gender:item.gender,
                                   id:item.detail,
                                   progress:item.progress,
                                   age:item.age,
                                   detail:item.detail,
                                   image:item.image,
                                   proposedcareer:item.proposedcareer
                                 }
                             }
                       }
                       console.log('This are the child details ',this.childDetail)
                 }
           })
      }
   },
   created(){
     this.getChild()
   }
}
</script>

<style>

</style>