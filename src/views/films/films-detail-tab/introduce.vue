<template>
  <div>
    <div class="synopsis">
      <h2>剧情简介</h2>
      <p>{{introduceInfo.synopsis}}</p>
    </div>
    <div class="cast-member">
      <h2>演职人员</h2>
      <div class="cast-member-box">
        <div @click="makerDetail(action)" class="cast-member-item" v-for="(action,index) in introduceInfo.castmember" :key="index">
          <img :src="action.img" alt="" />
          <p>{{action.name}}</p>
          <p>{{action.act ? '饰'+`${action.act}` : '导演'}}</p>
        </div>
      </div>
    </div>
    <div class="short-comments">
      <h2>热门短评</h2>
      <div class="write-comments" @click="goToShortC">写短评</div>
      <div class="short-comments-box">
        <div class="short-comments-item" v-for="(action,index) in introduceInfo.shortcomments" :key="index">
          <img :src="action.img" alt="">
          <div class="short-comments-info">
              <p>{{action.author}}</p>
              <a-tooltip slot="datetime" :title="action.datetime">
                <span class="datetime">{{ moment(action.datetime).fromNow() }}</span>
                <a-rate :default-value="action.score" allow-half disabled style="font-size:14px;margin-left:5px"/>
              </a-tooltip>
              <p>{{action.content}}</p>
          </div>
          <div class="changlike" :class="action.author === name ? 'active':''" @click="getToLike(action)">
            <a-icon type="like" style="font-size:16px"/>
            <span>{{action.like}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="materials">
      <h2>影片资料</h2>
      <div class="materials-box">
        <div class="materials-item">
          <img src="@/assets/image/1.jpg" alt="">
          <div class="materials-info">
            <p>出品发行</p>
            <p>{{introduceInfo.materials.product}}</p>
          </div>
        </div>
         <div class="materials-item">
          <img src="@/assets/image/2.jpg" alt="">
          <div class="materials-info">
            <p>技术参数</p>
            <p>{{introduceInfo.materials.technique}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="honorary">
      <h2>荣誉奖项</h2>
      <div class="honorary-box">
         <div class="honorary-nomination">
          <p>{{introduceInfo.honorary.award}}次</p>
          <span>获奖</span>
         </div>
         <div class="honorary-awards">
          <p>{{introduceInfo.honorary.nomination}}次</p>
          <span>提名</span>
         </div>
         <div class="honorary-detail">
           <p>{{introduceInfo.honorary.name}}</p>
          <span>{{introduceInfo.honorary.content}}</span>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {mapState} from 'vuex'
export default {
  name: "introduce-1",
  data() {
    return {
      moment,
      time:'2022-01-11 09:39:36',
      addLoading:false,
      name:null
    };
  },
  props:['introduceInfo','id'],
  computed:{
   ...mapState('user',['token'])
  },
  methods: {
   makerDetail(action){
     this.$router.push({
        path:'/movie/maker',
        query:{
          name:encodeURIComponent(JSON.stringify(action.name))
        }
      })
   },
   goToShortC(){
    this.$router.push({
      path: this.token ? '/films-detail' : '/login',
      query:{
        id:this.id
      }
    })
   },
   getToLike(action){
    if(!this.token) return this.$message.info('请先登录...')
    const obj = this.introduceInfo.shortcomments.find(item=>item.author == action.author)
    const num =  !this.addLoading ? 1 : -1
    this.name = !this.addLoading ? action.author : ''
    obj.like += num
    this.addLoading = !this.addLoading
   }
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0px;
}
.synopsis {
  margin: 10px 0px 60px 0px;
  p {
    margin-top: 10px;
    font-size: 15px;
    color: #333;
    line-height: 25px;
  }
}
.cast-member {
  margin-bottom: 70px;
  .cast-member-box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .cast-member-item {
      text-align: center;
      img {
        width: 128px;
        height: 170px;
      }
      p {
        margin-top: 10px;
        color: #000;
        &:last-child {
          color: #333;
          margin-top: 0px;
        }
      }
    }
  }
}
.short-comments{
  position: relative;
  margin-bottom: 50px;
  .short-comments-box{
    margin-top: 25px;
    .short-comments-item{
      display: flex;
      padding:20px 0px 30px 0px;
      border-bottom: 1px solid #eaeaea;
      position: relative;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .short-comments-info{
        margin-left: 20px;
        p{
          color: #333;
          &:first-child{
            color: #000;
          }
          &:last-child{
            margin-top: 20px;
          }
        }
        .datetime{
          cursor: pointer;
        }
      }
      .changlike{
        position: absolute;
        top: 20px;
        right: 0px;
        cursor: pointer;
        user-select: none;
        span{
          margin-left: 10px;
        }
      }
    }
  }
  .write-comments{
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 4px 10px;
    border: 1px solid #ef4238;
    border-radius: 10px;
    color: #ef4238;
    cursor: pointer;
  }
}
.materials{
  margin-bottom: 50px;
  .materials-box{
    margin-top: 20px;
    border: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    .materials-item{
      display: flex;
      width: 50%;
      padding: 20px 50px;
      border-right: 1px solid #eaeaea;
      position: relative;
      &:last-child{
        border-right: none;
      }
      img{
        width: 14px;
        height: 14px;
        position: absolute;
        top: 24px;
        left: 40px;
      }
      .materials-info{
        margin-left: 15px;
      }
    }
  }
}
.honorary{
  .honorary-box{
    margin-top: 20px;
    width: 100%;
    padding: 20px 0px;
    background: #f8f8f8;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .honorary-nomination{
      p{
        font-size: 25px;
        color: #ef4238;
      }
      span{
        font-size: 20px;
      }
    }
    .honorary-awards{
      p{
        font-size: 25px;
        color: #faaf00;
      }
      span{
        font-size: 20px;
      }
    }
     .honorary-detail{
      p{
        font-size: 27px;
        color: #000;
      }
      span{
        font-size: 20px;
      }
    }
  }
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
  color: #ef4238;
}
</style>