import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';

Vue.use(VueRouter); //NB


//create instance of router

const routes = [
    {path: '/' , component: Landing},
    {path: '/signup', component: Signup},
    {path: '/login', component: Login}
]

//creating router

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    el: '#app',
    router,
    render: h => {
        return h(App)
    }
});