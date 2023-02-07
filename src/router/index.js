import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  // mode:'history',
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("@/layout/index.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/home"),
        },
        {
          path: "/films",
          name: "g-films",
          redirect:'/films/hot',
          component: () => import("@/views/films"),
          children:[
            {
              path:'/films/hot',
              name:"hotFilms",
              component:()=>import("@/views/films/films-sub/hotFilms.vue")
            },
            {
              path:'/films/release',
              name:"releaseFilms",
              component:()=>import("@/views/films/films-sub/releaseFilms.vue")
            },
            {
              path:'/films/classic',
              name:"classicFilms",
              component:()=>import("@/views/films/films-sub/classicFilms.vue")
            },
          ]
        },
        {
          path: "/billboard",
          name: "g-billboard",
          redirect:'/billboard/praise',
          component: () => import("@/views/billboard"),
          children:[
            {
              path:'/billboard/praise',
              name:"praise",
              component:()=>import("@/views/billboard/billboard-sub/praise.vue")
            },
            {
              path:'/billboard/expect',
              name:"expect",
              component:()=>import("@/views/billboard/billboard-sub/expect.vue")
            },
            {
              path:'/billboard/boxoffice',
              name:"boxoffice",
              component:()=>import("@/views/billboard/billboard-sub/boxoffice.vue")
            },
            {
              path:'/billboard/tophundred',
              name:"tophundred",
              component:()=>import("@/views/billboard/billboard-sub/Top.vue")
            },
          ]
        },
        {
          path: "/cinema",
          name: "g-cniema",
          redirect:'/cinema/aggregate',
          component: () => import("@/views/cinema"),
          meta:{  
           isFooter:true
          },
          children:[
            {
              path:'/cinema/aggregate',
              name:"aggregate",
              meta:{  
                isFooter:true
               },
              component:()=>import("@/views/cinema/cinema-sub/aggregate.vue")
            },
            {
              path:'/cinema/office',
              name:"office",
              meta:{  
                isFooter:true
              },
              component:()=>import("@/views/cinema/cinema-sub/office.vue")
            },
            {
              path:'/cinema/arrangement',
              name:"arrangeme",
              meta:{  
                isFooter:true
              },
              component:()=>import("@/views/cinema/cinema-sub/arrangement.vue")
            },
          ]
        },
        {
          path: "/hotspot",
          name: "hot-post",
          component: () => import("@/views/hotspot"),
        },
        {
          path: "/movie/maker",
          name: "movie-maker",
          component: () => import("@/views/moviemaker"),
        },
        {
          path: "/movie/flims/detail",
          name: "movie-detail",
          component: () => import("@/views/films/filmsdetail.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login"),
    },
    {
      path: "/evaluation",
      name: "evaluation",
      component: () => import("@/views/evaluation"),
    },
    {
      path: "/films-detail",
      name: "films-detail",
      component: () => import("@/views/hotspot/reviewdetail.vue"),
    }
  ],
});

router.afterEach(()=>{
  window.scrollTo(0,0)
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//   return originalReplace.call(this, location).catch((err) => err);
// };
export default router;
