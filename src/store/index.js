import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from 'jwt-decode'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    children:[],
    trainers:[],
    recruits:[],
    child:{},
    
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    
    async checkAdmin(){
       let signinToken = localStorage.getItem('siginToken')
        signinToken = jwt_decode(signinToken)
        
    },
    async TrainChild(parmid){
      // is there a way i can the this child detail into the object here , i guess i should be able to search and push it out with the data provided in the id
    ///get the childs payload

    //check if trainer
    let TrainerRef;
    //check if registered to trainers
    let siginToken = localStorage.getItem('signinToken');
    let email = jwt_decode(siginToken).email
    if(email){
      const querysnapshot = await getDocs(doc(db,"Trainer"));
      querysnapshot.forEach((doc)=>{
           for(let email of doc.data()){
               if(email.email === email){
                 // The email exist exist in the trainers collection hence work on adding it with the update doc
                 TrainerRef = doc.id;
               }
           }
           Childrenref = doc(db, "Trainer",TrainerRef);
      })
    }
    ///Thinking allowed this should be the last procedure and should be in a function of its own i guess i should try writing the function
    await updateDoc(Childrenref, {
     children: arrayUnion(this.child)
   });

    if(Trainer){
      //i will like to return the trainers ref
      child = {
        name:'',
        age:'',
        proposedCareer:'',
        image:'',
        detail:''
      }
      //populate the child detail into the object
      const querysnapshot = await getDocs(doc(db,"Children"))
      querysnapshot.forEach((doc)=>{
           if(doc.data().id === parmid){
            //get it into the child object
               child = {
                name: doc.data().name,
                age: doc.data().age,
                proposedCareer: doc.data().proposedCareer,
                image:doc.data().image,
                detail:doc.data().detail
               }
           }
      })  
    }else{
      //this.$router.push('/Trainer')this.$router.push({name: 'Trainer', params: { id: this.$router.param.id }})
    }
    


    }
  },
  modules: {
  }
})
async function getDocRef(coll,key){
   ///key (recruit(email),trainer(email),child(id) what if i put id in all of them and make it universal function)

   //this should return the ref in string format

   // you are going into a collection and returning the id of the document you are searching for right
   const querysnapshot = await getDocs(collection(db,coll))
   querysnapshot.forEach((doc)=>{
       for(let item of doc.data()){
         if(item.id === key){
           return doc.id 
         }
       }
   })
}

async function getChilddetail(id){
  //should return the child object
  child = {
     name:'',
     age:'',
     proposedCareer:'',
     detail:'',
     gender:'',
     image:''
  }
  const querysnapshot = await getDocs(collection(db,"Children"))
   querysnapshot.forEach((doc)=>{
       //check for the child with the id
        for(let item of doc.data().child){
           if(item.id === id){
            child ={
              name: item.name,
              age:item.age,
              proposedCareer:item.proposedCareer,
              detail:item.detail,
              gender:item.gender,
              image:item.image
            }
           }
        }
   })
   return child
}

async function updateArray(ref,property,newarreayobj){
    await updateDoc(ref,{
      property:arrayUnion(newarreayobj)
    })
}

async function Trainer(){
   //check for signinToken if it exist
    let siginToken = localStorage.getItem("signinToken")
    if(siginToken){
      //carryout the check 
       siginToken = jwt_decode(signinToken);
       let email = siginToken.email;
       const querysnapshot = await getDocs(collection(db,"Trainer"))
        querysnapshot.forEach((doc)=>{
           if(doc.data().email === email)
           return true
        })
    }else{
      alert("You are not logged in ")
    }
}




//check for role privilages and escalate the privilage if it exists 
//either logged in or not you shouild be able to view the children
//sign up to be a trainer and there is a signup to be a volunteer 
//scroll through and grant the privileges