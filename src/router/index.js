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
          meta:{
            title:'首页'
          }
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
              component:()=>import("@/views/films/films-sub/hotFilms.vue"),
              meta:{
                title:'电影--正在热映'
              }
            },
            {
              path:'/films/release',
              name:"releaseFilms",
              component:()=>import("@/views/films/films-sub/releaseFilms.vue"),
              meta:{
                title:'电影--即将上映'
              }
            },
            {
              path:'/films/classic',
              name:"classicFilms",
              component:()=>import("@/views/films/films-sub/classicFilms.vue"),
              meta:{
                title:'电影--热播电影'
              }
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
              component:()=>import("@/views/billboard/billboard-sub/praise.vue"),
              meta:{
                title:'榜单--热映口碑榜'
              }
            },
            {
              path:'/billboard/expect',
              name:"expect",
              component:()=>import("@/views/billboard/billboard-sub/expect.vue"),
              meta:{
                title:'榜单--最受期待榜'
              }
            },
            {
              path:'/billboard/boxoffice',
              name:"boxoffice",
              component:()=>import("@/views/billboard/billboard-sub/boxoffice.vue"),
              meta:{
                title:'榜单--国内票房榜'
              }
            },
            {
              path:'/billboard/tophundred',
              name:"tophundred",
              component:()=>import("@/views/billboard/billboard-sub/Top.vue"),
              meta:{
                title:'榜单--TOP100榜'
              }
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
                isFooter:true,
                title:'数据分析--综合数据'
               },
              component:()=>import("@/views/cinema/cinema-sub/aggregate.vue"),
            },
            {
              path:'/cinema/office',
              name:"office",
              meta:{  
                isFooter:true,
                title:'数据分析--票房'
              },
              component:()=>import("@/views/cinema/cinema-sub/office.vue")
            },
            {
              path:'/cinema/arrangement',
              name:"arrangeme",
              meta:{  
                isFooter:true,
                title:'数据分析--电影排片'
              },
              component:()=>import("@/views/cinema/cinema-sub/arrangement.vue")
            },
          ]
        },
        {
          path: "/hotspot",
          name: "hot-post",
          component: () => import("@/views/hotspot"),
          meta:{  
            title:'热点影评'
          },
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
      meta:{
        title:'登录'
      }
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
    },
    {
      path: "/account",
      name: "account",
      component: () => import("@/views/home/account.vue"),
    },
  ],
});

router.afterEach(()=>{
  window.scrollTo(0,0)
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
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
