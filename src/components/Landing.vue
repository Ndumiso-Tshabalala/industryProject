<template>
<div>
     <input type="checkbox" id="check">
      <!--header area start-->
      <header>
        <label for="check">
          <!-- <i class="fas fa-bars" id="sidebar_btn"></i> -->
        </label>
        <div class="left_area">
          <h3>Welcome <span> {{ name }}</span></h3>
        </div>
        <div class="right_area">
          <button class="button" @click="logout"> Log-Out </button>
        </div>
      </header>
      <!--header area end-->
      <!--sidebar start-->
      <!-- <div class="sidebar">
        <center>
         <img src="./1.png" class="profile_image" alt="">
          <h4>{{ email }} </h4>
        </center>
        <a href="#"><i class="fas fa-desktop"></i><span>Dashboard</span></a>
         <a href="#"><i class="fas fa-cogs"></i><span>Components</span></a> -->
        <!-- <a href="#"><i class="fas fa-table"></i><span>Tables</span></a> -->
        <!-- <a href="#"><i class="fas fa-th"></i><span>Forms</span></a>
        <a href="#"><i class="fas fa-info-circle"></i><span>About</span></a>
        <a href="#"><i class="fas fa-sliders-h"></i><span>Settings</span></a> -->
      <!-- </div> --> -->
      <!--sidebar end-->

      <div class="content"></div>
          
      <div class="uploading">
        <form action="" method="POST">
         <input type="file" multiple>
        <p>Drag your files here or click in this area.</p>
        <button type="submit">Upload</button>
        </form>
      </div>

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
    },
}
</script>

<style scoped>

body{
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

header{
  position: fixed;
  background: crimson;
  padding: 20px;
  width: 100%;
  height: 70px;
  
}

.left_area h3{
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 900;
}

.left_area span{
  color: #19B3D3;
}

.button{
  padding: 5px;
  background: #19B3D3;
  text-decoration: none;
  float: right;
  margin-top: -30px;
  margin-right: 40px;
  border-radius: 2px;
  /* font-size: 15px;
  font-weight: 600; */
  color: #fff;
  transition: 0.5s;
  transition-property: background;
}

.button:hover{
  background: #0B87A6;
}

/* .sidebar {
  background: transparent;

  margin-top: 70px;
  padding-top: 30px;
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  transition: 0.5s;
  transition-property: left;
} */

/* .sidebar .profile_image{
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-bottom: 10px;
}

.sidebar h4{
  color: #ccc;
  margin-top: 0;
  margin-bottom: 20px;
} */

/* .sidebar a{
  color: #fff;
  display: block;
  width: 100%;
  line-height: 60px;
  text-decoration: none;
  padding-left: 40px;
  box-sizing: border-box;
  transition: 0.5s;
  transition-property: background;
} */

/* .sidebar a:hover{
  background: #19B3D3;
}

.sidebar i{
  padding-right: 10px;
}

label #sidebar_btn{
  z-index: 1;
  color: #fff;
  position: fixed;
  cursor: pointer;
  left: 300px;
  font-size: 20px;
  margin: 5px 0;
  transition: 0.5s;
  transition-property: color;
} */

/* label #sidebar_btn:hover{
  color: #19B3D3;
}

#check:checked ~ .sidebar{
  left: -190px;
}

#check:checked ~ .sidebar a span{
  display: none;
}

#check:checked ~ .sidebar a{
  font-size: 20px;
  margin-left: 170px;
  width: 80px;
} */

.content{
  /* margin-left: 250px; */
  background: url(background.jpg) no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  transition: 0.5s;
}

#check:checked ~ .content{
  margin-left: 60px;
}

#check{
  display: none;
}


form{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -250px;
  width: 508px;
  height: 200px;
  border: 4px dashed #fff;
}
form p{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 170px;
  color: #ffffff;
  font-family: Arial;
}
form input{
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
}
form button{
  margin: 0;
  color: #fff;
  background: #16a085;
  border: none;
  width: 508px;
  height: 35px;
  margin-top: -20px;
  margin-left: -4px;
  border-radius: 4px;
  border-bottom: 4px solid #117A60;
  transition: all .2s ease;
  outline: none;
}
form button:hover{
  background: #149174;
	color: #0C5645;
}
form button:active{
  border:0;
}




</style>