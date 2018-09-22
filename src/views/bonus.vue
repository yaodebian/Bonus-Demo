<template>
  <div id="box">
    <div v-for="(item, index) in list" 
      v-text="item" 
      :class="index === activeIndex ? 'cell selected' : index === 'cell_selectBtn' ? 'cell selectBtn' : 'cell'"
      @click="index === 'cell_selectBtn' ? bonus() : ''">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: {
        '6_cell': '苹果mac一台',
        '7_cell': '苹果ipad一台',
        '0_cell': '谢谢参与',
        '5_cell': '淘宝10元购物券',
        'cell_selectBtn': '立即抽奖',
        '1_cell': '100元充值卡一张',
        '4_cell': '格力空调一台',
        '3_cell': '洗衣机一台',
        '2_cell': '油烟机一台'
      },
      activeIndex: '0_cell'
    }
  },
  methods: {
    bonus() {
      let that = this;
      //先让九宫格转3圈，3圈之后获取中将代码，并根据中将号进行动画操作
      let promise = new Promise(function(resolve, reject) {
        let index = parseInt(that.activeIndex)
        let n = 0
        let preAction = window.setInterval(function() {
          let t = parseInt(that.activeIndex)
          t++
          let temp = t % 8
          that.activeIndex = `${temp}_cell`
          if (temp === index) {
            n++
            if (3 === n) {
              window.clearInterval(preAction)
              resolve()
            }
          }
        }, 200)
      })

      //3圈过后，九宫格遍历到后台中将号指定的位置
      function goTarget(index) {
        if (0 === index) {
          if ('0_cell' === that.activeIndex) {
            alert('很遗憾未能中奖！！！')
            return
          }
          action()
        } else {
          if (`${index}_cell` === that.activeIndex) {
            alert(`恭喜你获得${that.list[that.activeIndex]}`)
            return
          }
          action()
        }

        //当当前位置并非中将号位置，则继续动画遍历
        function action() {
          let bhiAction = window.setInterval(function() {
            let t = parseInt(that.activeIndex)
            t++
            let temp = t % 8
            new Promise(function(resolve, reject) {
              that.activeIndex = `${temp}_cell`
              setTimeout(function() {
                resolve()
              }, 50)
            }).then(function() {
              if (`${index}_cell` === that.activeIndex) {
                if ('0_cell' === that.activeIndex) {
                  alert('很遗憾未能中奖！！！')
                } else {
                  alert(`恭喜你获得${that.list[that.activeIndex]}`);
                }
                window.clearInterval(bhiAction)
              }
            });
          }, 200);
        }
      }

      //请求中将号
      promise.then(function() {
        that.axios
          .get('http://localhost:8081/award')
          .then(function(res) {
            if (0 === res.data.code) {
              goTarget(res.data.data.award)
            }
          })
          .catch(function(err) {
            console.log(err)
          });
      });
    }
  }
};
</script>
<style>
#box {
  position: fixed;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  margin-left: -152px;
  margin-top: -152px;
  background: yellow;
  border: 4px solid red;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
}
.cell {
  width: 100px;
  height: 100px;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid red;
  line-height: 100px;
  align-items: center;
}
.selected {
  background: #ccc;
}
.selectBtn {
  background: red;
  color: #fff;
  cursor: pointer;
}
</style>
