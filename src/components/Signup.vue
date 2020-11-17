<template>
  <div>
    <div class="wrapper">
  <div class="title">
    Register Here
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
      <input type="text" placeholder="Name" class="input" v-model="name">
      <i class="fas fa-user"></i>
    </div>
    <div class="input_field">
      <input type="text" placeholder="Email" class="input" v-model="email">
      <i class="far fa-envelope"></i>
    </div>
    <div class="input_field">
      <input type="password" placeholder="Password" class="input" v-model="password">
      <i class="fas fa-lock"></i>
    </div>
    
      <button @click="signup"> Sign-up</button>
   
    {{ error }}
    <button> <a href = "/login"> Log-in</a></button>
  </div>
</div>	
      

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
            password:'',

            error: '',
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
                     this.error='';
                     this.$router.push('/login'); //user has signed up successfully

                }, err => {
                    console.log(err.response)
                    this.error= err.response.data.error
                    
                })
               
            }
        }
    }

</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Josefin+Sans');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
}

body{
  background: #3aaf9f;

}

.wrapper{
  max-width: 350px;
  width: 100%;
  height: auto;
  background: #fff;
  padding: 60px 45px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 20px;
}

.wrapper .title{
  margin-bottom: 20px;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #3aaf9f;
}

.wrapper .social_media{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.wrapper .social_media .item{
  margin: 0 5px;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border: 2px solid #eeeeee;
  border-radius: 50%;
  cursor: pointer;
  color: #eeeeee;
  transition: all 0.5s ease;
}

.wrapper .social_media .item:hover{
  border: 2px solid #3aaf9f;
  color: #3aaf9f;
}

.wrapper .form .input_field{
  position: relative;
  margin-bottom: 10px;
}

.wrapper .form .input_field .input{
  width: 100%;
  padding: 12px;
  padding-left: 30px;
  border: none;
  background: #eeeeee;
}


.wrapper .form .input_field i{
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  color: #1d2120;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #1d2120;
}
::-moz-placeholder { /* Firefox 19+ */
 color: #1d2120;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #1d2120;
}
</style>