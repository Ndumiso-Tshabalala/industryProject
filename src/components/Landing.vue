<template>
<div>
landing
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
    }
}
</script>

<style>

</style>