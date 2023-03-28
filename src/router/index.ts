import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import User from '../api/User'
import Home from '../view/Home.vue'
import Login from '../view/Login.vue'
import Main from '../view/Main.vue'
import Error from '../view/Error.vue'

function getChildRoute(){
    const routes = [{path:'/',name:'main',component:Main}] as RouteRecordRaw[]
    const view = import.meta.glob('../view/controller/**/*.vue')

    Object.keys(view).forEach((key)=>{
        const name = key.split('controller/').pop()?.split('.').shift()?.toLocaleLowerCase().replace('/index','')!
        // console.log('router: '+name)
        const route = {
            path: `/${name}`,
            name,
            meta: {auth: true},
            component: view[key]
        } as RouteRecordRaw

        routes.push(route)
    })

    return routes
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {auth: true},
            component: Home,
            children: getChildRoute()
        },
        {
            path: '/login',
            name: 'login',
            meta: {auth: false},
            component: Login
        },
        {
            path: '/:any(.*)',
            name: 'error',
            meta: {auth: false},
            component: Error
        }
    ]
})

function logout(){
    localStorage.removeItem('uid')
    localStorage.removeItem('token')
    localStorage.clear()
}

router.beforeEach((to,from,next)=>{
    if(to.meta.auth){
        const uid = localStorage.getItem('uid')!
        const token = localStorage.getItem('token')!

        if(uid == '' || uid == null || token == '' || token == null){
            next({name:'login'})
        }else{
            User.check({uid,token}).then((res:any)=>{
                console.log(res.data)
                if(res.data.code === 1){
                    next()
                }else{
                    logout()
                    next({name:'login'})
                }
            }).catch((res:any)=>{
                logout()
                next({name:'login'})
            })
        }
    }else{
        next()
    }
})

router.beforeResolve((to,from)=>{
    // console.log('beforeResolve')
})

router.afterEach((to,from,fail)=>{
    // console.log('afterEach')
})

export default router