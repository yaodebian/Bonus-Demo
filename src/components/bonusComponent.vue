<template>
  <div id="box" ref="box" :style="boxStyle">
    <div v-if="head" v-text="head" class="bonusHead"></div>
    <div class="bonusCells" :style="bonusCellsStyle">
      <div v-for="(item, index) in list" 
        v-text="item" 
        :class="index === activeIndex ? 'cell selected' : index === 'cell_selectBtn' ? 'cell selectBtn' : 'cell'"
        :style="index === activeIndex ? [cellStyle, activeCellStyle] : index === 'cell_selectBtn' ? [cellStyle, bonusBtnStyle] : cellStyle"
        @click="index === 'cell_selectBtn' ? bonus() : ''">
      </div>
    </div>
    <div v-if="foot" v-text="foot" class="bonusFoot"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      activeIndex: "0_cell",
      boxStyle: {},
      bonusCellsStyle: {},
      cellStyle: {},
      activeCellStyle: {},
      bonusBtnStyle: {}
    };
  },
  props: {
    /**公共属性 */
    //九宫格抽奖项内容列表
    cellList: {
      type: Array,
      validator: function(value) {
        return value.length === 9
      },
      required: true
    },
    //中奖号码获取接口
    backStageInterface: {
      type: String,
      required: true
    },
    //前期选择动画间隔(默认为100ms)
    preDuration: {
      type: Number,
      default: 100
    },
    //后期选择动画间隔(默认为200ms)
    behiDuration: {
      type: Number,
      default: 200
    },
    //九宫格外框圆角(默认为5px)
    boxBorderRadius: String,
    //九宫格尺寸(默认为100px)
    cellSize: Number,
    //九宫格的背景色(默认为白色)
    cellBg: String,
    //九宫格激活状态下的背景色(默认为灰色)
    cellActiveColor: String,
    //九宫格抽奖按钮背景色(默认为红色)
    bonusBtnBg: String,

    /**盒子模型中独有的属性 */
    //是否使用盒子模型
    isBox: {
      type: Boolean,
      default: false
    },
    //盒子模型的padding值
    boxPadding: {
      type: String,
      default: '100px 100px'
    },
    //盒子模型背景颜色
    boxBg: {
      type: String,
      default: "red"
    },
    //盒子模型头部
    head: {
      type: [String, Boolean],
      default: false
    },
    //盒子模型底部
    foot: {
      type: [String, Boolean],
      default: false
    },
    //盒子模型中九宫格的圆角(默认为5px)
    cellRadius: {
      type: String,
      default: '5px'
    },
    //盒子模型时九宫格的间隔
    cellSpace: {
      type: Number,
      default: 5
    },
    //盒子模型时九宫格抽奖按钮形状(默认为方形)
    bonusBtnShape: {
      type: Boolean,
      default: true
    },

    /**正常盒子模型中的属性 */
    //九宫格外框宽度(默认为5px)
    boxBorderWidth: String,
    //九宫格外框颜色(默认为红色)
    boxBorderColor: String,
    //九宫格边框宽度(非盒子模型时)(默认为2px)
    cellBorderWidth: {
      type: String,
      default: "2px"
    },
    //九宫格边框颜色(非盒子模型时)(默认为红色)
    cellBorderColor: {
      type: String,
      default: "red"
    }
  },
  created() {
    let that = this
    that.boxBorderRadius != undefined ? that.boxStyle.borderRadius = that.boxBorderRadius : ''
    if(that.cellSize != undefined) {
      that.cellStyle.width = `${that.cellSize}px`
      that.cellStyle.height = `${that.cellSize}px`
    }
    that.cellBg != undefined ? that.cellStyle.background = that.cellBg : ''
    that.cellActiveColor != undefined ? that.activeCellStyle.background = that.cellActiveColor : ''
    that.bonusBtnBg != undefined ? that.bonusBtnStyle.background = that.bonusBtnBg : ''
    if(that.isBox) {
      that.cellStyle.borderStyle = 'none'
      that.boxStyle.borderStyle = 'none'
      that.boxStyle.padding = that.boxPadding
      that.boxStyle.background = that.boxBg
      that.bonusCellsStyle.width = `${that.cellSize * 3 + that.cellSpace * 2}px`
      that.bonusCellsStyle.height = that.bonusCellsStyle.width
      that.boxStyle.width = "auto"
      that.boxStyle.height = "auto"
      //使box水平居中
      that.$nextTick(function() {
        let boxWidth = this.$refs.box.offsetWidth
        let boxHeight = this.$refs.box.offsetHeight
        Vue.set(that.boxStyle, 'marginLeft', `${-(boxWidth / 2)}px`)
        Vue.set(that.boxStyle, 'marginTop', `${-(boxHeight / 2)}px`)
      })
      that.cellStyle.borderRadius = that.cellRadius
      !that.bonusBtnShape ? that.bonusBtnStyle.borderRadius = '50%' : ''
      return;
    }
    if(that.cellSize != undefined) {
      that.bonusCellsStyle.width = `${that.cellSize * 3}px`
      that.bonusCellsStyle.height = that.bonusCellsStyle.width
      that.boxStyle.width = "auto"
      that.boxStyle.height = "auto"
    }
    //使box水平居中
    that.$nextTick(function() {
      let boxWidth = this.$refs.box.offsetWidth
      let boxHeight = this.$refs.box.offsetHeight
      Vue.set(that.boxStyle, 'marginLeft', `${-(boxWidth / 2)}px`)
      Vue.set(that.boxStyle, 'marginTop', `${-(boxHeight / 2)}px`)
    })
    that.boxBorderWidth != undefined ? that.boxStyle.borderWidth = that.boxBorderWidth : ''
    that.boxBorderColor != undefined ? that.boxStyle.borderColor = that.boxBorderColor : ''
    that.cellStyle.borderWidth = that.cellBorderWidth
    that.cellStyle.borderColor = that.cellBorderColor
  },
  computed: {
    //九宫格9格列表
    list() {
      let that = this
      let arr =  [
        '6_cell',
        '7_cell',
        '0_cell',
        '5_cell',
        'cell_selectBtn',
        '1_cell',
        '4_cell',
        '3_cell',
        '2_cell'
      ]
      let itemlist = {}
      for(let i in that.cellList) {
        itemlist[arr[i]] = that.cellList[i]
      }
      return itemlist
    }
  },
  methods: {
    bonus() {
      let that = this;
      //先让九宫格转3圈，3圈之后获取中将代码，并根据中将号进行动画操作
      let promise = new Promise(function(resolve, reject) {
        let index = parseInt(that.activeIndex)
        let n = 0
        let preDuration = that.preDuration
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
        }, preDuration)
      });

      //3圈过后，九宫格遍历到后台中将号指定的位置
      function goTarget(index) {
        if (0 === index) {
          if ("0_cell" === that.activeIndex) {
            alert("很遗憾未能中奖！！！")
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
          let behiDuration = that.behiDuration
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
                if ("0_cell" === that.activeIndex) {
                  alert("很遗憾未能中奖！！！")
                } else {
                  alert(`恭喜你获得${that.list[that.activeIndex]}`)
                }
                window.clearInterval(bhiAction)
              }
            })
          }, behiDuration)
        }
      }

      //请求中将号
      promise.then(function() {
        that.axios
          .get(that.backStageInterface)
          .then(function(res) {
            if (0 === res.data.code) {
              goTarget(res.data.data.award);
            }
          })
          .catch(function(err) {
            console.log(err);
          })
      })
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
  border-style: solid;
  border-radius: 5px;
}
.bonusHead {
  text-align: center;
  color: #fff;
  font-size: 30px;
  height: 50px;
  line-height: 50px;
}
.bonusFoot {
  text-align: center;
  color: #fff;
  font-size: 20px;
  height: 40px;
  line-height: 40px;
}
.bonusCells {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}
.cell {
  width: 100px;
  height: 100px;
  background: #fff;
  box-sizing: border-box;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
