const Mock = require("mockjs");
const getRegExpUrl = function (relativeUrl) {
  return RegExp(relativeUrl + ".*");
};

const image = {
  img1: require("@/assets/image/猫眼/220 (1).jpg"),
  img2: require("@/assets/image/猫眼/220 (3).jpg"),
  img3: require("@/assets/image/猫眼/220 (2).jpg"),
  img4: require("@/assets/image/猫眼/220 (4).jpg"),
  img5: require("@/assets/image/猫眼/220 (5).jpg"),
  img6: require("@/assets/image/猫眼/220 (6).jpg"),
  img7: require("@/assets/image/猫眼/220 (7).jpg"),
  img8: require("@/assets/image/猫眼/220 (8).jpg"),
  img9: require("@/assets/image/猫眼/220 (9).jpg"),
  img10:require("@/assets/image/猫眼/220 (10).jpg"),
  img11:require('@/assets/image/猫眼/220.jpg'),
  img12:require('@/assets/image/猫眼/220 (16).jpg'),
  img13:require('@/assets/image/猫眼/220 (11).jpg'),
  img14:require('@/assets/image/猫眼/220 (15).jpg'),
  img15:require('@/assets/image/猫眼/220 (12).jpg'),
  img16:require('@/assets/image/猫眼/220 (13).jpg'),
  img17:require('@/assets/image/猫眼/1.jpg'),
  img18:require('@/assets/image/猫眼/220 (14).jpg'),
  img19:require('@/assets/image/猫眼/221.jpg'),
  img20:require('@/assets/image/猫眼/220 (17).jpg'),
  img21:require('@/assets/image/猫眼/220 (19).jpg'),
  img22:require('@/assets/image/猫眼/220 (18).jpg'),
  img23:require('@/assets/image/猫眼/220 (21).jpg'),
  img24:require('@/assets/image/豆瓣/46.jpg'),
  img25:require('@/assets/image/豆瓣/43.jpg'),
  img26:require('@/assets/image/豆瓣/45.jpg'),
  img27:require('@/assets/image/豆瓣/33.jpg'),
  img28:require('@/assets/image/豆瓣/25.jpg'),
  img29:require('@/assets/image/豆瓣/47.jpg'),
  img30:require('@/assets/image/豆瓣/22.jpg'),
  img31:require('@/assets/image/豆瓣/34.jpg'),
  img32:require('@/assets/image/热门影评/1.jpg'),
  img33:require('@/assets/image/热门影评/2.jpg'),
  img34:require('@/assets/image/热门影评/4.jpg'),
  img35:require('@/assets/image/热门影评/3.jpg'),
  img36:require('@/assets/image/猫眼/80.jpg'),
  img37:require('@/assets/image/猫眼/194.jpg'),
  img38:require('@/assets/image/猫眼/118.jpg'),
  img39:require('@/assets/image/猫眼/118 (1).jpg'),
  img40:require('@/assets/image/猫眼/2.jpg'),
  img41:require('@/assets/image/猫眼/3.jpg'),
  //home
  home1: require("@/assets/image/home/综艺/8.jpg"),
  home2: require("@/assets/image/home/综艺/5.jpg"),
  home3: require("@/assets/image/home/综艺/13.jpg"),
  home4: require("@/assets/image/home/综艺/14.jpg"),
  home5: require("@/assets/image/home/综艺/12.jpg"),
  home6: require("@/assets/image/home/综艺/11.jpg"),
  home7: require("@/assets/image/home/综艺/10.jpg"),
  home8: require("@/assets/image/home/综艺/6.jpg"),
  home9: require("@/assets/image/home/美剧/4.jpg"),
  home10:require("@/assets/image/home/美剧/6.jpg"),
  home11:require("@/assets/image/home/美剧/8.jpg"),
  home12:require("@/assets/image/home/美剧/3.jpg"),
  home13:require("@/assets/image/home/美剧/7.jpg"),
  home14:require("@/assets/image/home/美剧/5.jpg"),
  home15:require("@/assets/image/home/美剧/2.jpg"),
  home16:require("@/assets/image/home/美剧/1.jpg"),
  home17:require("@/assets/image/home/韩剧/3.jpg"),
  home18:require("@/assets/image/home/韩剧/6.jpg"),
  home19:require("@/assets/image/home/韩剧/7.jpg"),
  home20:require("@/assets/image/home/韩剧/8.jpg"),
  home21:require("@/assets/image/home/韩剧/5.jpg"),
  home22:require("@/assets/image/home/韩剧/1.jpg"),
  home23:require("@/assets/image/home/韩剧/4.jpg"),
  home24:require("@/assets/image/home/韩剧/2.jpg"),
  home25:require("@/assets/image/home/纪录片/1.jpg"),
  home26:require("@/assets/image/home/纪录片/5.jpg"),
  home27:require("@/assets/image/home/纪录片/9.jpg"),
  home28:require("@/assets/image/home/纪录片/10.jpg"),
  home29:require("@/assets/image/home/纪录片/8.jpg"),
  home30:require("@/assets/image/home/纪录片/6.jpg"),
  home31:require("@/assets/image/home/纪录片/3.jpg"),
  home32:require("@/assets/image/home/纪录片/2.jpg"),
  //国产
  home33:require('@/assets/image/豆瓣/29.jpg'),
  home34:require('@/assets/image/豆瓣/12.jpg'),
  home35:require('@/assets/image/豆瓣/24.jpg'),
  home36:require('@/assets/image/豆瓣/10.jpg'),
  home37:require('@/assets/image/豆瓣/23.jpg'),
  home38:require('@/assets/image/豆瓣/48.jpg'),
  home39:require('@/assets/image/豆瓣/31.jpg'),
  home40:require('@/assets/image/豆瓣/37.jpg'),
  home41:require('@/assets/image/豆瓣/35.jpg'),
  home42:require('@/assets/image/豆瓣/7.jpg'),
  home43:require('@/assets/image/豆瓣/8.jpg'),
  home44:require('@/assets/image/豆瓣/30.jpg'),
  home45:require('@/assets/image/豆瓣/19.jpg'),
  home46:require('@/assets/image/豆瓣/39.jpg'),
  home47:require('@/assets/image/豆瓣/17.jpg'),
  home48:require('@/assets/image/豆瓣/36.jpg'),
  home49:require('@/assets/image/豆瓣/42.jpg'),
  home50:require('@/assets/image/豆瓣/14.jpg'),
  home51:require('@/assets/image/豆瓣/11.jpg'),
  home52:require('@/assets/image/豆瓣/18.jpg'),
  home53:require('@/assets/image/豆瓣/15.jpg'),
  home54:require('@/assets/image/豆瓣/16.jpg'),
  home55:require('@/assets/image/豆瓣/21.jpg'),
  home56:require('@/assets/image/豆瓣/41.jpg'),
  home57:require('@/assets/image/豆瓣/57.jpg'),
  home58:require('@/assets/image/豆瓣/55.jpg'),
  home59:require('@/assets/image/豆瓣/52.jpg'),
  home60:require('@/assets/image/豆瓣/54.jpg'),
  home61:require('@/assets/image/豆瓣/51.jpg'),
  home62:require('@/assets/image/豆瓣/53.jpg'),
  home63:require('@/assets/image/豆瓣/58.jpg'),
  home64:require('@/assets/image/豆瓣/56.jpg'),
  //综艺
  variety1: require("@/assets/image/home/综艺/46.jpg"),
  variety2: require("@/assets/image/home/综艺/2.jpg"),
  variety3: require("@/assets/image/home/综艺/9.jpg"),
  variety4: require("@/assets/image/home/综艺/1.jpg"),
  variety5: require("@/assets/image/home/综艺/36.jpg"),
  variety6: require("@/assets/image/home/综艺/7.jpg"),
  variety7: require("@/assets/image/home/综艺/41.jpg"),
  variety8: require("@/assets/image/home/综艺/30.jpg"),
  variety9: require("@/assets/image/home/综艺/27.jpg"),
  variety10:require("@/assets/image/home/综艺/34.jpg"),
  variety11:require("@/assets/image/home/综艺/45.jpg"),
  variety12:require("@/assets/image/home/综艺/44.jpg"),
  variety13:require("@/assets/image/home/综艺/33.jpg"),
  variety14:require("@/assets/image/home/综艺/20.jpg"),
  variety15:require("@/assets/image/home/综艺/3.jpg"),
  variety16:require("@/assets/image/home/综艺/25.jpg"),
  variety17:require("@/assets/image/home/综艺/32.jpg"),
  variety18:require("@/assets/image/home/综艺/19.jpg"),
  variety19:require("@/assets/image/home/综艺/15.jpg"),
  variety20:require("@/assets/image/home/综艺/29.jpg"),
  variety21:require("@/assets/image/home/综艺/18.jpg"),
  variety22:require("@/assets/image/home/综艺/17.jpg"),
  variety23:require("@/assets/image/home/综艺/23.jpg"),
  variety24:require("@/assets/image/home/综艺/37.jpg"),
  variety25:require("@/assets/image/home/综艺/35.jpg"),
  variety26:require("@/assets/image/home/综艺/16.jpg"),
  variety27:require("@/assets/image/home/综艺/39.jpg"),
  variety28:require("@/assets/image/home/综艺/22.jpg"),
  variety29:require("@/assets/image/home/综艺/21.jpg"),
  variety30:require("@/assets/image/home/综艺/38.jpg"),
  variety31:require("@/assets/image/home/综艺/26.jpg"),
  variety32:require("@/assets/image/home/综艺/40.jpg"),
  //美剧
  UsTv1: require("@/assets/image/home/美剧/24.jpg"),
  UsTv2: require("@/assets/image/home/美剧/28.jpg"),
  UsTv3: require("@/assets/image/home/美剧/9.jpg"),
  UsTv4: require("@/assets/image/home/美剧/14.jpg"),
  UsTv5: require("@/assets/image/home/美剧/36.jpg"),
  UsTv6: require("@/assets/image/home/美剧/10.jpg"),
  UsTv7: require("@/assets/image/home/美剧/13.jpg"),
  UsTv8: require("@/assets/image/home/美剧/30.jpg"),
  UsTv9: require("@/assets/image/home/美剧/27.jpg"),
  UsTv10:require("@/assets/image/home/美剧/34.jpg"),
  UsTv11:require("@/assets/image/home/美剧/12.jpg"),
  UsTv12:require("@/assets/image/home/美剧/11.jpg"),
  UsTv13:require("@/assets/image/home/美剧/33.jpg"),
  UsTv14:require("@/assets/image/home/美剧/20.jpg"),
  UsTv15:require("@/assets/image/home/美剧/31.jpg"),
  UsTv16:require("@/assets/image/home/美剧/25.jpg"),
  UsTv17:require("@/assets/image/home/美剧/32.jpg"),
  UsTv18:require("@/assets/image/home/美剧/19.jpg"),
  UsTv19:require("@/assets/image/home/美剧/15.jpg"),
  UsTv20:require("@/assets/image/home/美剧/29.jpg"),
  UsTv21:require("@/assets/image/home/美剧/18.jpg"),
  UsTv22:require("@/assets/image/home/美剧/17.jpg"),
  UsTv23:require("@/assets/image/home/美剧/23.jpg"),
  UsTv24:require("@/assets/image/home/美剧/37.jpg"),
  UsTv25:require("@/assets/image/home/美剧/35.jpg"),
  UsTv26:require("@/assets/image/home/美剧/16.jpg"),
  UsTv27:require("@/assets/image/home/美剧/39.jpg"),
  UsTv28:require("@/assets/image/home/美剧/22.jpg"),
  UsTv29:require("@/assets/image/home/美剧/21.jpg"),
  UsTv30:require("@/assets/image/home/美剧/38.jpg"),
  UsTv31:require("@/assets/image/home/美剧/26.jpg"),
  UsTv32:require("@/assets/image/home/美剧/40.jpg"),
  //韩剧
  KoreanTv1: require("@/assets/image/home/韩剧/24.jpg"),
  KoreanTv2: require("@/assets/image/home/韩剧/28.jpg"),
  KoreanTv3: require("@/assets/image/home/韩剧/9.jpg"),
  KoreanTv4: require("@/assets/image/home/韩剧/14.jpg"),
  KoreanTv5: require("@/assets/image/home/韩剧/36.jpg"),
  KoreanTv6: require("@/assets/image/home/韩剧/10.jpg"),
  KoreanTv7: require("@/assets/image/home/韩剧/13.jpg"),
  KoreanTv8: require("@/assets/image/home/韩剧/30.jpg"),
  KoreanTv9: require("@/assets/image/home/韩剧/27.jpg"),
  KoreanTv10:require("@/assets/image/home/韩剧/34.jpg"),
  KoreanTv11:require("@/assets/image/home/韩剧/12.jpg"),
  KoreanTv12:require("@/assets/image/home/韩剧/11.jpg"),
  KoreanTv13:require("@/assets/image/home/韩剧/33.jpg"),
  KoreanTv14:require("@/assets/image/home/韩剧/20.jpg"),
  KoreanTv15:require("@/assets/image/home/韩剧/31.jpg"),
  KoreanTv16:require("@/assets/image/home/韩剧/25.jpg"),
  KoreanTv17:require("@/assets/image/home/韩剧/32.jpg"),
  KoreanTv18:require("@/assets/image/home/韩剧/19.jpg"),
  KoreanTv19:require("@/assets/image/home/韩剧/15.jpg"),
  KoreanTv20:require("@/assets/image/home/韩剧/29.jpg"),
  KoreanTv21:require("@/assets/image/home/韩剧/18.jpg"),
  KoreanTv22:require("@/assets/image/home/韩剧/17.jpg"),
  KoreanTv23:require("@/assets/image/home/韩剧/23.jpg"),
  KoreanTv24:require("@/assets/image/home/韩剧/37.jpg"),
  KoreanTv25:require("@/assets/image/home/韩剧/35.jpg"),
  KoreanTv26:require("@/assets/image/home/韩剧/16.jpg"),
  KoreanTv27:require("@/assets/image/home/韩剧/39.jpg"),
  KoreanTv28:require("@/assets/image/home/韩剧/22.jpg"),
  KoreanTv29:require("@/assets/image/home/韩剧/21.jpg"),
  KoreanTv30:require("@/assets/image/home/韩剧/38.jpg"),
  KoreanTv31:require("@/assets/image/home/韩剧/26.jpg"),
  KoreanTv32:require("@/assets/image/home/韩剧/40.jpg"),
  //纪录片
  documentary1: require("@/assets/image/home/纪录片/24.jpg"),
  documentary2: require("@/assets/image/home/纪录片/28.jpg"),
  documentary3: require("@/assets/image/home/纪录片/4.jpg"),
  documentary4: require("@/assets/image/home/纪录片/14.jpg"),
  documentary5: require("@/assets/image/home/纪录片/36.jpg"),
  documentary6: require("@/assets/image/home/纪录片/7.jpg"),
  documentary7: require("@/assets/image/home/纪录片/13.jpg"),
  documentary8: require("@/assets/image/home/纪录片/30.jpg"),
  documentary9: require("@/assets/image/home/纪录片/27.jpg"),
  documentary10:require("@/assets/image/home/纪录片/34.jpg"),
  documentary11:require("@/assets/image/home/纪录片/12.jpg"),
  documentary12:require("@/assets/image/home/纪录片/11.jpg"),
  documentary13:require("@/assets/image/home/纪录片/33.jpg"),
  documentary14:require("@/assets/image/home/纪录片/20.jpg"),
  documentary15:require("@/assets/image/home/纪录片/31.jpg"),
  documentary16:require("@/assets/image/home/纪录片/25.jpg"),
  documentary17:require("@/assets/image/home/纪录片/32.jpg"),
  documentary18:require("@/assets/image/home/纪录片/19.jpg"),
  documentary19:require("@/assets/image/home/纪录片/15.jpg"),
  documentary20:require("@/assets/image/home/纪录片/29.jpg"),
  documentary21:require("@/assets/image/home/纪录片/18.jpg"),
  documentary22:require("@/assets/image/home/纪录片/17.jpg"),
  documentary23:require("@/assets/image/home/纪录片/23.jpg"),
  documentary24:require("@/assets/image/home/纪录片/37.jpg"),
  documentary25:require("@/assets/image/home/纪录片/35.jpg"),
  documentary26:require("@/assets/image/home/纪录片/16.jpg"),
  documentary27:require("@/assets/image/home/纪录片/39.jpg"),
  documentary28:require("@/assets/image/home/纪录片/22.jpg"),
  documentary29:require("@/assets/image/home/纪录片/21.jpg"),
  documentary30:require("@/assets/image/home/纪录片/38.jpg"),
  documentary31:require("@/assets/image/home/纪录片/26.jpg"),
  documentary32:require("@/assets/image/home/纪录片/40.jpg"),
};

