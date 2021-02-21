<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      isRouterAlive:true  //控制router-view刷新页面
    }
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  mounted(){
    if(this.$cookie.get('userId')){
      this.getUser();
      this.getCartCount();
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(()=>{
        this.isRouterAlive=true;
      })
    },
    getUser(){
      this.axios.get('api/user').then((res={})=>{
        this.$store.dispatch('saveUserName',res.username);
      }).catch((err)=>{
        console.log(err);
      })
    },
    getCartCount(){
      this.axios.get('api/carts/products/sum').then((res=0)=>{
        this.$store.dispatch('saveCartCount',res);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style>
@import './assets/scss/base.scss';
@import './assets/scss/reset.scss';
</style>
