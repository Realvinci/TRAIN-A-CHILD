<template>
 <div class="container">
          <div class="card">
              <div class="card-body">
                  <h3 class="card-title">{{ children[0].name }}</h3>
                  <div class="row">
                      <div class="col-lg-5 col-md-5 col-sm-6">
                          <div class="white-box text-center"><img :src="child.image" style="width:400px;" class="img-responsive"></div>
                      </div>
                      <div class="col-lg-7 col-md-7 col-sm-6">
                          <h4 class="box-title mt-5">Child Details</h4>
                          <p>{{ child.detail }}</p>
                          <h2 class="mt-5">
                            Gender {{ children[0].gender }}
                          </h2>
                      </div>
                      <div class="col-lg-12 col-md-12 col-sm-12">
                          <h3 class="box-title mt-5">Edit Info</h3>
                          <div class="table-responsive">
                              <table class="table table-striped table-product">
                                  <tbody>
                                      <tr>
                                          <td>Child Name</td>
                                          <td><input type="text" v-model="children[0].name"></td>
                                      </tr>
                                      <tr>
                                          <td>Age</td>
                                          <td><input type="text" v-model="children[0].age"></td>
                                      </tr>
                                      <tr>
                                          <td>Child Detail</td>
                                          <td><textarea  id="" cols="30" rows="10" v-model="children[0].detail"></textarea></td>
                                      </tr>
                                     
                                  </tbody>
                              </table>
                              <button @click="update">update</button>
                              <button @click="deleteChild">Delete</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div> 
      </div>
</template>

<script>
import {app as app} from '../../firebase'
import { collection, getDocs,getFirestore,doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
const db = getFirestore(app)
export default {
   data(){
    return{
        id:this.$route.params.id,
        child:{},
        children:[]
    }
   },
   created(){
      console.log(this.id)
   },
   methods:{
     async getChild(){
       const querySnapshot = await getDocs(collection(db,"Children"))
       querySnapshot.forEach((doc)=>{
          for(let item of doc.data().RecruiterChildren){
                 if(item.id === this.id){
                    this.children.push(item)
                   Object.assign(this.child,item) 
                 }
          }
       })
       console.log(this.child)
     },
     async update(){
        const ChildRef = doc(db, "Children", "yAdO4UC7V9CvLRx0tsbr");
                // console.log(this.product[0])
                 await updateDoc(ChildRef,{
                    RecruiterChildren:arrayUnion(this.children[0])
                 })
                 await updateDoc(ChildRef,{
                    RecruiterChildren:arrayRemove(this.child)
                 })
                 alert('updated')
                 this.$router.go(-1)
     },
    async deleteChild(){
        const ChildRef = doc(db, "Children", "yAdO4UC7V9CvLRx0tsbr");
                await updateDoc(ChildRef,{
                 RecruiterChildren:arrayRemove(this.child)
                 })
                 alert('Child deleted')
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