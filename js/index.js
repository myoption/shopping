//需要再页面加载之后执行js
window.addEventListener("load", function () {
  //1.获取元素对象
  var ul = document.querySelector(".biglogo ul");
  var ol = document.querySelector(".biglogo ol");
  var banner = document.querySelector(".biglogo");
  var arrowLeft = document.querySelector(".biglogo .arrow-l");
  var arrowRight = document.querySelector(".biglogo .arrow-r");
  var bannerWidth = banner.offsetWidth;
  //当鼠标进入时显示 左右箭头 离开隐藏
  //自动播放
  var timer = setInterval(function () {
    //手动调用点击事件
    arrowRight.click();
  }, 2000);
  banner.addEventListener("mouseover", function () {
    arrowLeft.style.display = "block";
    arrowRight.style.display = "block";
    clearInterval(timer);
    timer = null;
  });
  banner.addEventListener("mouseout", function () {
    arrowLeft.style.display = "none";
    arrowRight.style.display = "none";
    timer = setInterval(function () {
      //手动调用点击事件
      arrowRight.click();
    }, 2000);
  });
  //根据图片的数量生成小圆点的数量
  //   console.log(ul.children.length);
  for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    ol.appendChild(li);
    //排他思想 点击时设置当前小圆圈变色
    ol.children[i].addEventListener("click", function () {
      //获取小圆圈的索引
      var index = this.getAttribute("data-index");
      //获取图片的宽度
      var width = ul.children[index].offsetWidth;
      //   console.log(index);
      //清除小圆圈背景色
      for (var j = 0; j < ul.children.length; j++) {
        ol.children[j].className = "";
      }
      //   console.log(width);
      //调用动画 执行切换动画
      animate(ul, -width * index);
      //设置当前点击小圆圈为背景色
      this.className = "current";
    });
  }
  //当前第一个默认选中
  ol.children[0].className = "current";

  //2.点击移动图片 注意 移动的是ul 不是li
  //设置变量 点一次自增一次
  var num = 1;
  //设置节流阀 控制电机速度 flag
  var flag = true;
  arrowRight.addEventListener("click", function () {
    //方法1
    /*     if (num < ul.children.length) {
      ul.style.left = -721 * num + "px";
      num++;
    } else {
      //重置ul位置 初始化num 即可循环播放
      ul.style.left = 0;
      num = 1;
    } */
    //方法2 animate 动画 此方法需要复制一张克隆图在最后cloneNode 即开头和结尾的图片相同
    //最后一张图不做动画 快速跳转
    if (flag) {
      //关闭节流阀
      flag = false;
      if (num >= ul.children.length) {
        ul.style.left = 0;
        num = 0;
      }
      //num赋值为1 则先使用在自增 num赋值为0则先自增再使用
      // console.log(bannerWidth);
      // console.log(num);
      //用回调函数在动画执行完之后开启节流阀
      animate(ul, -num * bannerWidth, function () {
        flag = true;
      });
      num++;
      //关联小圆圈
      for (var j = 0; j < ul.children.length; j++) {
        ol.children[j].className = "";
      }
      ol.children[num - 1].className = "current";
      // console.log(num);
    }
  });
  arrowLeft.addEventListener("click", function () {
    if (num !== 1) {
      ul.style.left = ul.offsetLeft + 721 + "px";
      num--;
    } else {
      //重置ul位置 初始化num 即可循环播放
      ul.style.left = -721 * (ul.children.length - 1) + "px";
      num = ul.children.length;
    }
    for (var j = 0; j < ul.children.length; j++) {
      ol.children[j].className = "";
    }
    ol.children[num - 1].className = "current";
    // console.log(num);
  });
});
