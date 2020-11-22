<template>
<div>

      <!--header area start-->
      <header>
        <label for="check">
          <!-- <i class="fas fa-bars" id="sidebar_btn"></i> -->
        </label>
        <div class="left_area">
          <h3>Welcome <span> {{ name }}</span></h3>
        </div>
        <div class="right_area">
          <button class="button1" @click="logout"> Log-Out </button>
        </div>
      </header> 
      <!-- header ends -->

    <!-- uploading starts here -->
      <div class="wrapper">
  <div class="title">
    Upload file here
  </div>

  <div class="form">
    <form @submit="sendFile" enctype="multipart/form-data">
        <div class = "field">
          <label for="file" class="label"></label>
          <input type="file"  ref="file" @change="selectFile"/>
        </div>
      
        <!-- <div class = "field"> -->
          <button class = "button is-info">Send</button>
        <!-- </div> -->
        </form>
  </div>
</div>	


      <div class="content">
        
      </div>
      

</div>
  
</template>

<script>
// import API from "@/services";
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
        },
        selectFile(){
          this.file = this.$refs.file.files[0];
          // console.log(this.$refs.file.files[0]);

          
          
        },
        async sendFile(){
          const formData = new FormData();
          formData.append('file', this.file);
        try{
          await axios.post('http://localhost:5000/upload', formData);

        }catch(err){
          console.log(err);

        }
        }
    }
    
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

.button1{
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

.button1:hover{
  background: #0B87A6;
}


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

</style>