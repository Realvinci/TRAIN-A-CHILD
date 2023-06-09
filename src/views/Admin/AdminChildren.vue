<template>
  <div>
    <h1>All Children</h1>
    <div class="container">
  <h2>Uploaded</h2>          
  <table class="table table-striped" style="height:300px;">
    <thead>
      <tr>
        <th>Image</th>
        <th>Firstname</th>
        <th>age</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(child,i) in Children" :key="i">
        <td>
          <router-link :to="`/adminChildDetail/${child.id}`">
            <img :src="child.image" style="width:100px;" alt=""> 
          </router-link>
        </td>
        <td>
            {{child.name}}
        </td>
        <td>{{child.age}}</td>
        <td>{{child.gender}}</td>
      </tr>
    </tbody>
  </table>
  <h2>Pending Approval</h2>          
  <table class="table table-striped" style="height:300px;">
    <thead>
      <tr>
        <th>Image</th>
        <th>Firstname</th>
        <th>age</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(child,i) in RecruiterChildren" :key="i">
        <td>
          <router-link :to="`/adminRecruitChildDetail/${child.id}`">
            <img :src="child.image" style="width:100px;" alt=""> 
          </router-link>
          
        </td>
        <td>{{child.name}}</td>
        <td>{{child.age}}</td>
        <td>{{child.gender}}</td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
</template>

<script>
import {app as app} from '../../../firebase'
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
const db = getFirestore(app)
export default {
  name:'AdminChildren',
  data(){
    return{
      Children:[],
      RecruiterChildren:[]
    }
  },
  methods:{
    async getAllChildren(){
      const querySnapshot = await getDocs(collection(db,"Children"))
      querySnapshot.forEach((doc)=>{
        for(let child of doc.data().children){
              this.Children.push(child)
            }
            for(let child of doc.data().RecruiterChildren){
                //console.log('This is part of Recruiter children',child)
                this.RecruiterChildren.push(child)
           }    
      })
      console.log(this.Children)
      console.log(this.RecruiterChildren)
    }
  },
  created(){
     this.getAllChildren()
  }
}
</script>

<style>

</style>