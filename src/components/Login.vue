<template>
  <div>
    <div class="wrapper">
  <div class="title">
    Log in here
  </div>
  <div class="social_media">
    <div class="item">
      <i class="fab fa-facebook-f"></i>
    </div>
    <div class="item">
      <i class="fab fa-twitter"></i>
    </div>
    <div class="item">
      <i class="fab fa-google-plus-g"></i>
    </div>
  </div>
  
  <div class="form">

    <div class="input_field">
      <input type="text" placeholder="Email" class="input" v-model="email">
      <i class="far fa-envelope"></i>
    </div>
    <div class="input_field">
      <input type="password" placeholder="Password" class="input" v-model="password">
      <i class="fas fa-lock"></i>
    </div>
    
      <button @click="login"> Log-in</button>
    {{ error }}
      <button> <a href = "/signup"> Sign-Up</a></button>

  </div>
</div>	

  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data(){
        return{
            email: '',
            password: '',

            error: '',
        }
    },
    methods: {
        login(){
            let user = {
                email: this.email,
                password: this.password
            }
             axios.post('http://localhost:5000/login', user)
              .then(res => {
                  //if log in successful
                  if(res.status == 200){
                      localStorage.setItem('token', res.data.token); //to see if user is authenticated or not
                      this.$router.push('/'); //user is authorized and pushed to landing page
                  }
                  
              }, err => {
                  console.log(err.response);
                  this.error = err.response.data.error

              })
        }
    }

}
</script>

<style>

</style>