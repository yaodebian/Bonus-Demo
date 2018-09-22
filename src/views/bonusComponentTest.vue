<!--正常盒子模型-->
<!--
<template>
  <bonusComponent 
    :cellList="list"
    backStageInterface="http://localhost:8081/award"
    :preDuration="100"
    :behiDuration="200"

    boxBorderRadius="10px"
    :cellSize="150"
    cellBg="yellow"
    cellActiveColor="red"
    bonusBtnBg="#00c6ff"

    boxBorderWidth="10px"
    boxBorderColor="#ff00ff"
    cellBorderWidth="5px"
    cellBorderColor="#00c6ff"
    >
  </bonusComponent>
</template>
-->
<!--盒子模型-->

<template>
  <bonusComponent 
    :cellList="list"
    backStageInterface="http://localhost:8081/award"
    :preDuration="100"
    :behiDuration="200"

    boxBorderRadius="10px"
    :cellSize="150"
    cellBg="yellow"
    cellActiveColor="#ffbbbb"
    bonusBtnBg="#00c6ff"

    :isBox="true"
    boxPadding="50px 100px"
    boxBg="#c80101"
    head="幸运大抽奖"
    foot="感谢您的参与"
    cellRadius="10px"
    :cellSpace="10"
    :bonusBtnShape="false"
    >
  </bonusComponent>
</template>

<script>
import bonusComponent from '@/components/bonusComponent'
export default {
  data() {
    return {
      list: [
        '苹果mac一台',
        '苹果ipad一台',
        '谢谢参与',
        '淘宝10元购物券',
        '立即抽奖',
        '100元充值卡一张',
        '格力空调一台',
        '洗衣机一台',
        '油烟机一台'
      ]
    }
  },
  components: {
    'bonusComponent': bonusComponent
  }
}
</script>
<style>

</style>
