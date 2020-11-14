<template>
<div>
     <button @click="logout"> logout</button>
     <h1> Hello {{ name }} </h1>
     <h2> Your email is: {{ email }} </h2>
</div>
  
</template>

<script>
import axios from 'axios';
export default {
    name: 'Landing', // to see if user is authenticated(whether token exists within the local storage)
    data(){
        return{
            name: '',
            email:'',
        }
    },
    
    created(){
        //user not authorized
        if(localStorage.getItem('token') === null) {
         this.$router.push('/login');   //push back to log in page
        }
    },
    mounted(){
        axios.get('http://localhost:5000/user',{headers: {token: localStorage.getItem('token')}})
        .then(res=>{
            //correspond into the data
            this.name = res.data.user.name;
            this.email = res.data.user.email;
        })
    },
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>

<style>

</style>