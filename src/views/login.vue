<template>
    <div class="login">
        <div class="background" ref="background"></div>
        <div class="setting" @click="showSetting">
            <i class="el-icon-setting"></i>
        </div>
        <div class="login-box" ref="loginBox">
            <div class="header" ref="header">
                XZ-Admin
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"        label-position="right">
                <el-form-item prop="account">
                    <el-input 
                    v-model="ruleForm.account" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input 
                    v-model="ruleForm.password"
                    prefix-icon="el-icon-lock"
                    type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                    type="primary" 
                    @click="submitForm('ruleForm')" 
                    style="width: 100%;">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.checked">自动登陆</el-checkbox>
                </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <div class="tip">
                使用合作网站账号登陆：
            </div>
            <div class="button-box">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconQQ"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconweibo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconweixin"></use>
                </svg>
            </div>
        </div>
        <Drawer 
        title="设置" 
        :closable="false" 
        v-model="isShowDrawer" 
        width="350px" 
        @on-close="closeDrawer"
        style="overflow-x: hidden">
              <el-tabs v-model="activeName" type="card" @tab-click="getTag">
                <el-tab-pane label="背景图" name="0"></el-tab-pane>
                <el-tab-pane label="登录框" name="1"></el-tab-pane>
            </el-tabs>
            <div class="background-setting" v-show="tab[0]">
                <el-image
                style="width: 100%; height: 159px"
                :src="backgroundUrl"
                :fit="size"
                ref="image"></el-image>
                <div class="radio-box">
                    <el-radio v-model="size" label="cover">覆盖</el-radio>
                    <el-radio v-model="size" label="contain">适应</el-radio>
                    <el-radio v-model="size" label="fill">填充</el-radio>
                </div>
                <div class="block">
                    <span class="demonstration">透明度：</span>
                    <el-slider 
                    v-model="opacity" 
                    :format-tooltip="formatTooltip"
                    @change="getVal"></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">模糊度：</span>
                    <el-slider 
                    v-model="blur" 
                    :format-tooltip="formatTooltip"
                    @change="getVal"></el-slider>
                </div>
                <div class="button">
          git          <el-button 
                    type="primary" 
                    style="width: 100%"
                    @click="selectPic"
                    >选择图片</el-button>
                </div>
                <div class="button">
                    <el-button 
                    type="success" 
                    style="width: 100%"
                    @click="useBg"
                    >应用背景</el-button>
                </div>
            </div>
            <div class="login-box-setting" v-show="tab[1]">
                <div class="block" style="text-align:right">
                    <span class="label">登录框颜色:</span>
                    <el-color-picker
                     v-model="boxColor"
                    @change="getBoxVal"
                     show-alpha></el-color-picker>
                </div>
                <div class="block" style="text-align:right">
                    <span class="label">字体颜色:</span>
                    <el-color-picker 
                    v-model="fontColor"
                    @change="getBoxVal"></el-color-picker>
                </div>
                <div class="block">
                    <span class="demonstration">高度：</span>
                    <el-slider 
                    v-model="height" 
                    @change="getBoxVal"
                    ></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">宽度：</span>
                    <el-slider 
                    v-model="width" 
                    @change="getBoxVal"
                    ></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">标题大小：</span>
                    <el-slider 
                    v-model="fontSize" 
                    @change="getBoxVal"
                    ></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">图标大小：</span>
                    <el-slider 
                    v-model="iconSize" 
                    @change="getBoxVal"
                    ></el-slider>
                </div>
                <div class="button">
                    <el-button 
                    type="success" 
                    style="width: 100%"
                    @click="saveBoxStyle"
                    >保存样式</el-button>
                </div>
            </div>
        </Drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'left',
            isShowDrawer: false,
            activeName: '0',
            tab: [1, 0],
            backgroundUrl: this.$getMemoryPmt("backgroundUrl") || "",
            opacity: +this.$getMemoryPmt('opacity') || 100,
            blur: +this.$getMemoryPmt('blur') || 0,
            height: +this.$getMemoryPmt('height') || 62,
            width: +this.$getMemoryPmt('width') || 50,
            fontSize: +this.$getMemoryPmt('fontSize') || 30,
            iconSize: +this.$getMemoryPmt('iconSize') || 30,
            size: this.$getMemoryPmt('size') || "cover",
            boxColor: this.$getMemoryPmt('boxColor') || "rgba(0, 0, 0, .35)",
            fontColor: this.$getMemoryPmt('fontColor') || "#fefefe",
            ruleForm: {
                account: "",
                password: "",
                checked: false,
            },
            rules: {
                account: [
                    { required: true, message: "账号不能为空", trigger: 'blur' },
                    { min: 3, max: 20, message: "账号长度在3到20个字符", trigger: 'blur' }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: 'blur' },
                    { min: 3, max: 20, message: "密码长度在3到20个字符", trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        document.title = "登录"
    },
    mounted() {
        // 初始化样式
        this.getBoxVal()
        this.useStyle()
        this.initialStyle()
    },
    methods: {
        // 关闭抽屉样式恢复
        closeDrawer() {
            const
                loginBox = this.$refs.loginBox,
                header = this.$refs.header,
                svg = document.querySelectorAll('svg'),
                checkBox = document.querySelector('.el-checkbox'),
                tip = document.querySelector('.tip')
            this.$setStyle(
                loginBox, 
                'height', 
                `${(this.height = this.$getMemoryPmt('height') || 62) / 2}rem`)
            this.$setStyle(
                loginBox, 
                'width', 
                `${(this.width = this.$getMemoryPmt('width') || 50) / 2}rem`)
            this.$setStyle(
                loginBox, 
                'background', 
                `${(this.boxColor = this.$getMemoryPmt('boxColor') || 'rgba(0, 0, 0, .35)')}`)
            this.$setStyle(
                header, 
                'font-size', 
                `${(this.fontSize = this.$getMemoryPmt('fontSize') || 30) / 20}rem`)
            this.$setStyle(
                header, 
                'color', 
                `${(this.fontColor = this.$getMemoryPmt('fontColor') || '#fefefe')}`)
            this.$setStyle(
                checkBox, 
                'color', 
                `${(this.$getMemoryPmt('fontColor') || '#fefefe')}`)
            this.$setStyle(
                tip, 
                'color', 
                `${(this.$getMemoryPmt('fontColor') || '#fefefe')}`)
            svg.forEach(value => {
                this.$setStyle(
                    value, 
                    'width', 
                    `${(this.iconSize =  this.$getMemoryPmt('iconSize') || 30) / 10}rem`)
                this.$setStyle(
                    value, 
                    'height', 
                    `${(this.$getMemoryPmt('iconSize') || 30) / 10}rem`)
            })
        },
        // 登录框样式预览
        getBoxVal() {
            const
                loginBox = this.$refs.loginBox,
                header = this.$refs.header,
                svg = document.querySelectorAll('svg'),
                checkBox = document.querySelector('.el-checkbox'),
                tip = document.querySelector('.tip')
            this.$setStyle(
                loginBox, 
                'height', 
                `${this.height / 2}rem`)
            this.$setStyle(
                loginBox, 
                'width', 
                `${this.width / 2}rem`)
            this.$setStyle(
                loginBox, 
                'background', 
                `${this.boxColor}`)
            this.$setStyle(
                header, 
                'font-size', 
                `${this.fontSize / 20}rem`)
            this.$setStyle(
                header, 
                'color',
                `${this.fontColor}`)
            this.$setStyle(
                checkBox, 
                'color', 
                `${this.fontColor}`)
            this.$setStyle(
                tip, 
                'color', 
                `${this.fontColor}`)
            svg.forEach(value => {
                this.$setStyle(
                    value, 
                    'width', 
                    `${this.iconSize / 10}rem`)
                this.$setStyle(
                    value, 
                    'height', 
                    `${this.iconSize / 10}rem`)
            })
        },
        // 图片预览
        getVal() {
            const child = document.querySelector('.el-image__inner')
            this.backgroundUrl
            ? (this.$setStyle(
                child, 
                'opacity', 
                `${this.opacity / 100}`),
                this.$setStyle(
                    child, 
                    'filter', 
                    `blur(${this.blur}px)`))
            : this.$warnMsg("请选择图片")
        },
        // 值格式化
        formatTooltip(val) {
            return val / 100
        },
        // 初始化样式
        initialStyle() {
            const ele = document.querySelector('.ivu-drawer-body')
            this.$setStyle(
                ele, 
                'overflow-x', 
                'hidden')
        },
        // 选择背景图
        selectPic() {
            this
                .$getImgFile()
                .then(({raw, url}) => {
                    this.backgroundUrl = url
                })
                .catch(e => {
                    this.$warnMsg(e)
                })
        },
        // 应用图片
        useBg() {
            const ele = this.$refs.background
            this.backgroundUrl
            && (this.$setStyle(
                ele, 
                'background-image', 
                `url(${this.backgroundUrl})`), 
                this.$setStyle(
                    ele, 
                    'opacity', 
                    `${this.opacity / 100}`),
            this.$setStyle(
                ele, 
                'filter', 
                `blur(${this.blur}px)`), 
                this.$setStyle(
                    ele, 
                    'background-size', 
                    `${this.size == "fill" ? "100% 100%" : this.size}`))
            this.saveBgStyle()
        },
        // 保存背景样式
        saveBgStyle() {
            this.$setMemoryPmt('backgroundUrl', this.backgroundUrl)
            this.$setMemoryPmt('opacity', this.opacity)
            this.$setMemoryPmt('blur', this.blur)
        },
        // 保存登录框样式
        saveBoxStyle() {
            this.$setMemoryPmt('height', this.height)
            this.$setMemoryPmt('width', this.width)
            this.$setMemoryPmt('fontSize', this.fontSize)
            this.$setMemoryPmt('iconSize', this.iconSize)
            this.$setMemoryPmt('size', this.size)
            this.$setMemoryPmt('boxColor', this.boxColor)
            this.$setMemoryPmt('fontColor', this.fontColor)
            this.$successMsg('保存成功')
        },
        // 显示对应的tab页
        getTag(tab, event) {
            this.tab = this.tab.map((val, ind) => {
                if(tab.name == ind) {
                    return 1
                }else {
                    return 0
                }
            })
        },
        // 展开抽屉
        showSetting() {
            this.isShowDrawer = true
        },
        // 登录
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    this.$successMsg('登录成功')
                    setTimeout(() => {
                        this.$router.push({path: '/home/chart'})
                    }, 1000);
                }else {
                    return false
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .login {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .background {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-image: url(../assets/login/background.png);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: -1;
        opacity: 0.5;
    }
    .setting {
        position: relative;
        top: 1rem;
        left: 1rem;
        width: 3rem;
        height: 3rem;
        text-align: center;
        border-radius: 50%;
        background: #f7f7f7;
        cursor: pointer;
        transition: .5s ;
    }
    .el-icon-setting {
        font-size: 1.5rem;
        line-height: 3rem;
    }
    .setting:hover {
        transform: rotate(360deg) scale(1.1);
        color: #fefefe;
        background: rgb(19, 180, 255);
    }
    .login-box {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 25rem;
        height: 31rem;
        background: rgba(0, 0, 0, .35);
        transition: .5s;
        border-radius: 5px;
    }
    .login-box:hover {
        transform: translateY(-.5%);
        box-shadow: 0 0 5px 1px rgb(78, 78, 78);
    }
    .header {
        position: relative;
        text-align: center;
        font-size: 1.5rem;
        line-height: 5rem;
        color: #fefefe;
        font-style: italic;
    }
    .el-form {
        position: relative;
        margin: 1rem;
    }
    .el-checkbox {
        color: #fefefe;
    }
    .tip {
        position: relative;
        margin-top: 1rem;
        padding-left: 1rem;
        color: #fefefe;
    }
    .button-box {
        position: relative;
        margin: 1.7rem 0;
        display: flex;
        justify-content: space-around;
    }
    .radio-box {
        position: relative;
        margin: 1rem 0;
        text-align: center;
    }
    svg {
        width: 3rem;
        height: 3rem;
        transition: .5s;
    }
    svg:first-of-type {
        margin-left: 1rem;
    }
    svg:last-of-type {
        margin-right: 1rem;
    }
    svg:hover {
        transform: scale(1.3);
    }
    .setting-header {
        position: relative;
        margin: 1rem 0;
        font-size: 1.1rem;
    }
    .button {
        position: relative;
        margin: .5rem 0;
    }
    .block {
        position: relative;
    }
    .label {
        position: absolute;
        left: 0;
        top: 40%;
        transform: translateY(-50%);
    }
</style>
