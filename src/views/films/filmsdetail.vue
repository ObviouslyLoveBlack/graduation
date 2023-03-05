<template>
  <div>
    <div v-if="loading">
      <div class="maker-container" v-if="targetObj">
      <div class="maker-header">
        <div class="image">
          <img :src="targetObj.img" alt="" />
        </div>
        <div class="maker-info" >
          <p class="info-name">{{targetObj.moviename}}</p>
          <p class="info-name1">Where the Wind Blows</p>
          <br>
          <p>犯罪 剧情 动作</p>
          <p>中国大陆 | 中国香港 /143分钟</p>
          <p>2023-02-05 中国大陆上映</p>
          <div class="expect-symbol">
            <div class="want" :class="attention ? 'active' :''" @click="getexpect">
                <a-icon type="heart" />
                想看
            </div>
            <div class="want" @click="getToScore">
               <a-icon type="star" />
                评分
            </div>
          </div>
        </div>
        <div class="films-info">
          <p>想看数</p>
          <span class="fans">23542</span>
          <p>累计票房</p>
          <span class="box-office">231</span> 亿
        </div>
      </div>
      </div>
      <div class="main" v-if="targetObj">
      <div class="main-left">
        <p class="nav-title">故之电影 > 电影 >{{targetObj.moviename}}</p>
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="介绍">
                <introduce :introduceInfo='targetObj.introduceInfo' :id='targetObj.key'/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="奖项" force-render :disabled="targetObj.awards.length<=0">
                <awards :awards='targetObj.awards'/>
            </a-tab-pane>
            <a-tab-pane key="3" tab="图集">
                <atlas :atlasUrl='targetObj.atlasUrl'/>
            </a-tab-pane>
          </a-tabs>
      </div>
      <div class="main-right">
        <div class="relevantFlims">
            <h2>相关电影</h2>
            <div class="relevantFlims-box">
                <div class="relevantFlims-item">
                    <img src="@/assets/image/films/即将上映/6.jpg" alt="">
                    <p>绝望主夫</p>
                    <p class="score">暂无</p>
                </div>
                <div class="relevantFlims-item">
                    <img src="@/assets/image/films/即将上映/7.jpg" alt="">
                    <p>龙马精神</p>
                    <p class="score">暂无</p>
                </div>
                <div class="relevantFlims-item">
                    <img src="@/assets/image/films/即将上映/9.jpg" alt="">
                    <p>前任四:英年早婚</p>
                    <p class="score">暂无</p>
                </div>
                 <div class="relevantFlims-item">
                    <img src="@/assets/image/films/即将上映/17.jpg" alt="">
                    <p>中国乒乓</p>
                    <p class="score">暂无</p>
                </div>
                <div class="relevantFlims-item">
                    <img src="@/assets/image/films/即将上映/19.jpg" alt="">
                    <p>热爱</p>
                    <p class="score">暂无</p>
                </div>
            </div>
        </div>
      </div>
      </div>
      <div class="maker-empot" v-else>
      <span>抱歉，没有找到相关结果，请尝试用其他条件筛选。...</span>
      </div>
    </div>
    <p class="maker-empot" v-else>
       <a-spin tip="数据加载中..."/>
    </p>
  </div>
</template>

