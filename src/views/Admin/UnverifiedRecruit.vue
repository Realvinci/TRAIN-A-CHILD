<template>
   <div class="container">
          <div class="card">
              <div class="card-body">
                  <h3 class="card-title">Name: {{ RecruitInfo[0].name }}</h3>
                  <div class="row">
                      <div class="col-lg-7 col-md-7 col-sm-6">
                          <h4 class="box-title mt-5">Recruiter Details</h4>
                         
                          <h2 class="mt-5">
                            State: {{ RecruitInfo[0].state }}
                          </h2>
                          <h2 class="mt-5">
                            Country:  {{ RecruitInfo[0].country }}
                          </h2>
                          <h2 class="mt-5">
                            Address:  {{ RecruitInfo[0].address }}
                          </h2>
                          <h2 class="mt-5">
                            Mobile: {{ RecruitInfo[0].phone }}
                          </h2>
                          <h2 class="mt-5">
                            Email: {{ RecruitInfo[0].email }}
                          </h2>
                          <div v-if="completed">
                        <div class="col-lg-5 col-md-5 col-sm-6">
                            <div class="white-box text-center"><img :src="RecruitInfo[0].Nin" width="200px;" class="img-responsive"></div>
                         </div> 
                         <div class="col-lg-5 col-md-5 col-sm-6">
                            <div class="white-box text-center"><img :src="RecruitInfo[0].guarantorform" width="200px;" class="img-responsive"></div>
                         </div> 
                          </div>
                          <div v-else>
                              <h1>Reg not Completed</h1>
                         </div> 
                      </div>
                      <div class="col-lg-12 col-md-12 col-sm-12">
                          <h3 class="box-title mt-5">Grant</h3>
                          <div class="table-responsive">
                              <button v-if="completed" @click="Verify">Verify</button>
                              <button v-if="!completed" @click="RemindToCompleteReg">Remind</button>
                               <div>
                                <form @submit.prevent="submitcomment">
                                  <input type="text" v-model="comment">
                                </form>
                               </div>
                              <button @click="deleteRecruit">Delete</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div> 
      </div>
</template>

<script>
import {app as app} from '../../../firebase'
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion,arrayRemove} from 'firebase/firestore'
const db = getFirestore(app)
export default {
  name:'UnverifiedRecruit',
  data(){
    return{
          id:this.$route.params.id,
          Recruit:{},
          RecruitInfo:[],
          completed:false,
          comment:''
    }
  },
  methods:{
      async getRecruit(){
         const querySnapshot = await getDocs(collection(db,"Recruits"))
         querySnapshot.forEach((doc)=>{
            for(let unverified of doc.data().unverified){
                 if(this.id === unverified.id){
                      Object.assign(this.Recruit,unverified)
                      this.RecruitInfo.push(unverified)
                 }
            }
         })
         console.log(this.Recruit)
      },
      async Verify(){
          const RecruitRef = doc(db,"Recruits","Recruits")

          await updateDoc(RecruitRef,{
            unverified:arrayRemove(this.Recruit)
          })
          await updateDoc(RecruitRef,{
            Verified:arrayUnion(this.RecruitInfo[0])
          })
          this.$router.go(-1)
      },
      deleteRecruit(){

      },
      async checkCompleted(){
        const querySnapshot = await getDocs(collection(db,"Recruits"))
        querySnapshot.forEach((doc)=>{
                for(let unverified of doc.data().unverified){
                     if(this.id === unverified.id){
                           if(unverified.Nin!='' || unverified.guarantorform!=''){
                              this.completed = true
                           }
                     }
                }
        })
      },
      async RemindToCompleteReg(){
          
      },
      async submitcomment(){
         let email = ''
         const querySnapshot = await getDocs(collection(db,"Recruits"))
         querySnapshot.forEach((doc)=>{
            for(let unverified of doc.data().unverified){
               if(this.id === unverified.id){
                  email = unverified.email
               }
            }
         })
         if(this.comment!=''){
            //get the comment and the email and send the 
         }else{
           alert('input the comment first')
         }
      }
  },
  created(){
      this.getRecruit();
      this.checkCompleted();
  }
}
</script>

<style>

</style>