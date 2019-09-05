<template>
    <div id="content">
      <div id="duobei_wrap">
        <section id="duobei">
          <div class="yellow">
            <div class="shell"></div>
            <div class="shell"></div>
            <div class="shell"></div>
            <div class="shell"></div>
            <div class="shell"></div>
          </div>
          <div class="white">
            <div class="leaf"></div>
            <div class="leaf"></div>
            <div class="leaf"></div>
            <div class="leaf"></div>
            <div class="leaf"></div>
          </div>

          <div class="blue">
            <div class="branch"></div>
            <div class="branch"></div>
            <div class="branch"></div>
            <div class="branch"></div>
            <div class="branch"></div>
            <div class="circle"></div>
          </div>
        </section>
      </div>
      <!-- #duobei_wrap -->
      <div class="line"></div>

      <div class="not_found">
        <i class="ribbon"></i>
        <div class="not_found_404 cf">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
        <p class="not_found_tip">:( 很抱歉，您访问的页面不存在!</p>
        <a @click="turnBack" class="button button-rounded">返回首页</a>
          
      </div>

    </div>
</template>

<script>
export default {
    methods: {
        turnBack() {
            this.$clearMemorySes()
            this.$router.push({ path: "/home/welcome" })
        }
    },
    mounted() {
      const _this = this
      	$(function(){
        var time=setTimeout(function(){
          $("#duobei").css({
            "-webkit-transform": "rotate(-30deg) scale(0.5)",
          });
        },2000);

        $("#title").hide();
        var title=setTimeout(function(){
          $("#title").addClass("title_move");
          $("#title").show();
        },3400);

        var duobeiWrap=setTimeout(function(){
          // $("#duobei_wrap").css({"float":"left"});
        },3400);
      })
    },
}
</script>

<style lang="scss" scoped>
#content{
	font-family: 'Open Sans', sans-serif;
	font-size: 14px;
	color: #3c3c3c;
	background-color: #ECECEC;
}


#duobei_wrap{
	float: left;
	position: relative;
	width: 600px;
	height: 600px;
	-webkit-traisition: all 1s ease-out;
	-moz-traisition: all 1s ease-out;
	-o-traisition: all 1s ease-out;
	traisition: all 1s ease-out;
}
#duobei{
	width: 600px;
	height: 600px;
	margin: 60px auto;
	position: absolute;
	-webkit-transform: rotate(-30deg);
	-moz-transform: rotate(-30deg);
	-o-transform: rotate(-30deg);
	transform: rotate(-30deg);
}

.yellow{
	z-index: 1;
}

.blue{
	z-index: 3;
}

.shell{
	position: absolute;
	top: 40px;
	left:300px;
	display: block;
	width:200px;
	height: 400px;
	background: #FC9512;
	margin-top: 100px;
	-webkit-border-radius: 50% 50% 50% 50%;
	-moz-border-radius: 50% 50% 50% 50%;
	-o-border-radius: 50% 50% 50% 50%;
	border-radius: 50% 50% 50% 50%;
}
.shell:nth-child(1){
	top:80px;
	left:125px;
	width: 150px;
	height: 365px;
	-webkit-transform: rotate(-40deg);
	-moz-transform: rotate(-40deg);
	-o-transform: rotate(-40deg);
	transform: rotate(-40deg);
}
.shell:nth-child(2){
	top:24px;
	left: 150px;
	-webkit-transform: rotate(-25deg);
	-moz-transform: rotate(-25deg);
	-o-transform: rotate(-25deg);
	transform: rotate(-25deg);
}
.shell:nth-child(3){
	top:-5px;
	left:200px;
	-webkit-transform: rotate(0deg);
	-o-transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	transform: rotate(0deg);
}
.shell:nth-child(4){
	top:24px;
	left:250px;
	-webkit-transform: rotate(25deg);
	-moz-transform: rotate(25deg);
	-o-transform: rotate(25deg);
	transform: rotate(25deg);
}
.shell:nth-child(5){
	top:80px;
	left:330px;
	width: 150px;
	height: 365px;
	-webkit-transform: rotate(40deg);
	-moz-transform: rotate(40deg);
	-o-transform: rotate(40deg);
	transform: rotate(40deg);
}


