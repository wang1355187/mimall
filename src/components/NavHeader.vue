<template>
  <div>
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="/#/login" v-if="!username">登录</a>
          <a href="javascript:;" key="logout" @click="logOut" v-else style="color:#b0b0b08f;">注销</a>
          <a href="/#/register" key="register" v-if="!username">注册</a>
          <router-link tag="a" to="/order/list" v-if="username">我的订单</router-link>
          <router-link tag="a" to="/cart" class="mycart">
            <span class="icon-cart"></span>
            购物车
            <span v-if="username">({{cartCount}})</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item of phoneList" :key="item.id">
                  <a target="_blank" :href="'/#/product/'+item.id">
                    <div class="pro-img">
                      <img
                        :src="item.mainImage"
                      />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | capitalize}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children"></div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" placeholder="RedMi 10X 5G" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "nav-footer",
  data(){
    return {
      phoneList:{}
    }
  },
  inject: ['reload'],
  filters:{
    capitalize:function(value){
      if(!value) return 0.00;
      return '￥' + value.toFixed(2);
    }
  },
  computed:{
    ...mapState(['username','cartCount']),
  },
  methods:{
    logOut(){
      this.$store.dispatch('saveUserName','')
      this.axios.post('api/user/logout').then(()=>{
        this.reload();
      })
    }
  },
  mounted:function(){
    this.axios.get('api/products',{
      params:{
        categoryId: '100012'
      }
    }).then(res => {
      if(res.list.length>6){
        this.phoneList = res.list.slice(0,6);
      }
    })
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.nav-topbar {
  height: 39px;
  line-height: 39px;
  background: #333333;
  .container {
    @include flex();
    a {
      display: inline-block;
      margin-right: 17px;
      color: #b0b0b0;
      transition: color .3s;
    }
    a:hover{
      color: #ffffff;
    }
    .mycart {
      width: 110px;
      text-align: center;
      background: #ff6600;
      color: #ffffff;
      margin-right: 0;
      .icon-cart {
        display: inline-block;
        height: 12px;
        width: 16px;
        background: url("/imgs/icon-cart-checked.png") no-repeat;
        background-size: contain;
        margin-right: 4px;
      }
    }
  }
}
.nav-header {
  .container {
    height: 112px;
    position: relative;
    @include flex();
    .header-logo {
      height: 55px;
      width: 55px;
      background-color: #ff6600;
      overflow: hidden;
      &:hover {
        a {
          margin-left: -55px;
        }
      }
      a {
        display: inline-block;
        height: 55px;
        width: 110px;
        transition: all 0.4s ease;
        &:before {
          content: "";
          display: inline-block;
          height: 55px;
          width: 55px;
          background: url("/imgs/mi-logo.png") no-repeat center/cover;
        }
        &:after {
          content: "";
          display: inline-block;
          height: 55px;
          width: 55px;
          background: url("/imgs/mi-home.png") no-repeat center/cover;
        }
      }
    }
    .menu {
      padding-left: 200px;
      .item-menu {
        display: inline-block;
        color: #333333;
        font-weight: bold;
        font-size: 16px;
        line-height: 112px;
        margin-right: 50px;
        cursor: pointer;
        &:hover {
          color: $colorA;
          .children {
            border-top: 1px solid $colorF;
            height: 200px;
            opacity: 1;
          }
        }
        span {
          cursor: pointer;
        }
        .children {
          position: absolute;
          box-sizing: border-box;
          top: 112px;
          left: 0;
          width: 1226px;
          height: 0;
          opacity: 0;
          overflow: hidden;
          box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.5s;
          background-color:#ffffff;
          z-index: 10;
          .product {
            float: left;
            position: relative;
            height: 200px;
            width: 16.6%;
            font-size: 14px;
            line-height: 14px;
            text-align: center;
            &:hover{
              opacity:0.8;
            }
            &:after {
              content: "";
              position: absolute;
              height: 120px;
              width: 1px;
              right: 0;
              top: 30px;
              border-right: 1px solid $colorF;
            }
            &:last-child:after {
              border: none;
            }
            a {
              display: inline-block;
            }
            .pro-img {
              overflow: hidden;
              height: 130px;
              img {
                margin-top: 10px;
                height: 110px;
                width: auto;
              }
            }
            .pro-name {
              font-weight: bold;
              color: $colorB;
              margin-bottom: 16px;
            }
            .pro-price {
              color: $colorA;
              font-size: 16px;
            }
          }
        }
      }
    }
    .header-search {
      width: 319px;
      .wrapper {
        height: 40px;
        border: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        input {
          border: none;
          box-sizing: border-box;
          border-right: 1px solid #e0e0e0;
          width: 264px;
          height: 40px;
          padding-left: 14px;
        }
        a {
          display: inline-block;
          @include bgImg(18px, 18px, "/imgs/icon-search.png");
          margin-left: 17px;
        }
      }
    }
  }
}
</style>