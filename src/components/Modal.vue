<template>
  <transition>
    <div class="modal" v-if="showModal">
      <div class="mask"></div>
      <div class="modal-container">
        <div class="modal-header">
          <span>{{title}}</span>
          <span @click="$emit('cancel')" class="icon-close"></span>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
          <div class="btn-group" v-if="btnType==3">
            <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "modal",
  props:{
    // 弹框类型：小small、中middle、大large、表单form
    modalType:{
      type:String,
      default:'form'
    },
    // 弹框标题
    title:String,
    // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
    btnType:String,
    sureText:{
      type:String,
      default:'确定'
    },
    cancelText:{
      type:String,
      default:'取消'
    },
    showModal:Boolean
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
@import '../assets/scss/button.scss';
.modal{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:10;
  &.v-enter-active{
    transition:all .5s;
  }
  &.v-enter{
    transform:translate(0,-100%);
    opacity:0;
  }
  &.v-enter-to{
    transform:translate(0,0);
    opacity:1;
  }
  .mask{
    height:100%;
    width:100%;
    background-color:rgba(0,0,0,0.5);
  } 
  .modal-container{
    position:absolute;
    width:640px;
    left:50%;
    top:40%;
    transform:translate(-50%,-50%);
    background:#ffffff;
    .modal-header{
      position:relative;
      height:60px;
      line-height:60px;
      font-size:16px;
      box-sizing:border-box;
      padding-left:25px;
      .icon-close{
        position:absolute;
        right:20px;
        top:22px;
        display:inline-block;
        @include bgImg(14px,14px,'/imgs/icon-close.png');
        cursor:pointer;
      }
    }
    .modal-body{
      padding:42px 40px 54px;
      font-size:14px;
    }
    .modal-footer{
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: #F5F5F5;
    }
  }
}
</style>