.white{
	display: block;
	position: absolute;
	top:94px;
	left:20px;
	z-index: 2;
}
.leaf{
	position: absolute;
	top: 100px;
	left:400px;
	display: block;
	width:140px;
	height: 240px;
	background: #FFF;
	margin-top: 100px;
	-webkit-border-radius: 50% 50% 50% 50%;
	-moz-border-radius: 50% 50% 50% 50%;
	-o-border-radius: 50% 50% 50% 50%;
	border-radius: 50% 50% 50% 50%;
}
.leaf:nth-child(1){
	top:80px;
	left:120px;
	width: 130px;
	height: 260px;
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
}
.leaf:nth-child(2){
	top:24px;
	left: 150px;
	-webkit-transform: rotate(-33deg);
	-moz-transform: rotate(-33deg);
	-o-transform: rotate(-33deg);
	transform: rotate(-33deg);
}
.leaf:nth-child(3){
	top:-5px;
	left:200px;
	-webkit-transform: rotate(3deg);
	-moz-transform: rotate(3deg);
	-o-transform: rotate(3deg);
	transform: rotate(3deg);
}
.leaf:nth-child(4){
	top:24px;
	left:250px;
	-webkit-transform: rotate(33deg);
	-moz-transform: rotate(33deg);
	-o-transform: rotate(33deg);
	transform: rotate(33deg);
}
.leaf:nth-child(5){
	top:80px;
	left:300px;
	width: 130px;
	height: 260px;
	-webkit-transform: rotate(45deg);
	-moz-transform: rotate(45deg);
	-o-transform: rotate(45deg);
	transform: rotate(45deg);
}


.blue{
	display: block;
	position: absolute;
	top:204px;
	left:36px;
	z-index: 2;
	-webkit-transform: rotate(-4deg);
	transform: rotate(-4deg);
}
.branch{
	position: absolute;
	top: 100px;
	left:400px;
	display: block;
	width:100px;
	height: 160px;
	background: #00B7FA;
	margin-top: 100px;
	-webkit-border-radius: 50% 50% 50% 50%;
	-moz-border-radius: 50% 50% 50% 50%;
	-o-border-radius: 50% 50% 50% 50%;
	border-radius: 50% 50% 50% 50%;
}
.branch:nth-child(1){
	top:75px;
	left:140px;
	width: 80px;
	-webkit-transform: rotate(-48deg);
	transform: rotate(-48deg);
}
.branch:nth-child(2){
	top:24px;
	left: 150px;
	-webkit-transform: rotate(-30deg);
	transform: rotate(-30deg);
}
.branch:nth-child(3){
	top:-5px;
	left:200px;
	-webkit-transform: rotate(2deg);
	transform: rotate(2deg);
}
.branch:nth-child(4){
	top:30px;
	left:240px;
	-webkit-transform: rotate(30deg);
	transform: rotate(30deg);
}
.branch:nth-child(5){
	top:75px;
	left:275px;
	width: 90px;
	-webkit-transform: rotate(50deg);
	transform: rotate(50deg);
}
.circle{
	position: absolute;
	top:130px;
	left: 155px;
	width: 198px;
	height: 198px;
	border-radius:50%;
	background: #00B7FA;
	z-index: 4;
}

/*webkit*/
@-webkit-keyframes 'blues'{
	0%{
		opacity: 0;
	}
	33%{
		opacity: 1;
	}
}
@-webkit-keyframes 'whites'{
	0%{
		opacity: 0;
	}
	10%{
		opacity: 0;
	}
	66%{
		opacity: 1;
	}
}

@-webkit-keyframes 'yellows'{
	0%{
		opacity: 0;
	}
	66%{
		opacity: 0;
	}
	99%{
		opacity: 1;
	}
}


/*moz*/
@-moz-keyframes 'blues'{
	0%{
		opacity: 0;
	}
	33%{
		opacity: 1;
	}
}
@-moz-keyframes 'whites'{
	0%{
		opacity: 0;
	}
	10%{
		opacity: 0;
	}
	66%{
		opacity: 1;
	}
}

@-moz-keyframes 'yellows'{
	0%{
		opacity: 0;
	}
	66%{
		opacity: 0;
	}
	99%{
		opacity: 1;
	}
}


.blue{
	-webkit-animation-name:blues;
	-moz-animation-name:blues;
	-o-animation-name:blues;
	animation-name:blues;
}
.white{
	-webkit-animation-name:whites;
	-moz-animation-name:whites;
	-o-animation-name:whites;
	animation-name:whites;
	/*-webkit-animation-delay:2s;*/
}
.yellow{
	-webkit-animation-name:yellows;
	-moz-animation-name:yellows;
	-o-animation-name:yellows;
	animation-name:yellows;
	/*-webkit-animation-delay:4s;*/
}


