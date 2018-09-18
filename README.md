# 抽奖九宫格Demo
vuejs实现抽奖九宫格Demo

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
详见项目代码

项目运行结果
----
* 抽奖前：<br>
![1](https://raw.githubusercontent.com/yaodebian/git_markdown_images/master/Bonus-Demo/1.PNG)<br>
* 执行抽奖后：<br>
![2](https://raw.githubusercontent.com/yaodebian/git_markdown_images/master/Bonus-Demo/2.PNG)<br>
