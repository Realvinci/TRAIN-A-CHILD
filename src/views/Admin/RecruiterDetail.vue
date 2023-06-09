<template>
  <div class="card">
              <div class="card-body">
                  <h3 class="card-title">{{ RecruitInfo[0].name }}</h3>
                  <h3 class="card-title">{{ RecruitInfo[0].email }}</h3>
                  <div class="row">
                      <div class="col-lg-5 col-md-5 col-sm-6">
                          <div class="white-box text-center"><img :src="RecruitInfo[0].image" width="200px;" class="img-responsive"></div> 
                      </div>
                      <div class="col-lg-7 col-md-7 col-sm-6">
                          
                          
                         
                          <button @click="deleteRecruiter" class="btn btn-danger">Delete</button>
                          <!-- <h2 class="mt-5">
                            Funded: {{ childInfo[0].Funded }}
                          </h2>
                          <h2 class="mt-5">
                            Amount:N {{ childInfo[0].Amount }}
                          </h2> -->
                      </div>
                     
                  </div>
              </div>
          </div> 
</template>

<script>
import {app as app} from '../../../firebase'
import { getStorage, ref, getDownloadURL,uploadBytesResumable } from "firebase/storage";
import jwt_decode from 'jwt-decode'
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
const db = getFirestore(app)
const storage = getStorage(app);
export default {
   data(){
      return{
        id:this.$route.params.id,
        Recruit:{},
        RecruitInfo:[]
      }   
   },
   methods:{
      async getRecruit(){
          const querySnapshot = await getDocs(collection(db,"Recruits"))
          querySnapshot.forEach((doc)=>{
            for(let recruit of doc.data().Verified){
                  if(recruit.id === this.id){
                      this.RecruitInfo.push(recruit)
                      Object.assign(this.Recruit,recruit)
                  }
              }
          })
          console.log(this.RecruitInfo[0])
      },
      async deleteRecruiter(){

      }
   },
   created(){
      this.getRecruit()
   }
}
</script>

<style>

</style>