.blue,.white,.yellow{
	-webkit-animation-duration: 2s;
	-webkit-animation-iteration-count: 1;
	-webkit-animation-timing-function: linear;

	-moz-animation-duration: 2s;
	-moz-animation-iteration-count: 1;
	-moz-animation-timing-function: linear;
}
#duobei{
	-webkit-transition: all 1s ease-in-out;
	-webkit-transform-origin: 50%;
	transition: all 1s ease-in-out;
	transform-origin: 50%;
}

.fl {float:left;display:inline;}
.fr {float:right;display:inline;}
.cf {display:block;zoom:1;}
* html .cf {height:1%;}
.cf:after {content:" ";display:block;height:0;clear:both;visibility:hidden;}


#title{
	position: absolute;
	bottom: -90px;
	left: 250px;
	height: 200px;
}

i{
	display: inline-block;
	font-size: 24px;
	font-family: "Microsoft YaHei";
	font-style: normal;
	-webkit-animation-duration: 1.4s;/*动画持续时间*/
    -webkit-animation-iteration-count: 1;/*定义循环资料，infinite为无限次*/
    -webkit-animation-timing-function: ease;/*动画频率*/

    animation-duration: 1.4s;
    animation-iteration-count: 1;
    animation-timing-function: ease;
}
i:nth-child(-n+2){
	color: #00b7fa;
	font-size: 24px;
}
i:nth-child(n+3){
	color: #666;
	font-size: 24px;
}

.title_move i:nth-child(1){
	-webkit-animation-name:'zoom-d';
	animation-name:'zoom-d';
}
.title_move i:nth-child(2){
	-webkit-animation-name:'zoom-b';
	animation-name:'zoom-b';
}
.title_move i:nth-child(3){
	-webkit-animation-name:'zoom-g';
	animation-name:'zoom-g';
}
.title_move i:nth-child(4){
	-webkit-animation-name:'zoom-k';
	animation-name:'zoom-k';
}
.title_move i:nth-child(5){
	-webkit-animation-name:'zoom-c';
	animation-name:'zoom-c';
}



@-webkit-keyframes 'zoom-d' {
    0% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    10% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    30% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    50% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1.0;
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1.0
    }
}

@-webkit-keyframes 'zoom-b' {
    0% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    20% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    40% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    60% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1.0;
    }
}

@-webkit-keyframes 'zoom-g' {
    0% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    30% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    50% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    70% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1.0
    }
}

@-webkit-keyframes 'zoom-k' {
    0% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    40% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    60% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    80% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1.0
    }
}

@-webkit-keyframes 'zoom-c' {
    0% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    50% {
        -webkit-transform: scale(0.6);
        transform: scale(0.6);
        opacity: 0;
    }
    70% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    90% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1.0
    }
}











.line{
	float: left;
	width: 1px;
	height: 600px;
	margin-top: 100px;
	background: #ddd;
	box-shadow: 1px 0 2px #FFF;
}




#content{
	width: 1202px;
	margin: 0 auto;
}
.not_found{
	float: right;
	width: 400px;
	height: auto;
	margin-top: 200px;
	position: relative;
}

.not_found_404 {
  text-align: center;
  font-family: cursive,sans-serif;
  font-size: 150px;
  font-weight: bold;
  line-height: 150px;
  letter-spacing: 25px;
  color: #fff;
  -webkit-transform: rotate(18deg);
  		  transform: rotate(18deg);
  -webkit-transform-origin: 12% 60%;
   transform-origin: 12% 60%;
}

.not_found_404 span {
	float: left;
  	cursor: pointer;
  	text-shadow: 0px 0px 2px #686868,
	    0px 1px 1px #ddd,
	    0px 2px 1px #d6d6d6,
	    0px 3px 1px #ccc,
	    0px 4px 1px #c5c5c5,
	    0px 5px 1px #c1c1c1,
	    0px 6px 1px #bbb,
	    0px 7px 1px #777,
	    0px 8px 3px rgba(100, 100, 100, 0.4),
	    0px 9px 5px rgba(100, 100, 100, 0.1),
	    0px 10px 7px rgba(100, 100, 100, 0.15),
	    0px 11px 9px rgba(100, 100, 100, 0.2),
	    0px 12px 11px rgba(100, 100, 100, 0.25),
	    0px 13px 15px rgba(100, 100, 100, 0.3);
	-webkit-transition: all .1s linear;
	transition: all .1s linear;
}

