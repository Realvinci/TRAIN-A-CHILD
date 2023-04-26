<template>
  <div class="child detail">
     <!-- Page Content -->
<div class="container">

<!-- Portfolio Item Heading -->
<h1 class="my-4">Child Details</h1>

<!-- Portfolio Item Row -->
<div class="row">

  <div class="col-md-8">
    <img class="img-fluid" :src="child.image" alt="">
  </div>

  <div class="col-md-4">
    <h3 class="my-3">Child Details</h3>
    <p>{{ child.detail }}</p>
    <h4 class="my-3">proposed career</h4>
    <p>{{ child.proposedcareer }}</p>
     <button @click="trainChild">Train</button>
  </div>

</div>
<!-- /.row -->

<!-- Related Projects Row -->

<!-- /.row -->

</div>
<!-- /.container -->
  </div>
</template>

<script>
import {app as app} from '../../firebase'
import {getFirestore,collection,getDocs,doc,arrayUnion, updateDoc} from 'firebase/firestore'
import jwtDecode from 'jwt-decode';
import {v4 as uuidv4} from 'uuid'

const db = getFirestore(app);
export default {
 name:'childdetail',
 data(){
    return{
      child:{
        name:'',
        age:'',
        gender:'',
        image:'',
        proposedcareer:'',
        detail:'',
        id:''
      }
    }
 },
 methods:{
   async getChild(){
      // console.log($route.params.id);
      
      // console.log(typeof(this.$route.params.id))
        ///use the id and return the particular child from the firebase database
        const querySnapshot = await getDocs(collection(db,"Children"))
        querySnapshot.forEach((doc)=>{
           // console.log(doc.data().children)
            for(let child of doc.data().children){
                if(child.id ===this.$route.params.id)
                this.child.name = child.name,
                this.child.age =child.age,
                this.child.gender = child.gender,
                this.child.image = child.image,
                this.child.proposedcareer = child.proposedcareer,
                this.child.detail = child.detail
            }
        })
     //console.log(this.child)
    },
  async trainChild(){
     //basically the trainChild function checks if you are registered as a trainer if true it returns true and pushes the child into the array of children you are training(add the child's progress to the child array)
     //else takes you to the register page and does the registration and pushes the child into the the children array for you as the first registered child to be trained
      let train = await this.Trainer();
      console.log(train)
     if(train){
        const ChildrenRef = doc(db, "Trainer",this.id);
        await updateDoc(ChildrenRef, {
        Children:arrayUnion({id:uuidv4(),name:this.child.name,age:this.child.age,gender:this.child.gender,image:this.child.image,proposedcareer:this.child.proposedcareer,detail:this.child.detail,progress:[]})
      });
      }else{
        let childId = this.$route.params.id;
         localStorage.setItem("childId",childId)
         this.$router.push({name: 'train',path:'/trainer'})
      }
    },
    async Trainer(){
       let signinToken = localStorage.getItem('signinToken');
       if(signinToken){
           let email = jwtDecode(signinToken).email;
            //carry out the check on the Trainer collection to see if you can find the email
           const querySnapshot = await getDocs(collection(db,"Trainer"))
           querySnapshot.forEach((doc)=>{
             if(doc.data().email === email){
               return true;
             }else{
              return false;
             }
           })
       }else{
        alert('You are not signed in');
        
        //the modal should carry the button to go to the login page
        //check if the person has account if not ask the person to signup
       }
    },
    getEmail(){
        let signinToken = localStorage.getItem("signinToken");
        let email = jwtDecode(signinToken).email
        return email;
    },
    async getRef(coll){
        let email = this.getEmail()
        const querySnapshot = await getDocs(collection(db,coll))
        querySnapshot.forEach((doc)=>{
           if(doc.data().email === email){
            this.id = doc.id
          
           }
        })
    },
    
 },
 
 created(){
  
    this.getChild();
    this.getRef("Trainer")
   
 }
}
</script>

<style>

</style>