<script>
import introduce from './films-detail-tab/introduce.vue'
import awards from './films-detail-tab/awards.vue'
import atlas from './films-detail-tab/atlas.vue'
import {mapState} from 'vuex'
export default {
  name: "movie-detail",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    introduce,
    // eslint-disable-next-line vue/no-unused-components
    atlas,
    // eslint-disable-next-line vue/no-unused-components
    awards,
  },
  data() {
    return {
      targetObj: null,
      loading:false,
      attention:false, //判断是否想看
      atlasUrl:[],
      // awards:{title:'第16届亚洲电影大奖',content:'提名:最佳男主角/最佳男配角'}
    };
  },
  created() {
    const { target,name } = this.$route.query;
    if(name){
      this.getTarget(JSON.parse(decodeURIComponent(name)))
    }
    if(target){
      this.targetObj = JSON.parse(decodeURIComponent(target));
    }
    document.title = '电影--' + JSON.parse(decodeURIComponent(name))
  },
  computed:{
    ...mapState('user',['token','userInfo']),
  },
  methods:{
    getexpect(){
      console.log(this.token);
      console.log(this.userInfo);
      if(!this.token) return
      this.attention = !this.attention
      // this.targetObj.want = this.attention ? '23543' : '23541'
    },
    async getTarget(name){
      const {data:res} = await this.$req.getAllfilms()
      const {data:res2} = await this.$req.getReleaseFilms()
      this.targetObj = [...res,...res2].find(v=>v.moviename === name)
      this.loading = true
    },
    getToScore(){
      console.log(this.targetObj);
    }
  }
};
</script>

<style lang="scss" scoped>
p{
    margin-bottom: 0px;
}
.maker-container {
  width: 100%;
  border-top: 1px solid transparent;
  background-image: url(@/assets/image/maker.jpg);
  background-repeat: no-repeat;
  background-size: 100% 95%;
  .maker-header {
    width: 80%;
    min-width: 1200px;
    height: 330px;
    margin: 0 auto;
    margin-top: 70px;
    display: flex;
    position: relative;
    .image {
      border: 1px solid #eaeaea;
      img {
        width: 240px;
        height: 330px;
      }
    }
    .maker-info {
      margin-left: 20px;
      position: relative;
      p {
        color: white;
        font-size: 16px;
        margin-bottom: 5px;
        // border: 1px solid red;
      }
      .info-name {
        margin-top: -8px;
        font-size: 25px;
        font-weight: 500;
      }
      .info-name1 {
        margin-top: -8px;
        font-size: 18px;
        font-weight: 500;
      }
      .expect-symbol{
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        .want{
            background: #756189;
            color: #fff;
            padding: 7px 28px;
            cursor: pointer;
            user-select: none;
        }
      }
    }
    .films-info {
      color: white;
      position: absolute;
      bottom: 100px;
      left: 710px;
      p {
        margin-bottom: 0px;
        font-size: 13px;
        &:nth-of-type(2) {
          margin-top: 10px;
        }
      }
      .fans {
        font-size: 28px;
        color: #ffc600;
      }
      .box-office {
        font-size: 25px;
        font-weight: 400;
      }
    }
  }
}
.main{
  width: 80%;
  min-width: 1200px;
  height: 100%;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  .main-left{
    width: 58%;
    min-width: 662px;
    // height: 1000px;
    // border: 1px solid red;
    .nav-title {
      color: #000;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  .main-right{
    width: 37%;
    height: 470px;
    .relevantFlims-box{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .relevantFlims-item{
            text-align: center;
            margin:0px 30px 20px 0px;
            img{
                width: 106px;
                height: 145px;
            }
            p{
                width: 106px;
                margin-top: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:last-child{
                    color: #ffc600;
                }
            }
        }
    }
  }
}
.maker-empot{
  width: 50%;
  min-width: 1000px;
  height: 90px;
  margin: 50px auto;
}
h2 {
  color: #333;
  display: inline-block;
  font-size: 18px;
  line-height: 18px;
  &::before {
    float: left;
    content: "";
    // display: inline-block;
    width: 3px;
    height: 18px;
    background: #ef4238;
    margin-right: 6px;
  }
}
.active{
  background: #ef4238 !important;
}
::v-deep .ant-tabs-nav .ant-tabs-tab-active{
  color: #ef4238;
}
::v-deep .ant-tabs-nav .ant-tabs-tab:hover{
  color: #ef4238;
}
::v-deep .ant-tabs-ink-bar{
  background: #ef4238;
}
::v-deep .ant-spin::selection {
  background: #ef4238;
}
</style>