.not_found_404 span:hover {
  text-shadow: 0px 0px 2px #686868,
    0px 1px 1px #fff,
    0px 2px 1px #fff,
    0px 3px 1px #fff,
    0px 4px 1px #fff,
    0px 5px 1px #fff,
    0px 6px 1px #fff,
    0px 7px 1px #777,
    0px 8px 3px #fff,
    0px 9px 5px #fff,
    0px 10px 7px #fff,
    0px 11px 9px #fff,
    0px 12px 11px #fff,
    0px 13px 15px #fff;
  -webkit-transition: all .1s linear;
  transition: all .1s linear;
}

.not_found_tip{
	float: left;
	text-align: center;
	color: #666;
	font-family: "Microsoft YaHei";
	font-size: 20px;
	text-shadow: 0 1px 0 #fff;
	letter-spacing: 1px;
	line-height: 2em;
	margin-top: 80px;
	text-indent: 18px;
	-webkit-transform: rotate(0deg);
	transform: rotate(0deg);
}
.ribbon {
	position: absolute;
	top: 0;
	left: 0;
	width: 130px;
	height: 40px;
	background: rgba(0, 0, 0, 0.1);
	background: -webkit-gradient(linear, 555% 20%, 0% 92%, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.0)), color-stop(.1,rgba(0, 0, 0, 0.2)));
	background: -moz-linear-gradient(555% 0% 180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.0));
	border-left: 1px dashed rgba(0, 0, 0, 0.1);
	border-right: 1px dashed rgba(0, 0, 0, 0.1);
	box-shadow: 0px 0px 12px rgba(0,0,0,0.2);
	/*-webkit-transform: rotate(6deg) skew(0,0) translate(-60%,-5px);
	-moz-transform: rotate(6deg) skew(0,0) translate(-60%,-5px);
	-o-transform: rotate(6deg) skew(0,0) translate(-60%,-5px);
	transform: rotate(6deg) skew(0,0) translate(-60%,-5px);*/
}

@-webkit-keyframes 'not'{
	0%{
		
	}
	25%{
		-webkit-transform: rotate(12deg);
	}
	50%{
		-webkit-transform: rotate(18deg);
	}
	75%{
		-webkit-transform: rotate(12deg);
	}
	100%{
		-webkit-transform: rotate(18deg);
	}
	
}
.not_found_404{
	-webkit-animation-duration: 4s;
	-webkit-animation-name: not;
	-webkit-animation-iteration-count: infinite;
	-webkit-animation-timing-function: ease-in-out;
}

.button{
	-webkit-box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5), 0px 1px 2px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5), 0px 1px 2px rgba(0, 0, 0, 0.15);
	box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5), 0px 1px 2px rgba(0, 0, 0, 0.15);
	background-color: #ffffff;
	background: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, whitesmoke), color-stop(100%, #fff));
	background: -webkit-linear-gradient(top, whitesmoke, #fff);
	background: -moz-linear-gradient(top, whitesmoke, #fff);
	background: -o-linear-gradient(top, whitesmoke, #fff);
	background: linear-gradient(top, whitesmoke, #fff);
	display: -moz-inline-stack;
	display: inline-block;
	vertical-align: middle;
	zoom: 1;
	border: 1px solid #d4d4d4;
	height: 32px;
	line-height: 32px;
	padding: 0px 25.6px;
	font-weight: 300;
	font-size: 14px;
	font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
	color: #666666;
	text-shadow: 0 1px 1px white;
	margin: 0;
	text-decoration: none;
	text-align: center;
	-webkit-border-radius: 30px;
	-moz-border-radius: 30px;
	-ms-border-radius: 30px;
	-o-border-radius: 30px;
	border-radius: 30px;

	-moz-animation:funny 3s linear infinite;  
	-o-animation:funny 3s linear infinite;  
	animation:funny 3s linear infinite;  
	-webkit-animation:funny 3s linear infinite; 

	float: left;
	margin:20px auto auto 100px;
	clear: left;
}

@-webkit-keyframes funny{   
	0% { -webkit-box-shadow:0px 0px 0px whitesmoke; }    
	50% { -webkit-box-shadow:0px 0px 20px rgba(82, 168, 236, 0.8); }   
	100% { -webkit-box-shadow:0px 0px 0px whitesmoke; } 
}
@-moz-keyframes funny{   
	0% { -moz-box-shadow:0px 0px 0px whitesmoke; }    
	50% { -moz-box-shadow:0px 0px 20px rgba(82, 168, 236, 0.8); }   
	100% { -moz-box-shadow:0px 0px 0px whitesmoke; } 
}
</style>
