<template>
     <div class="card">
              <div class="card-body">
                  <h3 class="card-title">{{ childInfo[0].name }}</h3>
                  <div class="row">
                      <div class="col-lg-5 col-md-5 col-sm-6">
                          <div class="white-box text-center"><img :src="childInfo[0].image" width="200px;" class="img-responsive"></div>
                      </div>
                      <div class="col-lg-7 col-md-7 col-sm-6">
                          <h4 class="box-title mt-5">Child Details</h4>
                          <p>{{ childInfo[0].detail }}</p>
                          <h2 class="mt-5">
                            Gender: {{ childInfo[0].gender }}
                          </h2>
                          <h2 class="mt-5">
                            Age: {{ childInfo[0].age }}
                          </h2>
                          <button @click="approve" class="btn btn-primary">Approve</button>
                          <button @click="deleteChild" class="btn btn-danger">Delete</button>
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
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion, arrayRemove} from 'firebase/firestore'
const db = getFirestore(app)
const storage = getStorage(app);
export default {
  data(){
     return{
        id:this.$route.params.id,
        childInfo:[],
        child:{}
     }
  },
  methods:{
      async getChild(){
         const querySnapshot = await getDocs(collection(db,"Children"))
         querySnapshot.forEach((doc)=>{
              for(let child of doc.data().RecruiterChildren){
                   if(child.id === this.id){
                     this.childInfo.push(child)
                     console.log(this.childInfo)
                     Object.assign(this.child,child)
                   }
              }
         })
      },
      async approve(){
           this.childInfo[0].Approved = true
           const ChildrenRef = doc(db,"Children","yAdO4UC7V9CvLRx0tsbr")
           await updateDoc(ChildrenRef,{
            RecruiterChildren:arrayRemove(this.child)
           })
           await updateDoc(ChildrenRef,{
              children:arrayUnion(this.childInfo[0])
           })
           this.$router.go(-1)
      },
      async deleteChild(){
        const ChildrenRef = doc(db,"Children","yAdO4UC7V9CvLRx0tsbr")
        await updateDoc(ChildrenRef,{
            RecruiterChildren:arrayRemove(this.child)
        })
        this.$router.go(-1)
      }
  },
  created(){
     this.getChild()
  }
}
</script>

<style>

</style>