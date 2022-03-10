import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Auditor from '../views/Auditor.vue'
import Audit from '../views/Audit.vue'
import Checklists from '../views/Checklists.vue'
import ChecklistView from '../views/ChecklistView.vue'
import Division from '../views/Division.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from "../store";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta:{requiresAuth: true},
        children: [
            {path: '/dashboard',name: 'Dashboard',component: Dashboard},
            {path: '/auditor',name: 'Auditor',component: Auditor},
            {path: '/division',name: 'Division',component: Division},
            {path: '/audit',name: 'Audit',component: Audit},
            {path: '/checklists',name: 'Checklists',component: Checklists},
            {path: '/checklists/create',name: 'ChecklistCreate',component: ChecklistView},
            {path: '/checklists/:id',name: 'ChecklistView',component: ChecklistView},

        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {path: '/login',name: 'Login',component: Login}
        ]
    },

];
const router = createRouter({
    history: createWebHistory(),
    routes

})

router.beforeEach((to,from,next) =>{
//    console.log(to.meta.requiresAuth)
//    console.log(!store.state.user.token)
//    console.log(to.name)
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'Login'})
    } else if(store.state.user.token && (to.name === 'Login')) {
        next({name: 'Dashboard'});
    } else{
        next()
    }
})

export default router;
