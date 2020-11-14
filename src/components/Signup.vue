<template>
  <div>
      NAME<input type="text" v-model="name"/><br/>
      EMAIL<input type="text"  v-model="email"/><br/>
      PASSWORD<input type="password"  v-model="password"/><br/>
      <button @click="signup"> signup</button>

  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Signup',
    data(){
        return{
            name:'',
            email:'',
            password:''
        }
        },
        methods: {
            //calling data after sign up function is called
            signup() {
                       let newUser = {
                       name: this.name,
                       email: this.email,
                       password: this.password
               
                }
                // sending signUp data to backEnd
                axios.post('http://localhost:5000/signup', newUser)
                .then(res =>{
                    console.log(res)
                }, err => {
                    console.log(err.response)
                })
               
            }
        }
    }

</script>

