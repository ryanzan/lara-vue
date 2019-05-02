/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import {Form, HasError, AlertError} from 'vform'

import select2 from 'select2'
import Swal from 'sweetalert2'
window.Swal = Swal
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.Toast = Toast;
window.select2 = select2;
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
        color: '#bffaf3',
        failedColor: '#874b4b',
        thickness: '5px',
        transition: {
            speed: '0.2s',
            opacity: '0.6s',
            termination: 300
        },
        autoRevert: true,
        location: 'top',
        inverse: false
    }
)

import VueRouter from 'vue-router';

Vue.use(VueRouter);

// const Dashboard = require('./components/Dashboard');
const routes = [
    {path: '/dashboard', component: require('./components/Dashboard').default},
    {path: '/users', component: require('./components/User').default},
    {path:'/profile', component:require('./components/Profile').default},


]
const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('dashboard', require('./components/Dashboard'));

Vue.component('select2', require('./components/select2/Select2').default);
Vue.component('select2-multiple', require('./components/select2/Select2Multiple').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
