<template>
  <div class="register">
    <div class="wrapper">
      <div class="col">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
      </div>
      <div class="col">
        <div class="title">
          <p>注册小米账号</p>
        </div>
      </div>
      <div class="form">
        <div class="regbox">
          <div class="input">
            <span>邮箱</span>
            <input type="text" name="email" v-model="email">
          </div>
          <div class="input" >
            <span>账号</span>
            <input type="text" name="username" v-model="username">
          </div>
          <div class="input">
            <span>密码</span>
            <input type="password" name="password" v-model="password">
          </div>
          <button class="btn btn-huge" @click="register">立即注册</button>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from '../components/NavFooter.vue'
export default {
  components: { NavFooter },
  name:'register',
  data(){
    return{
      email:'',
      username:'',
      password:''
    }
  },
  methods:{
    register(){
      let {email,username,password} = this;
      if(email==''){
        this.$message.warning('邮箱不能为空！');
        return;
      }
      if(username==''){
        this.$message.warning('账号不能为空！');
        return;
      }
      if(password==''){
        this.$message.warning('密码不能为空！');
        return;
      }
      this.axios.post('api/user/register',{
        username,
        password,
        email
      }).then(()=>{
        this.$message.success('注册成功');
        this.$router.push('/login');
      }).catch((err)=>{
        this.$message(err);
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/button.scss';
.register{
  background:#f9f9f9;
  overflow: hidden;
  .wrapper{
    position:relative;
    margin:50px auto;
    height:550px;
    width:854px;
    box-sizing:border-box;
    padding:30px;
    background:#ffffff;
    .col{
      display:flex;
      justify-content:center;
      margin-bottom:10px;
    }
    .title{
      font-size: 30px;
      font-weight: normal;
      color:#666;
    }
    .form{
      height:350px;
      display:flex;
      justify-content: center;
      align-items: center;
      .regbox{
        height:300px;
        width:350px;
        .input{
          position:relative;
          width:350px;
          height:42px;
          box-sizing:border-box;
          line-height:42px;
          margin-bottom:20px;
          padding-left:40px;
          font-size:18px;
          font-weight:500;
          span{
            position:absolute;
            display:block;
            height:42px;
            left:0;
          }
          input{
            width:310px;
            height:42px;
            font-size:15px;
            box-sizing:border-box;
            padding-left:10px;
          }
        }
        .btn-huge{
          width:200px;
          height:42px;
          line-height:42px;
          margin-left:75px;
        }
      }
    }
  }
}
</style>