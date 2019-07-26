<template>
    <div class="container">
    <div id="errorCode">404</div>
    <div id="errorMessage">找不到该页面啦~</div><a class="button" @click="turnBack">返回首页</a>
    </div>
</template>

<script>
export default {
    methods: {
        turnBack() {
            this.$clearMemorySes()
            this.$router.push({ path: "/home/welcome" })
        }
    }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  border: none;
}

body {
  background: bodyBg;
  color: #fff;
}

.container {
  width: 70%;
  max-width: 650px;
  height: 300px;
  background: #b6fbff;
  background: -webkit-linear-gradient(#b6fbff, #83a4d4);
  background: -o-linear-gradient(#b6fbff, #83a4d4);
  background: -moz-linear-gradient(#b6fbff, #83a4d4);
  background: linear-gradient(#b6fbff, #83a4d4);
  margin: 50vh auto;
  -ms-transform: translate(0px, -150px);
  -webkit-transform: translate(0px, -150px);
  transform: translate(0px, -150px);
  border-radius: 20px;
  box-shadow: 0 6px 28px -10px #333;
}

#errorCode {
  font-size: 70px;
  text-align: center;
  padding-top: 70px;
  color: #fff;
}

#errorMessage {
  text-align: center;
}

.button {
  display: block;
  cursor: pointer;
  text-align: center;
  background: #fff;
  color: #83a4d4;
  width: 200px;
  margin: 20px auto;
  padding: 10px 40px;
  border-radius: 50px;
  box-shadow: 0 5px 28px -8px #333;
}

</style>
