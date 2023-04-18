<template>
  <div class="home-footer">
    <div class="home-footer-content">
      <div class="content">
        <p>
          关于故人欣 : <a href="javascript:;">关于我们</a> <a href="javascript:;">管理团队</a>
          <a href="javascript:;">投资者关系</a> &nbsp;&nbsp; 友情链接 :
          <a href="javascript:;">美团网</a>
        </p>
        <p>
          商务合作邮箱：v@maoyan.com 客服电话：10105335
          违法和不良信息/涉未成年人有害信息举报电话：4006018900
        </p>
        <p>
          用户举报/涉未成年人有害信息举报邮箱：tousujubao@meituan.com
          舞弊线索举报邮箱：wubijubao@maoyan.com
        </p>
        <p>
          <a href="javascript:;">中华人民共和国增值电信业务经营许可证 京B2-20190350</a>
          <a href="javascript:;">营业性演出许可证 京演（机构）（2019）4094号</a>
        </p>
        <p>
          <a href="javascript:;">广播电视节目制作经营许可证 （京）字第08478号</a>
          <a href="javascript:;">网络文化经营许可证 京网文（2022）1334-041号</a>
        </p>
        <p><a href="javascript:;">艺术品经营单位备案证明 京东艺（2022）0095号</a></p>
        <p>
          <a href="javascript:;">猫眼用户服务协议</a> <a href="javascript:;">猫眼平台交易规则总则</a>
          <a href="javascript:;">隐私政策</a>
        </p>
        <p>
          <a href="javascript:;">京公网安备</a> <a href="javascript:;">11010102003232号</a>
          <a href="javascript:;">京ICP备16022489号-1</a>
        </p>
        <p>北京猫眼文化传媒有限公司</p>
        <p>©2022 猫眼电影 www.maoyan.com</p>
        <div class="footer-image-layout">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-footer",
};
</script>

<style lang="scss">
  .home-footer{
      width: 100%;
      background: #000;
      height: 28.5rem;
      .home-footer-content{
        width: 100%;
        padding-top: 3.5rem;
        background-color: #fff;
        position: relative;
        .content{
            width: 60%;
            min-width: 800px;
            position: absolute;
            top: 6.5rem;
            left: 20%;
            text-align: center;
            line-height: 25px;
            color: #e1e1e1;
            p{
                font-size: 14px;
                margin-bottom: 0px;
                &:nth-child(1),
                &:nth-child(8),
                &:nth-child(4),
                &:nth-child(5),
                &:nth-child(6),
                &:nth-child(7){
                    a{
                        // margin-top: 5px;
                        display: inline-block;
                        height: 16px;
                        color: #e1e1e1;
                        text-align: center;
                        line-height: 16px;
                        padding: 0px 8px;
                        &:hover{
                           text-decoration: underline;
                        }
                        &:nth-child(1){
                            // border-right: 1px solid #e1e1e1;
                            padding-right: 8px;
                        }
                        &:nth-child(2){
                            padding:0px 8px;
                            border-left: 1px solid #e1e1e1;
                        }
                        &:nth-child(3){
                            padding-left: 8px;
                            border-left: 1px solid #e1e1e1;
                        }
                    }
                }
                &:first-child{
                    a{
                        color: #ef4638;
                    }
                }
            }
            .footer-image-layout{
                width: 55%;
                height: 40px;
                margin: 20px auto;
                // border: 1px solid red;
                display: flex;
                justify-content: space-evenly;
                .item{
                    height: 40px;
                    &:nth-child(3){
                        width: 100px;
                        background: url(../assets/image/猫眼/Illegal.png);
                    }
                    &:nth-child(1){
                        width: 109px;
                        background: url(../assets/image/猫眼/company.png);
                    }
                    &:nth-child(2){
                        width: 150px;
                        background: url(../assets/image/猫眼/license.png);
                    }
                }
            }
        }
      }
    }
</style>