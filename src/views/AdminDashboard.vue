<template>
  <div class="admin">
    <div class="Trainers">
      <h1>Trainers</h1>
      <section class="intro">
  <div class="bg-image h-100" style="background-color: #f5f7fa;">
    <div class="mask d-flex align-items-center h-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="card">
              <div class="card-body p-0">
                <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style="position: relative; height: 700px">
                  <table class="table table-striped mb-0">
                    <thead style="background-color: #002d72;">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">NAME</th>
                        <th scope="col">CONTACT</th>
                        <th scope="col">NO. OF CHILDREN</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(i,trainer) in Trainers" :key="i">
                        <td>{{ i }}</td>
                        <td>{{ trainer.name }}</td>
                        <td>{{ trainer.email }}</td>
                        <td>{{  }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  </div>
</template>

<script>
import {app as app} from '../../firebase'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
const db = getFirestore(app)
export default {
   name:'AdminDashboard',
   data(){
       return{
        Trainers:[],
        Children:[],
        VerifiedRecruits:[],
        UnverifiedRecruits:[]
       }

   },
   methods:{
    async getAllTrainers(){
      //get the trainer details in an array with th children there are training and return as an arrau
        const querySnapshot = await getDocs(collection(db,"Trainer"))
        querySnapshot.forEach((doc)=>{
             this.Trainers = doc.data()
        })
    },
    async getChildren(){
        const querySnapshot = await getDocs(collection(db,"Children"))
        querySnapshot.forEach((doc)=>{
            this.Children =doc.data()
        })
    },
     async getVerifiedRecruits(){
        const querySnapshot = await getDocs(collection(db,"Recruits"))
         querySnapshot.forEach((doc)=>{

               this.VerifiedRecruits=doc.data().Verified
         })
     },
     async getUnverified(){
       const querySnapshot = await getDocs(collection(db,"Recruits"))
       querySnapshot.forEach((doc)=>{
            this.UnverifiedRecruits=doc.data().unverified
       })

     }
   },
   created(){
      this.getUnverified()
      this.getAllTrainers()
      this.getVerifiedRecruits()
   }
}
</script>

<style scoped>
html,
body,
.intro {
  height: 100%;
}

table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

thead th {
  color: #fff;
}

.card {
  border-radius: .5rem;
}

.table-scroll {
  border-radius: .5rem;
}

.table-scroll table thead th {
  font-size: 1.25rem;
}
thead {
  top: 0;
  position: sticky;
}
</style>


//admin has acess to all the children
//all the trainers
//all the verified recruits
//all the unverified recruits4
//upgrade a cer