//设置拦截axios请求的时间
Mock.setup({
  timeout: "100",
});

//首页

//正在热映
Mock.mock(getRegExpUrl("/getMenuList"), "post", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: [
      { path: "/home", title: "首页", id: "1" },
      { path: "/films", title: "电影", id: "2" },
      { path: "/cinema", title: "影院", id: "3" },
      { path: "/billboard", title: "榜单", id: "4" },
      { path: "/hotspot", title: "热点", id: "5" },
    ],
  };
});
//即将上映
Mock.mock(getRegExpUrl("/getHotMovies"), "post", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "正在热映",
      total: 34,
      data: [
        { moviename: "忍者神龟:崛起", img: image.img1, id: 1, type: "hot" },
        { moviename: "扫黑行动", img: image.img2, id: 2, type: "hot" },
        { moviename: "名侦探柯南", img: image.img3, id: 3, type: "hot" },
        { moviename: "万里归途", img: image.img4, id: 4, type: "hot" },
        { moviename: "哥，你好", img: image.img5, id: 5, type: "hot" },
        { moviename: "坠落", img: image.img6, id: 6, type: "hot" },
        { moviename: "沼泽深处的女孩", img: image.img7, id: 7, type: "hot" },
        { moviename: "放牛班的春天", img: image.img8, id: 8, type: "hot" },
      ],
    },
  };
});
Mock.mock(getRegExpUrl("/getsoonRelease"), "get", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "即将上映",
      total: 96,
      data: [
        { moviename: "2067", img: image.img9, id: 1, type: "soon",num:2095,releaseTime:'12月2日' },
        { moviename: "小小乔", img: image.img10, id: 2, type: "soon" ,num:722,releaseTime:'12月2日'},
        { moviename: "航海王：红发歌姬", img: image.img11, id: 3, type: "soon" ,num:9695,releaseTime:'12月2日'},
        { moviename: "老人与经书", img: image.img12, id: 4, type: "soon",num:84 ,releaseTime:'12月2日'},
        { moviename: "奇迹小子", img: image.img13, id: 5, type: "soon",num:32 ,releaseTime:'12月2日'},
        { moviename: "阿凡达:水之道", img: image.img14, id: 6, type: "soon",num:967989,releaseTime:'12月6日' },
        { moviename: "谁偷了我的粉兔子", img: image.img15, id: 7, type: "soon",num:529,releaseTime:'12月16日' },
        { moviename: "绑架游戏", img: image.img16, id: 8, type: "soon",num:70976,releaseTime:'12月23日' },
      ],
    },
};});
//热播电影
Mock.mock(getRegExpUrl("/getHotPlay"), "get", () => {
    return {
      status: 0,
      msg: "操作成功",
      data: {
        title: "热播电影",
        data: [
          { moviename: "厉鬼将映", img: image.img17, id: 1, type: "hotPlay",score:7.2},
          { moviename: "唐人街探案", img: image.img18, id: 2, type: "hotPlay",score:9.1},
          { moviename: "魁拔Ⅲ战神崛起", img: image.img19, id: 3, type: "hotPlay",score:9.4},
          { moviename: "战狼", img: image.img20, id: 4, type: "hotPlay",score:9.3},
          { moviename: "夏洛特烦恼", img: image.img21, id: 5, type: "hotPlay",score:9.2},
          { moviename: "异形大战阿凡达", img: image.img22, id: 6, type: "hotPlay",score:2.6},
          { moviename: "无间道", img: image.img23, id: 7, type: "hotPlay",score:9.2},
        ],
      },
};});
//热播电视剧
Mock.mock(getRegExpUrl("/getHotTvPlay"), "get", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "热播电视剧",
      total: 34,
      //国产
      domestic: [
        {key:'1',moviceList:[
        { moviename: "风吹半夏", img: image.img24, id: 1, type: "hotTV",update:'更新至12集',score:'' },
        { moviename: "点燃我，温暖你", img: image.img25, id: 2, type: "hotTV",update:'36集全',score:'7.3' },
        { moviename: "卿卿日常", img: image.img26, id: 3, type: "hotTV",update:'更新至34集',score:'7.3' },
        { moviename: "爱的二八定律", img: image.img27, id: 4, type: "hotTV",update:'更新至24集',score:'' },
        { moviename: "天下长河", img: image.img28, id: 5, type: "hotTV",update:'更新至39集',score:'8.1' },
        { moviename: "唐朝诡事录", img: image.img29, id: 6, type: "hotTV",update:'',score:'7.9' },
        { moviename: "谢谢你医生", img: image.img30, id: 7, type: "hotTV",update:'四十集全',score:'6.1' },
        { moviename: "幸福到万家", img: image.img31, id: 8, type: "hotTV",update:'',score:'7.1' },]
        },
        {key:'2',moviceList:[
          { moviename: "大理寺日志", img: image.home48, id: 1, type: "hotTV",update:'更新至12集',score:'8.4' },
          { moviename: "谁是凶手", img: image.home33, id: 2, type: "hotTV",update:'36集全',score:'6.2' },
          { moviename: "知否知否应是绿肥红瘦", img: image.home34, id: 3, type: "hotTV",update:'',score:'7.8' },
          { moviename: "苍兰决", img: image.home35, id: 4, type: "hotTV",update:'',score:'7.9' },
          { moviename: "楚乔传", img: image.home36, id: 5, type: "hotTV",update:'更新至39集',score:'7.9' },
          { moviename: "梦华录", img: image.home37, id: 6, type: "hotTV",update:'',score:'8.0' },
          { moviename: "我们的当打之年", img: image.home38, id: 7, type: "hotTV",update:'更新至20集',score:'3.6' },
          { moviename: "人世间", img: image.home39, id: 8, type: "hotTV",update:'',score:'8.1' },]
        },
        {key:'3',moviceList:[
          { moviename: "三悦有了新工作", img: image.home40, id: 1, type: "hotTV",update:'更新至12集',score:'8.5' },
          { moviename: "星汉灿烂·月升沧海", img: image.home41, id: 2, type: "hotTV",update:'',score:'7.7' },
          { moviename: "琅琊榜", img: image.home42, id: 3, type: "hotTV",update:'',score:'9.4' },
          { moviename: "大明王朝1566", img: image.home43, id: 4, type: "hotTV",update:'',score:'9.7' },
          { moviename: "开端", img: image.home44, id: 5, type: "hotTV",update:'',score:'7.8' },
          { moviename: "觉醒年代", img: image.home45, id: 6, type: "hotTV",update:'',score:'9.3' },
          { moviename: "底线", img: image.home46, id: 7, type: "hotTV",update:'',score:'7.3' },
          { moviename: "沉默的真相", img: image.home47, id: 8, type: "hotTV",update:'',score:'9.0' },]
        },
        {key:'4',moviceList:[
          { moviename: "不期而至", img: image.home49, id: 1, type: "hotTV",update:'',score:'6.6' },
          { moviename: "父母爱情", img: image.home50, id: 2, type: "hotTV",update:'',score:'9.5' },
          { moviename: "武林外传", img: image.home51, id: 3, type: "hotTV",update:'',score:'9.6' },
          { moviename: "山海情", img: image.home52, id: 4, type: "hotTV",update:'',score:'9.2' },
          { moviename: "三国演义", img: image.home53, id: 5, type: "hotTV",update:'',score:'9.6' },
          { moviename: "庆余年 第一季", img: image.home54, id: 6, type: "hotTV",update:'',score:'7.9' },
          { moviename: "星河长明", img: image.home55, id: 7, type: "hotTV",update:'',score:'' },
          { moviename: "警察荣耀", img: image.home56, id: 8, type: "hotTV",update:'',score:'8.3' },]
        },
        {key:'5',moviceList:[
          { moviename: "有翡", img: image.home57, id: 1, type: "hotTV",update:'',score:'5.6' },
          { moviename: "三生三世十里桃花", img: image.home58, id: 2, type: "hotTV",update:'',score:'6.5' },
          { moviename: "如此可爱的我们", img: image.home59, id: 3, type: "hotTV",update:'',score:'8.1' },
          { moviename: "风犬少年的天空", img: image.home60, id: 4, type: "hotTV",update:'',score:'8.0' },
          { moviename: "仙剑奇侠传三", img: image.home61, id: 5, type: "hotTV",update:'',score:'8.9' },
          { moviename: "隐秘的角落", img: image.home62, id: 6, type: "hotTV",update:'',score:'8.8' },
          { moviename: "信仰", img: image.home63, id: 7, type: "hotTV",update:'',score:'' },
          { moviename: "周生如故", img: image.home64, id: 8, type: "hotTV",update:'',score:'7.3' },]
        }
      ],
      //综艺
      variety:[
      { key:'1',moviceList:[
        {moviename:'一年一度喜剧大赛',score:'8.5',img:image.home1},
        {moviename:'克拉克森的农场 第一季',score:'9.6',img:image.home2},
        {moviename:'伊甸园 第二季',score:'6.3',img:image.home3},
        {moviename:'仔仔一堂',score:'8.7',img:image.home4},
        {moviename:'韩国NO.1',score:'6.7',img:image.home5},
        {moviename:'一年一度喜剧大赛 第二季',score:'8.1',img:image.home6},
        {moviename:'脱口秀大会 第五季',score:'5.8',img:image.home7},
        {moviename:'再见爱人',score:'8.9',img:image.home8},]
      },
      { key:'2',moviceList:[
        {moviename:'令人心动的offer 第四季',score:'7.3',img:image.variety1},
        {moviename:'乐队的夏天 第一季',score:'8.7',img:image.variety2},
        {moviename:'快乐再出发',score:'9.6',img:image.variety3},
        {moviename:'明星大侦探 第一季',score:'9.4',img:image.variety4},
        {moviename:'典籍里的中国',score:'8.7',img:image.variety5},
        {moviename:'脱口秀大会 第四季',score:'7.6',img:image.variety6},
        {moviename:'富豪谷底求翻身 第二季',score:'8.1',img:image.variety7},
        {moviename:'脱口秀大会 第三季',score:'7.9',img:image.variety8},]
      },
      { key:'3',moviceList:[
        {moviename:'明星大侦探 第五季',score:'8.3',img:image.variety9},
        {moviename:'明星大侦探 第六季',score:'8.7',img:image.variety10},
        {moviename:'乐队的海边',score:'9.1',img:image.variety11},
        {moviename:'再见爱人 第二季',score:'8.2',img:image.variety12},
        {moviename:'令人心动的offer 第二季',score:'7.3',img:image.variety13},
        {moviename:'明星大侦探 第二季',score:'9.0',img:image.variety14},
        {moviename:'令人心动的offer 第一季',score:'8.2',img:image.variety15},
        {moviename:'锵锵行天下 第一季',score:'9.1',img:image.variety16},]
      },
      { key:'4',moviceList:[
        {moviename:'说唱新时代',score:'9.1',img:image.variety17},
        {moviename:'圆桌派 第一季',score:'8.9',img:image.variety18},
        {moviename:'非正式会谈 第一季',score:'9.3',img:image.variety19},
        {moviename:'密室大逃脱 第二季',score:'7.0',img:image.variety20},
        {moviename:'极限挑战 第二季',score:'9.4',img:image.variety21},
        {moviename:'花样青春(非洲篇)',score:'9.5',img:image.variety22},
        {moviename:'国家宝藏 第一季',score:'9.0',img:image.variety23},
        {moviename:'嗨放派 第一季',score:'7.1',img:image.variety24},]
      },
      { key:'5',moviceList:[
        {moviename:'戏剧新生活',score:'9.2',img:image.variety25},
        {moviename:'非正式会谈 第二季',score:'9.6',img:image.variety26},
        {moviename:'毛雪汪 第一季',score:'7.3',img:image.variety27},
        {moviename:'脱口秀 第一季',score:'6.8',img:image.variety28},
        {moviename:'向往的生活 第一季',score:'7.5',img:image.variety29},
        {moviename:'换乘恋爱',score:'8.5',img:image.variety30},
        {moviename:'解放守护西',score:'8.6',img:image.variety31},
        {moviename:'令人心动的offer 第三季',score:'7.7',img:image.variety32},]
      }
      ],
      //美剧
      UsTv:[
      { key:'1',moviceList:[
        {moviename:'星期三',score:'8.0',img:image.home9},
        {moviename:'塔尔萨之王 第一季',score:'9.1',img:image.home10},
        {moviename:'逐星女 第三季',score:'7.7',img:image.home11},
        {moviename:'拉米 第三季',score:'8.3',img:image.home12},
        {moviename:'百事，我的战斗机呢？',score:'8.7',img:image.home13},
        {moviename:'白莲花度假村 第二季',score:'8.9',img:image.home14},
        {moviename:'边缘世界 第一季',score:'8.0',img:image.home15},
        {moviename:'怪奇物语',score:'9.2',img:image.home16},]
      },
      { key:'2',moviceList:[
        {moviename:'怪物:杰夫瑞·达莫的故事 第一季',score:'8.1',img:image.UsTv1},
        {moviename:'大学女生的性生活 第二季',score:'8.6',img:image.UsTv2},
        {moviename:'摩登家族 第十一季',score:'9.7',img:image.UsTv3},
        {moviename:'风骚律师 第六季',score:'9.8',img:image.UsTv4},
        {moviename:'破产姐妹 第六季',score:'8.6',img:image.UsTv5},
        {moviename:'后翼弃兵',score:'9.0',img:image.UsTv6},
        {moviename:'成瘾剂量 第二季',score:'9.4',img:image.UsTv7},
        {moviename:'黑暗物质三部曲 第三季',score:'',img:image.UsTv8},]
      },
      { key:'3',moviceList:[
        {moviename:'王冠 第五季',score:'8.0',img:image.UsTv9},
        {moviename:'老友记 第十季',score:'9.8',img:image.UsTv10},
        {moviename:'亢奋 第二季',score:'8.0',img:image.UsTv11},
        {moviename:'致命女人 第二季',score:'7.3',img:image.UsTv12},
        {moviename:'绝命毒师 第五季',score:'9.3',img:image.UsTv13},
        {moviename:'安多 第一季',score:'9.0',img:image.UsTv14},
        {moviename:'疯狂动物城+',score:'8.0',img:image.UsTv15},
        {moviename:'美国恐怖故事 第十一季',score:'6.2',img:image.UsTv16},]
      },
      { key:'4',moviceList:[
        {moviename:'犯罪心理 第十六季',score:'9.2',img:image.UsTv17},
        {moviename:'夜访吸血鬼 第一季',score:'8.5',img:image.UsTv18},
        {moviename:'人生切割术 第一季',score:'9.1',img:image.UsTv19},
        {moviename:'吉尔莫·德尔·托罗的奇思妙想',score:'7.3',img:image.UsTv20},
        {moviename:'龙之家族 第一季',score:'8.8',img:image.UsTv21},
        {moviename:'爱，死亡和机器人 第三季',score:'8.5',img:image.UsTv22},
        {moviename:'项塔兰',score:'8.1',img:image.UsTv23},
        {moviename:'越狱 第五季',score:'8.2',img:image.UsTv24},]
      },
      { key:'5',moviceList:[
        {moviename:'再造淑女',score:'8.4',img:image.UsTv25},
        {moviename:'闪亮女孩',score:'8.6',img:image.UsTv26},
        {moviename:'侦探 第三季',score:'8.1',img:image.UsTv27},
        {moviename:'瑞克与莫蒂 第六季',score:'9.6',img:image.UsTv28},
        {moviename:'坏姐妹 第一季',score:'8.5',img:image.UsTv29},
        {moviename:'生活大爆炸 第十二季',score:'9.7',img:image.UsTv30},
        {moviename:'小谢尔顿',score:'9.0',img:image.UsTv31},
        {moviename:'权力的游戏 第八季',score:'6.1',img:image.UsTv32},]
      }
      ],
      //韩剧
      KoreanTv:[
      { key:'1',moviceList:[
        {moviename:'财阀家的小儿子',score:'8.3',img:image.home17},
        {moviename:'弱小英雄',score:'8.7',img:image.home18},
        {moviename:'请给我寄粉丝信',score:'7.4',img:image.home19},
        {moviename:'令我心动的女孩',score:'8.2',img:image.home20},
        {moviename:'命定之人',score:'7.0',img:image.home21},
        {moviename:'请回答1988',score:'9.7',img:image.home22},
        {moviename:'第三人称复仇',score:'8.0',img:image.home23},
        {moviename:'王后伞下',score:'8.2',img:image.home24},]
      },
      { key:'2',moviceList:[
        {moviename:'少年法庭',score:'8.7',img:image.KoreanTv1},
        {moviename:'安娜',score:'7.6',img:image.KoreanTv2},
        {moviename:'金秘书为何那样',score:'8.0',img:image.KoreanTv3},
        {moviename:'文森佐',score:'8.0',img:image.KoreanTv4},
        {moviename:'举重妖精金福珠',score:'8.7',img:image.KoreanTv5},
        {moviename:'德鲁纳酒店',score:'7.9',img:image.KoreanTv6},
        {moviename:'机智医生生活',score:'9.5',img:image.KoreanTv7},
        {moviename:'小小姐们',score:'7.2',img:image.KoreanTv8},]
      },
      { key:'3',moviceList:[
        {moviename:'非常律师禹英隅',score:'8.9',img:image.KoreanTv9},
        {moviename:'消防厅旁警察厅',score:'7.7',img:image.KoreanTv10},
        {moviename:'爱的迫降',score:'8.3',img:image.KoreanTv11},
        {moviename:'浪漫的体质',score:'9.2',img:image.KoreanTv12},
        {moviename:'身价 第二季',score:'7.1',img:image.KoreanTv13},
        {moviename:'鱿鱼游戏 第一季',score:'7.7',img:image.KoreanTv14},
        {moviename:'金汤匙',score:'6.9',img:image.KoreanTv15},
        {moviename:'猪猡之王',score:'8.7',img:image.KoreanTv16},]
      },
      { key:'4',moviceList:[
        {moviename:'高斯电子公司',score:'7.5',img:image.KoreanTv17},
        {moviename:'柔美的细胞小将',score:'8.4',img:image.KoreanTv18},
        {moviename:'模范出租车',score:'8.2',img:image.KoreanTv19},
        {moviename:'黑话律师',score:'7.3',img:image.KoreanTv20},
        {moviename:'机智医生生活 第二季',score:'9.5',img:image.KoreanTv21},
        {moviename:'Move to Heaven:我是遗物整理师',score:'9.1',img:image.KoreanTv22},
        {moviename:'社内相亲',score:'7.9',img:image.KoreanTv23},
        {moviename:'来自星星的你',score:'8.5',img:image.KoreanTv24},]
      },
      { key:'5',moviceList:[
        {moviename:'孤单又灿烂的神:鬼怪',score:'8.9',img:image.KoreanTv25},
        {moviename:'窥探',score:'8.6',img:image.KoreanTv26},
        {moviename:'W_两个世界',score:'8.0',img:image.KoreanTv27},
        {moviename:'那年，我们的夏天',score:'8.7',img:image.KoreanTv28},
        {moviename:'酒鬼都市女人们',score:'9.0',img:image.KoreanTv29},
        {moviename:'信号',score:'9.2',img:image.KoreanTv30},
        {moviename:'我的解放日志',score:'9.1',img:image.KoreanTv31},
        {moviename:'当你沉睡时',score:'8.3',img:image.KoreanTv32},]
      }
      ],
      //纪录片
      documentary:[
      { key:'1',moviceList:[
        {moviename:'河西走廊',score:'9.7',img:image.home25},
        {moviename:'但是还有书籍',score:'9.0',img:image.home26},
        {moviename:'江南菜馆 第三季',score:'8.0',img:image.home27},
        {moviename:'血与性：400年王室风云',score:'6.4',img:image.home28},
        {moviename:'贝克汉姆：拯救我们的球队',score:'8.2',img:image.home29},
        {moviename:'人生第一次',score:'9.0',img:image.home30},
        {moviename:'地球脉动 第二季',score:'9.8',img:image.home31},
        {moviename:'中国通史',score:'9.2',img:image.home32},]
      },
      { key:'2',moviceList:[
        {moviename:'守护解放西',score:'8.6',img:image.documentary1},
        {moviename:'无节制消费的元凶',score:'8.8',img:image.documentary2},
        {moviename:'舌尖上的中国 第一季',score:'9.4',img:image.documentary3},
        {moviename:'人间世',score:'9.7',img:image.documentary4},
        {moviename:'风味人间 第三季',score:'8.7',img:image.documentary5},
        {moviename:'大明宫',score:'9.1',img:image.documentary6},
        {moviename:'第三极',score:'9.4',img:image.documentary7},
        {moviename:'中国',score:'8.3',img:image.documentary8},]
      },
      { key:'3',moviceList:[
        {moviename:'蓝色星球',score:'9.7',img:image.documentary9},
        {moviename:'书简阅中国',score:'9.2',img:image.documentary10},
        {moviename:'积极心理学',score:'9.6',img:image.documentary11},
        {moviename:'宇宙时空之旅',score:'9.7',img:image.documentary12},
        {moviename:'苏东坡',score:'8.7',img:image.documentary13},
        {moviename:'大猫',score:'9.5',img:image.documentary14},
        {moviename:'弗兰·勒博维茨:假装我们在城市',score:'9.0',img:image.documentary15},
        {moviename:'从秦始皇到汉武帝',score:'9.0',img:image.documentary16},]
      },
      { key:'4',moviceList:[
        {moviename:'但是还有书籍 第二季',score:'9.4',img:image.documentary17},
        {moviename:'生门',score:'9.4',img:image.documentary18},
        {moviename:'航拍中国 第一季',score:'9.2',img:image.documentary19,update:'更新至10集'},
        {moviename:'守护解放西2',score:'9.0',img:image.documentary20},
        {moviename:'如果国宝会说话 第一季',score:'9.4',img:image.documentary21},
        {moviename:'为什么贫穷?',score:'9.1',img:image.documentary22},
        {moviename:'行星',score:'9.6',img:image.documentary23},
        {moviename:'约翰·威尔逊的十万个怎么做 第二季',score:'',img:image.documentary24},]
      },
      { key:'5',moviceList:[
        {moviename:'无穷之路',score:'9.5',img:image.documentary25,update:'更新至9集'},
        {moviename:'电影史话 第二季',score:'9.3',img:image.documentary26},
        {moviename:'众神之地',score:'9.2',img:image.documentary27},
        {moviename:'我们的星球 第一季',score:'9.8',img:image.documentary28},
        {moviename:'风味人间 第一季',score:'9.0',img:image.documentary29},
        {moviename:'王朝 第二季',score:'9.3',img:image.documentary30},
        {moviename:'他乡的童年',score:'8.9',img:image.documentary31},
        {moviename:'不止考古·我与三星堆',score:'9.0',img:image.documentary32},]
      }
      ]
    },
  };
});
//热门影评
Mock.mock(getRegExpUrl("/getFilmReview"), "get", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "最受欢迎的影评",
      data: [
        { title: "Hollywood Clichés笔记整理", name:'罗文姬女士',img: image.img32, id: 1, type: "filmReview",works:'《好莱坞俗套大吐槽》'
        ,content:'爱情喜剧： 1.可爱的相遇方式The meet cute为了让观众过瘾，体验爱情发生时刻的化学反应，必须得发生在尴尬的、不寻常的场景下，不能是普通的场景。例如《艺术家》，《雨中曲》，例如《诺丁山》(Notting Hill ，...'},
        { title: "三个版本的《沙丘》，维伦纽瓦赢了", name:'喜儿喂鸭正经地',img: image.img33, id: 2, type: "filmReview",works:'《沙丘》'
        ,content:' 我曾经和朋友开玩笑说，没有《沙丘》的2020，我一秒都不想过了——从去年维伦纽瓦宣布《沙丘》将在2021年上映以来，它就是我对来年院线影片的唯一期待。 同样作为文艺作品，电影和文学、音乐不同，它要宣布定档之...'},
        { title: "《入殓师》是我给自己布置的人生课题", name:'泷田洋二郎',img: image.img34, id: 3, type: "filmReview",works:'《入殓师》'
        ,content:' 豆瓣的影迷们，大家好。我是泷田洋二郎。由我执导的电影《入殓师》在经过4K修复后，终于在大银幕和中国观众见面了。 这部电影凝聚了很多值得尊敬的创作者。久石让先生为这部作品注入了无与伦比的音乐。我也还记得... '},
        { title: "真正的交流需要勇气", name:'导演敬然',img: image.img35, id: 4, type: "filmReview",works:'《我是监护人》'
        ,content:'  我童年的记忆全都是姥姥的身影，是她做饭时围裙上的味道，是她回家时 温暖的拥抱。每天幼儿园放学后，不等 姥姥进门，我就立马催促她换衣服，赶紧下厨，姥姥做的炒饭是我一辈子都吃不厌的食物。姥姥年轻时是名手术... '}
      ], 
    },
  };
});
//今日票房
Mock.mock(getRegExpUrl("/getboxoffice"), "get", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "今日票房",
      data: [
        {key:'1',title:'航海王：红发歌姬',num:73.87,img:image.img36},
        {key:'2',title:'扫黑行动',num:65.94},
        {key:'3',title:'你好，北京',num:41.56},
        {key:'4',title:'万里归途',num:36.60},
        {key:'5',title:'钢铁意志',num:28.87},
      ], 
    },
  };
});
//今日收益
Mock.mock(getRegExpUrl("/getprofit"), "get", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "今日收益",
      data: [
        {key:'1',num:310.7},
        {key:'2',num:957.3},
        {key:'3',num:1301.6},
      ], 
    },
  };
});
//最受期待
Mock.mock(getRegExpUrl("/getmostexpect"), "get", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "最受期待",
      data: [
        {key:'1',title:'阿凡达：水之道',num:967989,updateTime:'2022-12-16',img:image.img37},
        {key:'2',title:'流浪地球2',num:436119,img:image.img38},
        {key:'3',title:'倒数说爱你',num:43387,img:image.img39},
        {key:'4',title:'检查风云',num:254507},
        {key:'5',title:'美人鱼2',num:74024},
        {key:'6',title:'绝望主夫',num:101978},
        {key:'7',title:'深海',num:122294},
        {key:'8',title:'保你平安',num:133411},
        {key:'9',title:'人生路不熟',num:20167},
        {key:'10',title:'消失的她',num:30525},
      ], 
    },
  };
});
//TOP 100
Mock.mock(getRegExpUrl("/getTophundred"), "get", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "TOP 100",
      data: [
        {key:'1',title:'我不是药神',score:9.6,img:image.img40},
        {key:'2',title:'肖申克的救赎',score:9.5},
        {key:'3',title:'海上钢琴师',score:9.3},
        {key:'4',title:'绿皮书',score:9.5},
        {key:'5',title:'霸王别姬',score:9.4},
        {key:'6',title:'美丽人生',score:9.3},
        {key:'7',title:'小偷家族',score:8.1},
        {key:'8',title:'哪吒之魔童降世',score:9.6},
        {key:'9',title:'这个杀手不太冷',score:9.4},
        {key:'10',title:'怦然心动',score:8.9},
      ], 
    },
  };
});
//热门影人
Mock.mock(getRegExpUrl("/getmoviemaker"), "get", () => {
  return {
    status: 0,
    msg: "操作成功",
    data: {
      title: "热门影人",
      data: [
        {key:'1',name:'贾冰',img:image.img41},
        {key:'2',name:'张璐瑶'},
        {key:'3',name:'晋松'},
        {key:'4',name:'吕良伟'},
        {key:'5',name:'张晞临'},
        {key:'6',name:'李宜娟'},
        {key:'7',name:'秦海璐'},
        {key:'8',name:'王劲松'},
        {key:'9',name:'张智霖'},
        {key:'10',name:'曾志伟'},
      ], 
    },
  };
});

//电影