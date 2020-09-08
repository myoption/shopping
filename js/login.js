/*登录、注册检查*/
window.addEventListener("load", function () {
  //1.先获取表单元素
  var user_name = document.querySelector("#user_name");
  var nickname = document.querySelector("#nickname");
  var qq = document.querySelector("#qq");
  var phone_num = document.querySelector("#phone_number");
  //   console.log(phone_num);
  //   console.log(phone_num.previousElementSibling);
  var text_code = document.querySelector("#text_code");
  var pwd = document.querySelector("#pwd");
  var confirm_pwd = document.querySelector("#confirm_pwd");
  //定义正则表达式
  let user_name_reg = /^\w{6,12}$/;
  let phone_num_reg = /^1[3|4|5|6|7|8]\d{9}$/;
  let nickname_reg = /^[\u4e00-\u9fa5]{2,10}$/;
  let qq_reg = /^[1-9]\d{4,}$/;
  let text_code_reg = /^\d{6}$/;
  let pwd_reg = /^\w{6,16}$/;
  //添加事件
  function regExpVerify(ele, reg) {
    ele.onblur = function () {
      // console.log(this.previousElementSibling);
      let str = this.previousElementSibling.innerHTML;
      // console.log(str);
      let content = str.split("：");
      // console.log(content);
      if (reg.test(this.value)) {
        this.nextElementSibling.className = "right";
        this.nextElementSibling.innerHTML = content[0] + "格式正确";
      } else {
        this.nextElementSibling.className = "error";
        this.nextElementSibling.innerHTML =
          content[0] + "格式不正确，请重新输入";
      }
    };
  }
  regExpVerify(user_name, user_name_reg);
  regExpVerify(nickname, nickname_reg);
  regExpVerify(qq, qq_reg);
  regExpVerify(phone_num, phone_num_reg);
  regExpVerify(text_code, text_code_reg);
  regExpVerify(pwd, pwd_reg);
  confirm_pwd.onblur = function () {
    if (this.value === pwd.value) {
      this.nextElementSibling.className = "right";
      this.nextElementSibling.innerHTML = "两次密码输入一致";
    } else {
      this.nextElementSibling.className = "error";
      this.nextElementSibling.innerHTML = "两次密码输入不一致";
    }
  };
});
