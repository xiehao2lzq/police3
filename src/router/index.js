import Vue from 'vue'
import Router from 'vue-router'
//import Login from '@/components/page/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: ()=>import('@/components/page/Login')
    },
    {
      path:"/community",
      name:"Community",
      component:()=>import('@/components/page/community'),
      redirect:"/community/allInfo",
      children:[
        {
          path:"allInfo",
          name:"AllInfo",
          component:()=>import('@/components/page/community/allInfo')
        }
      ]
    },
    {
      path:"/dealData",
      name:"DealData",
      component:()=>import('@/components/page/dealData'),
      redirect:"/dealData/person",
      children:[
        {
          path:"person",
          name:"Person",
          component:()=>import('@/components/page/dealData/person'),
          redirect:"/dealData/person/nowPic",
          children:[
            {
              path:"nowPic",
              name:"PersonNowPic",
              component:()=>import('@/components/page/dealData/person/nowPic')
            },
            {
              path:"outOrInCard",
              name:"PersonOutOrInCard",
              component:()=>import('@/components/page/dealData/person/outOrInCard')
            },
            {
              path:"heighOutOrIn",
              name:"PersonHeighOutOrIn",
              component:()=>import('@/components/page/dealData/person/heighOutOrIn')
            },
            {
              path:"suspectedInPerson",
              name:"SuspectedInPerson",
              component:()=>import('@/components/page/dealData/person/suspectedInPerson')
            },
            {
              path:"suspectedOutPerson",
              name:"SuspectedOutPerson",
              component:()=>import('@/components/page/dealData/person/suspectedOutPerson')
            },
          ]
        },
        {
          path:"car",
          name:"Car",
          component:()=>import('@/components/page/dealData/car'),
          redirect:"/dealData/car/nowPic",
          children:[
            {
              path:"nowPic",
              name:"CarNowPic",
              component:()=>import('@/components/page/dealData/car/nowPic')
            },
            {
              path:"heighOutOrIn",
              name:"CarHeighOutOrIn",
              component:()=>import('@/components/page/dealData/car/heighOutOrIn')
            },
            {
              path:"outOrInCard",
              name:"CarOutOrInCard",
              component:()=>import('@/components/page/dealData/car/outOrInCard')
            }
          ]
        }
      ]
    },
    {
      path:"/montoring",
      name:"Montoring",
      component:()=>import('@/components/page/montoring')
    },
    {
      path:"/bigData",
      name:"BigData",
      component:()=>import('@/components/page/bigData')
    }
  ]
})
