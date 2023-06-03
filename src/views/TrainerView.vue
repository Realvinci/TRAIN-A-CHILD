<template>
  <div class="trainer-signup">
       <h1>SignUp as Trainer</h1>
       <form @submit.prevent="trainersignup">
        <label for="name">FullName</label>
        <input type="text" v-model="name">
          <label for="email">Email</label>
          <input type="email" v-model="email">
          <label for="phone">Phone-Number</label>
          <input type="number" v-model="phone">
          <label for="Country">Country</label>
          <input type="text" v-model="country">
          <label for="password">Password</label>
          <input type="password" v-model="password">
          <label for="confirmpassord">Confirm Password</label>
          <input type="password" v-model="confirm">
       </form>
       <button @click="trainersignup">SignUp</button>
       <router-link to="/home">
       <button>Home</button>
       </router-link>
         <div class="support">
       <router-link to="/support">
        <button>Support</button>
       </router-link>
       <router-link to="/recruiter">
          <button>SignUp as Recruite <i class="fa-solid fa-shield-halved"></i></button>
       </router-link>
       </div>
  </div>
</template>

<script>
import {app as app} from '../../firebase'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,collection,addDoc,doc,getDocs,updateDoc,arrayUnion} from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
const db = getFirestore(app)
const auth = getAuth(app)
export default {
   data(){
    return{
        name:'',
        email:'',
        phone:'',
        country:'',
        password:'',
        confirm:'',
        children:[],
        TrainerId:'',
        child:{
        name:'',
        age:'',
        gender:'',
        image:'',
        proposedcareer:'',
        detail:'',
        TrainerId:'',
        uniqueid:''
      }
    }
   },
   methods:{
     trainersignup(){
        //has access to dashboard and the children his training 
        //1.Dashboard created and takes you there imidiately
        //2.all kids you are training
        //3.*progress of the kid
        //4.probably access to searchbox
        createUserWithEmailAndPassword(auth,this.email,this.password)
        .then((userCredential)=>{
            //Signed in
            this.addToTrainers(this.name,this.email,this.phone,this.children,this.country)
            const user = userCredential.user
            localStorage.setItem("signinToken",user.accessToken)
            console.log(user)
            //this.ToDashBoard();
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.errorMessage
        })
     },
     async addToTrainers(name,email,phone,children,country){
      this.uniqueid = uuidv4();
      
      console.log('Entering trainer info')
       const docRef = await addDoc(collection(db,"Trainer"),{
        id:uuidv4(),
           name:this.name,
           email:this.email,
           childen:[],
           Trainer:true,
           role:"user",
           credential:"Trainer"
       })
        this.TrainerId = docRef.id
       console.log("Document written with ID: ",this.TrainerId);
      //  const AdminDocRef = doc(db, "Admin","C7Jng64ORvLGgCZvRYhy");
      // //  const TrainRef = doc(db,"Trainer",this.TrainerId)
      // //  await updateDoc(TrainRef,{
      // //   Trainers: arrayUnion({id:this.uniqueid,name:this.name,email:this.email,phone:this.phone,country:this.country,children:[]})
      // //  })
      //  await updateDoc(AdminDocRef, {
      //   Trainers: arrayUnion({id:uuidv4(),name:this.name,email:this.email,children:[],Trainer:true,role:"user",credential:"Trainer"})
      // });
      const TrainerRef = doc(db,"Trainer",this.TrainerId)
      await updateDoc(TrainerRef,{
        children:arrayUnion(this.child)
      })
      
        this.name = '',
        this.email ='',
        this.phone ='',
        this.country ='',
        this.password ='',
        this.confirm ='',
    
        //I dont know if this should be here
       // localStorage.setItem("siginToken","")
      
       //destory the childId from localstorage
    
      localStorage.removeItem("childId")
      //take you to your dashboard(trainer dashboard(make use of the unique id here))
       this.ToDashBoard();
     
    },
    async checkChild(){
         let children = []
        let childId = localStorage.getItem("childId")
        if(childId){
             const querySnapshot = await getDocs(collection(db,"Children"))
             querySnapshot.forEach((doc)=>{
                  for(let item of doc.data().children){
                      //check for the item id and print just that one
                       children.push(item)
                  }
             })
            for(let child of children){
               if(child.id === childId){
                  this.child.name = child.name,
                  this.child.age = child.age,
                  this.child.proposedcareer = child.proposedcareer,
                  this.child.detail = child.detail,
                  this.child.gender = child.gender,
                  this.child.image = child.image
                  this.child.id = child.id
               }
            }
            console.log(this.child)
        }else{
          return false;
        }
      },
    ToDashBoard(){
      this.$router.push(`/trainerdashboard/${this.uniqueid}`)
        //check the id and return the information  
       // this.$router.push('/trainerDashboard')
    },
    
   },
   created(){
     this.checkChild();
   }
}
</script>

<style>
.support{
    margin-top: 600px;
}
</style>



///get the ref and run it to get the refid and work on updating