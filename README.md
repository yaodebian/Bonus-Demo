# 抽奖九宫格Demo
vuejs实现抽奖九宫格Demo

目录
----
[写在前面](https://github.com/yaodebian/Bonus-Demo#写在前面)<br>
[开发环境](https://github.com/yaodebian/Bonus-Demo#开发环境)<br>
[思路](https://github.com/yaodebian/Bonus-Demo#思路)<br>
[代码](https://github.com/yaodebian/Bonus-Demo#代码)<br>
[项目运行结果](https://github.com/yaodebian/Bonus-Demo#项目运行结果)<br>
[项目组件化](https://github.com/yaodebian/Bonus-Demo#项目组件化)<br>

写在前面
----
最近做了一下网易游戏的笔试题，最后一道题是叫你设计一个抽奖九宫格动画，当时有思路但是有很大的瑕疵，故而有了这次git。

开发环境
----
* vuejs框架
* ajax用的是axios

思路
----
* 首先必须将UI设计好；
* 声明一个list对象用于存放九宫格中的内容列表，包括奖项、抽奖按钮、谢谢参与等，然后通过v-for将这些项填充到九宫格中；
* 声明一个activeIndex来标记当前被选中的项；
* v-bind绑定class值，通过九宫格每个格子的序号是否与activeIndex相对应来赋予不同的class，即样式，这样，被选中的格子就和其他格子区分开来了；
* 抽奖动画实现原理：基于上面的准备，我们只要更改activeIndex的值，就能切换选中格子，再结合setInterval函数就可以形成流畅的动画效果；
* 为抽奖按钮设置一个click事件，事件回调流程: 九宫格先遍历切换3圈，之后再向后台请求数据获得中将号码（九宫格的序号），然后再根据序号遍历到相应位置后给出提示：中奖了或者很遗憾没有中奖；

代码
----
* 前端：详见项目代码；
* 后台：后台写一个award接口返回一个对象如：{code:0, data: {award: 1}}，其中code为0表示数据返回正常，data中的award表示中将号码，比如0就代表着谢谢参与；

项目运行结果
----
* 抽奖前：<br>
![1](https://raw.githubusercontent.com/yaodebian/git_markdown_images/master/Bonus-Demo/1.PNG)<br>
* 执行抽奖后：<br>
![2](https://raw.githubusercontent.com/yaodebian/git_markdown_images/master/Bonus-Demo/2.PNG)<br>

项目组件化
----
<b>1. 为什么要组件化：</b><br>
  组件化能够实现代码的复用，另外像抽奖九宫格这种组件，其仅仅只有一种样式或者只有一种动画效果，绝对是往往不够用的，这类组件如果能够让开发者自定义的化，就会方便很多，通过根据用户的需求进行不同的配置以实现不同需求。
  
<b>2. 如果需要组件化，组件需要进行哪些配置：</b><br>
![3](https://raw.githubusercontent.com/yaodebian/git_markdown_images/master/Bonus-Demo/3.PNG)<br>

<b>3. 如何实现：</b><br>
  运用vuejs的组件Component机制进行开发，通过添加属性的方式，设置上面2步骤中的各项配置。(主要运用vue实例的props属性参数进行)

<b>4. 组件使用方式：</b><br>
  <b>a.</b> 在src中的components目录下，有一个bonusComponent.vue文件，该文件就是组件化后的组件，我们在要使用的.vue页面中引入它：import bonusComponent from '@/components/bonusComponent';<br>
  
  <b>b.</b> vue实例中添加组件配置：<br>
  components: {
    'bonusComponent': bonusComponent
  }
  
  <b>c.</b> 组件使用：<br>
  ```
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
    :bonusBtnShape="false">
  </bonusComponent>
  ```
  上面的各项属性就是我们需要配置的，来看看该栗子的运行结果吧：<br>
![5](https://raw.githubusercontent.com/yaodebian/git_markdown_images/master/Bonus-Demo/5.PNG)<br>

<b>5. 组件配置文档：</b><br>
  首先来看下vuejs中组件内配的props:<br>
```
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
```

  <b>属性列表：</b>
  * <b>公共属性：</b><br>
  <b>cellList：</b>数组类型（Array），必填项，需要输入九条文本标识9个格子的内容；<br>
  <b>backStageInterface：</b>字符串类型（String），必填项，后台接口调用地址，用于返回中奖信息，格式为{code: 0, data: {award: 1}}，code标识数据是否返回正常，0标识正常，1表示数据返回错误，award则表示中奖的号码(0-8)，分别代表着九宫格除抽奖按钮之外8个格子对应的8个奖项；<br>
  <b>preDuration：</b>数字类型（Number），设置抽奖时奖项遍历前期的动画切换间隔，默认为100，单位为ms；<br>
  <b>behiDuration：</b>数字类型（Number），设置抽奖时奖项遍历后期的动画切换间隔，默认为200，单位为ms；<br>
  <b>boxBorderRadius：</b>字符串类型（String），九宫格盒子的边框圆角，默认为5px；<br>
  <b>cellSize：</b>数字类型（Number），九宫格格子的尺寸，默认为100px；<br>
  <b>cellBg：</b>字符串类型（String），九宫格格子的背景色，默认为白色；<br>
  <b>cellActiveColor：</b>字符串类型（String），九宫格奖项在激活时（被选中）的背景色，默认为灰色；<br>
  <b>bonusBtnBg：</b>字符串类型（String），九宫格抽奖按钮背景色，默认为红色；<br>
  
  * <b>盒子模型属性：</b><br>
  所谓盒子模型就是上面那个栗子运行结果的形式，九宫格被一个大盒子包围，并且可以设置相应的头部和底部文本。<br>
  
    <b>isBox：</b>布尔类型（Boolean），标识是否为盒子模型，它有默认值false，即默认为非盒子模型，仅仅是一个九宫格，没有大盒子包围，盒子模型的其他属性配置将会无效；<br>
    <b>boxPadding：</b>字符串类型（String），盒子模型时包含九宫格的大盒子的内边距，默认值为'100px 100px'；<br>
    <b>boxBg：</b>字符串类型（String），盒子模型时盒子背景颜色，默认为红色；<br>
    <b>head；</b>字符串或者布尔类型（String Boolean），标识盒子模型时的头部文本，默认为false，即没有头部文本；<br>
    <b>foot：</b>字符串或者布尔类型（String Boolean），标识盒子模型时的底部文本，默认为false，即没有底部文本；<br>
    <b>cellRadius：</b>字符串类型（String），标识盒子模型时九宫格格子的圆角，默认为'5px'；<br>
    <b>cellSpace：</b>数值类型（Number），盒子模型时九宫格每项的间隔距离，默认为5；<br>
    <b>bonusBtnShape: </b>布尔类型（Boolean），盒子模型时九宫格抽奖按钮的形状，默认为true，标识方形，false为圆形；<br>
  
  * <b>非盒子模型：</b><br>
  <b>boxBorderWidth：</b>字符串类型（String），非盒子模型时九宫格外框边框宽度，默认为5px；<br>
  <b>boxBorderColor：</b>字符串类型（String），非盒子模型时九宫格外框边框颜色，默认为红色；<br>
  <b>cellBorderWidth：</b>字符串类型（String），非盒子模型时九宫格格子边框宽度，默认为2px；<br>
  <b>cellBorderColor：</b>字符串类型（String），非盒子模型时九宫格格子边框颜色，默认为红色；<br>

<b>6. 盒子模型和非盒子模型：</b><br>
<b>盒子模型：</b><br>
![5](https://raw.githubusercontent.com/yaodebian/git_markdown_images/master/Bonus-Demo/5.PNG)<br>

<b>非盒子模型：</b><br>
![4](https://raw.githubusercontent.com/yaodebian/git_markdown_images/master/Bonus-Demo/4.PNG)<br>

<b>7. 版本说明：</b><br>

<b>v1.0.0: 初步组件化实现抽奖九宫格抽奖功能；</b><br>

  <b>问题：</b><br>
  * 属性太多，设置繁琐；
  * 只能进行简单的配置，比如我想要配图标就无能为力了；
  * 组件默认为fixed，应该设置一个属性标识组件是否fixed；
  
  <b>下次子版本期望：</b><br>
  * 简化属性设置，通过传对象的方式来进行配置，写在组件标签上的属性数，增加代码可读性；
  * 能够配置图标，增强用户体验性；
  * 设置一个属性标识是否fixed，增强灵活配置可控性；

====================

<b>v0.1.0: 未组件化实现抽奖九宫格抽奖功能；</b><br>

  <b>问题：</b><br>
  * 未组件化，代码组织不好；
  
  <b>下次版本期望：</b><br>
  * 组件化项目功能；
