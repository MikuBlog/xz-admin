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
                    <use xlink:href="#iconwechat"></use>
                </svg>
            </div>
        </div>
        <Drawer title="设置" :closable="false" v-model="isShowDrawer" width="350px">
              <el-tabs v-model="activeName" type="card" @tab-click="getTag">
                <el-tab-pane label="背景图" name="0"></el-tab-pane>
                <el-tab-pane label="登录框" name="1"></el-tab-pane>
            </el-tabs>
            <div class="background-setting" v-show="tab[0]">
                <el-image
                style="width: 100%; height: 159px"
                :src="url"
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
                    <el-button 
                    type="primary" 
                    style="width: 100%"
                    @click="selectPic"
                    >选择图片</el-button>
                </div>
                <div class="button">
                    <el-button 
                    type="success" 
                    style="width: 100%"
                    @click="useStyle"
                    >应用背景</el-button>
                </div>
            </div>
            <div class="login-box-setting" v-show="tab[1]">
                <div class="block">
                    <span class="demonstration">高度：</span>
                    <el-slider 
                    v-model="height" 
                    ></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">宽度：</span>
                    <el-slider 
                    v-model="width" 
                    ></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">透明度：</span>
                    <el-slider 
                    v-model="loginOpacity" 
                    ></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">字体大小：</span>
                    <el-slider 
                    v-model="fontSize" 
                    ></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">图标大小：</span>
                    <el-slider 
                    v-model="iconSize" 
                    ></el-slider>
                </div>
                <div class="button">
                    <el-button 
                    type="success" 
                    style="width: 100%"
                    @click="useStyle"
                    >应用样式</el-button>
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
            fileEle: "",
            url: localStorage.getItem("backgroundUrl") || "",
            event: "",
            opacity: +localStorage.getItem('opacity') || 100,
            blur: +localStorage.getItem('blur') || 0,
            height: +localStorage.getItem('height') || 62,
            width: +localStorage.getItem('width') || 50,
            loginOpacity: +localStorage.getItem('loginOpacity') || 35,
            fontSize: +localStorage.getItem('fontSize') || 30,
            iconSize: +localStorage.getItem('iconSize') || 30,
            ruleForm: {
                account: "",
                password: "",
                checked: false,
            },
            size: localStorage.getItem('size') || "cover",
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
        // 初始化操作
        this.getFileEle()
    },
    mounted() {
        // DOM元素加载后进行样式的修改
        this.useStyle()
    },
    methods: {
        // 检测属性值的变化
        getVal() {
            const 
                child = document.querySelector('.el-image__inner'),
                loginBox = this.$refs.loginBox,
                header = this.$refs.header
            this.url
            ? (this.$setStyle(child, 'opacity', `${this.opacity / 100}`),this.$setStyle(child, 'filter', `blur(${this.blur}px)`))
            : this.$warnMsg("请选择图片")
        },
        // 值格式化
        formatTooltip(val) {
            return val / 100
        },
        // 创建元素
        getFileEle() {
            let
                reader = new FileReader(),
                pattern = new RegExp(/^image/)
            this.fileEle = document.createElement('input')
            this.fileEle.type = "file"
            this.fileEle.accept = "image/jpeg, image/png"
            this.fileEle.addEventListener('change', () => {
                const files = this.fileEle.files[0]
                files.size / (1024 ** 2) > 2
                ? this.$warnMsg("选择的图片不能超过2MB")
                : (pattern.test(files.type)
                ? reader.readAsDataURL(files)
                : this.$warnMsg("请选择图片"))
            })
            reader.addEventListener('load', () => {
                this.url = reader.result
            })
        },
        // 选择背景图
        selectPic() {
            const event = new MouseEvent('click') 
            this.fileEle.dispatchEvent(event)
        },
        // 应用图片
        useStyle() {
            const 
                ele = this.$refs.background,
                loginBox = this.$refs.loginBox,
                header = this.$refs.header,
                svg = document.querySelectorAll('svg')         
            this.url
            ? (this.$setStyle(ele, 'background-image', `url(${this.url})`), this.$setStyle(ele, 'opacity', `${this.opacity / 100}`),
            this.$setStyle(ele, 'filter', `blur(${this.blur}px)`), this.$setStyle(ele, 'background-size', `${this.size == "fill" ? "100% 100%" : this.size}`))
            : this.$warnMsg("请选择图片")
            this.$setStyle(loginBox, 'height', `${this.height / 2}rem`)
            this.$setStyle(loginBox, 'width', `${this.width / 2}rem`)
            this.$setStyle(loginBox, 'background', `rgba(0, 0, 0, ${this.loginOpacity / 100})`)
            this.$setStyle(header, 'font-size', `${this.fontSize / 20}rem`)
            svg.forEach(value => {
                this.$setStyle(value, 'width', `${this.iconSize / 10}rem`)
                this.$setStyle(value, 'height', `${this.iconSize / 10}rem`)
            })
            localStorage.setItem('backgroundUrl', this.url),
            localStorage.setItem('opacity', this.opacity),
            localStorage.setItem('blur', this.blur)
            localStorage.setItem('height', this.height)
            localStorage.setItem('width', this.width)
            localStorage.setItem('loginOpacity', this.loginOpacity)
            localStorage.setItem('fontSize', this.fontSize)
            localStorage.setItem('iconSize', this.iconSize)
            localStorage.setItem('size', this.size)
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
        showSetting() {
            this.isShowDrawer = true
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    this.$successMsg('登录成功')
                }else {
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
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
        transform: blur
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
        width: 20rem;
        height: 30rem;
        background: rgba(0, 0, 0, .35);
        transition: .5s;
    }
    .login-box:hover {
        transform: translateY(-1.5%);
        box-shadow: 0 5px 5px 1px rgb(160, 160, 160);
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
        width: 2rem;
        height: 2rem;
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
</style>
