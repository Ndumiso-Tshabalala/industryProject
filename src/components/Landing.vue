<template>
<div>
     <button @click="logout"> logout</button>
</div>
  
</template>

<script>
export default {
    name: 'Landing', // to see if user is authenticated(whether token exists within the local storage)
    created(){
        //user not authorized
        if(localStorage.getItem('token') === null) {
         this.$router.push('/login');   //push back to log in page
        }
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