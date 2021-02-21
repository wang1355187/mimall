<template>
  <div class="box">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'AnimationFloat'
}
</script>
<style lang="scss" scoped>
.box{
  transition:all .2s linear;
  &:hover{
    box-shadow: rgba(169, 169, 169, 0.6) 0px 0px 20px 5px;
    transform: translate(0,-2px);    
  }
}
</style>