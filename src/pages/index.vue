<template>
  <div>
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrapper">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children" v-if="goodsList">
                <ul v-for="(list,index) of goodsList.phone" :key="index" class="goods-wrapper">
                  <li v-for="item of list" :key="item.id" class="goods-item">
                    <img
                      :src="item.imgUrl"
                    />
                    <span>{{item.name}}</span>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="item of slideList" :key="item.id">
            <a :href="'/#/product/' + item.id">
              <img :src="item.img" />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" :key="i">
              <animation-float v-for="(item,j) in arr" :key="j">
                <div class="item">
                  <span :class="{'new-pro':j%2==0}">新品</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt="">
                  </div>
                  <div class="item-info">
                    <h3>{{item.name}}</h3>
                    <p>{{item.subtitle}}</p>
                    <p class="price" @click="addCart(item.id,item.name)">{{item.price}}元</p>
                  </div>
                </div>
              </animation-float>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      title="添加订单"
      btnType="3"
      :showModal="showModal"
      @cancel="cancel"
      @submit="goToCart"
    >
      <template v-slot:body>
        <p>是否添加<span class="modal-proName">{{productName}}</span>至购物车？</p>
      </template>
    </modal>
    <service-bar></service-bar>
  </div>
</template>
<script>
import ServiceBar from "../components/ServiceBar";
import AnimationFloat from "../components/AnimationFloat";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import localAxios from '../api/localAxios';
import Modal from '../components/Modal.vue';
import "swiper/css/swiper.css";
export default {
  name: "index",
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide,
    AnimationFloat,
    Modal
  },
  methods:{
    addCart(id,name){
      this.showModal=true;
      this.productId=id;
      this.productName=name;
    },
    cancel(){
      this.showModal=false;
      this.productId='';
    },
    goToCart(){
      this.axios.post('api/carts',{
        productId:this.productId,
        selected: true
      }).then((res)=>{
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
        this.$message.success('添加成功');
        this.showModal=false;
      }).catch(()=>{
        this.$message.warning('请先登录');
        this.showModal=false;
      });
    }
  },
  mounted:function () {
    localAxios.get('goods.json').then((res)=>{
      this.goodsList = res.data;
    })
    this.axios.get('api/products',{
      params:{
        categoryId:100012,
        pageSize:14
      }
    }).then((res)=>{
      res.list = res.list.slice(6,14);
      this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
    })
  },
  data() {
    return {
      goodsList: null, //二级菜单列表数据，从本地json中获取
      showModal:false,
      productId:'',
      productName:'',
      swiperOption: {
        speed: 400,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
        effect: "cube",
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      slideList: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg",
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg",
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg",
        },
        {
          id: "47",
          img: "/imgs/slider/slide-4.jpg",
        },
      ],
      adsList:[
        {
          id:33,
          img:'/imgs/ads/ads-1.png'
        },{
          id:48,
          img:'/imgs/ads/ads-2.jpg'
        },{
          id:45,
          img:'/imgs/ads/ads-3.png'
        },{
          id:47,
          img:'/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList:[]
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/base.scss";
.swiper-box {
  position: relative;
  .nav-menu {
    position: absolute;
    z-index: 9;
    box-sizing: border-box;
    padding: 26px 0;
    height: 460px;
    width: 264px;
    background-color: #55585a7a;
    .menu-item {
      height: 51px;
      line-height: 51px;
      padding-left: 30px;
      box-sizing: border-box;
      transition: all 0.2s;
      a {
        display: block;
        position: relative;
        color: #ffffff;
        font-size: 16px;
        &:after {
          position: absolute;
          right: 30px;
          top: 17.5px;
          content: " ";
          @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
        }
      }
      .children {
        position: absolute;
        visibility:hidden;
        height: 460px;
        top: 0;
        left: 264px;
        background: #ffffff;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
        display:flex;
        .goods-wrapper {
          width: 240.5px;
          .goods-item {
            display: flex;
            align-items: center;
            height: 75px;
            line-height: 75px;
            img{
              height:40px;
              width:40px;
              margin-left:30px;
            }
            &:hover{
              color:$colorA;
              cursor:pointer;
              img{
                opacity:0.8;
              }
            }
          }
        }
      }
      &:hover {
        background-color: $colorA;
        .children{
          visibility:visible;
        }
      }
    }
  }
  .swiper-container {
    height: 460px;
    width: 1226px;
    .swiper-button-prev {
      left: 270px;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
}
.ads-box{
  @include flex();
  margin-top:14px;
  margin-bottom:31px;
  a{
    width:296px;
    height:167px;
  }
}
.banner{
  a{
    display:block;
    img{
      height:100%;
      width:100%;
    }
  }
  margin-bottom:50px;
}
.product-box{
  background-color:$colorJ;
  padding:30px 0 50px;
  h2{
    font-size:$fontF;
    height:21px;
    line-height:21px;
    color:$colorB;
    margin-bottom:20px;
  }
  .wrapper{
    display:flex;
    .banner-left{
      margin-right:16px;
      img{
        width:224px;
        height:619px;
      }
    }
    .list-box{
      .list{
        @include flex();
        width:986px;
        margin-bottom:14px;
        &:last-child{
          margin-bottom:0;
        }
        .item{
          width:236px;
          height:302px;
          background-color:$colorG;
          text-align:center;
          span{
            display:inline-block;
            width:67px;
            height:24px;
            font-size:14px;
            line-height:24px;
            color:$colorG;
            &.new-pro{
              background-color:#7ECF68;
            }
            &.kill-pro{
              background-color:#E82626;
            }
          }
          .item-img{
            img{
              width:100%;
              height:195px;
            }
          }
          .item-info{
            user-select:none;
            h3{
              font-size:$fontJ;
              color:$colorB;
              line-height:$fontJ;
              font-weight:bold;
            }
            p{
              color:$colorD;
              line-height:13px;
              margin:6px auto 13px;
            }
            .price{
              color:#F20A0A;
              font-size:$fontJ;
              font-weight:bold;
              cursor:pointer;
              &:after{
                @include bgImg(16px,16px,'/imgs/icon-cart-hover.png');
                content:' ';
                margin-left:5px;
                vertical-align: middle;
              }
            }
          }
        }
      }
    }
  }
}
.modal-proName{
  color:#E82626;
  font-weight:600;
  margin:0 5px;
}
</style>