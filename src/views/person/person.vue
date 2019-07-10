<template>
    <div class="person">
        <el-row :gutter="20">
            <el-col :sm="24" :md="6">
                <el-card class="box-card">
                    <div slot="header" class="header">
                        <span>About me</span>
                    </div>
                    <div class="avatar-box">
                        <div class="avatar">
                            <el-avatar 
                            :size="120" 
                            :src="squareUrl">
                                <img src="https://myinterface.xuanzai.top/getPicture?type=error"/>
                            </el-avatar>
                        </div>
                        <div class="avatar-detail">
                            <div class="role">
                                Super Admin
                            </div>
                            <div class="name">
                                XuanZai
                            </div>
                        </div>
                    </div>
                    <div class="title">
                        <i class="el-icon-reading"></i>
                        <span class="word">GDOU Univercity</span>
                        <div class="border"></div>
                    </div>
                    <div style="font-size: .8rem;">
                        My favorite action is study.
                    </div>
                    <div class="title">
                        <i class="el-icon-magic-stick"></i>
                        <span class="word">skill</span>
                        <div class="border"></div>
                    </div>
                    <div class="skill-box">
                        <span>HTML</span>
                        <el-progress status="success" :percentage="100"></el-progress>
                        <span>CSS</span>
                        <el-progress :percentage="70"></el-progress>
                        <span>JavaScript</span>
                        <el-progress :percentage="80"></el-progress>
                        <span>jquery</span>
                        <el-progress status="warning" :percentage="50"></el-progress>
                        <span>Node.js</span>
                        <el-progress status="warning" :percentage="50"></el-progress>
                        <span>Vue</span>
                        <el-progress :percentage="80"></el-progress>
                        <span>React</span>
                        <el-progress status="exception" :percentage="30"></el-progress>
                        <span>Angular</span>
                        <el-progress status="warning" :percentage="50"></el-progress>
                        <span>Small procedures</span>
                        <el-progress :percentage="80"></el-progress>
                        <span>Flutter</span>
                        <el-progress status="exception" :percentage="30"></el-progress>
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="24" :md="18">
                <el-card class="box-card card-gutter">
                    <div class="tabs">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="Timeline" name="first">
                                <el-timeline>
                                    <el-timeline-item timestamp="2018/4/17" placement="top">
                                    <el-card>
                                        <h4 class="timeline-title">更新 Github 模板</h4>
                                        <p class="timeline-content">旋仔 提交于 2018/4/17 20:46</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="2018/4/16" placement="top">
                                    <el-card>
                                        <h4 class="timeline-title">更新 Github 模板</h4>
                                        <p class="timeline-content">旋仔 提交于 2018/4/16 20:46</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="2018/4/15" placement="top">
                                    <el-card>
                                        <h4 class="timeline-title">更新 Github 模板</h4>
                                        <p class="timeline-content">旋仔 提交于 2018/4/15 20:46</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="2018/4/12" placement="top">
                                    <el-card>
                                        <h4 class="timeline-title">更新 Github 模板</h4>
                                        <p class="timeline-content">旋仔 提交于 2018/4/12 20:46</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="2018/4/3" placement="top">
                                    <el-card>
                                        <h4 class="timeline-title">更新 Github 模板</h4>
                                        <p class="timeline-content">旋仔 提交于 2018/4/3 20:46</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="2018/4/2" placement="top">
                                    <el-card>
                                        <h4 class="timeline-title">更新 Github 模板</h4>
                                        <p class="timeline-content">旋仔 提交于 2018/4/2 20:46</p>
                                    </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </el-tab-pane>
                            <el-tab-pane label="Activity" name="second">
                                <el-carousel :interval="4000" type="card" height="200px">
                                    <el-carousel-item v-for="item in imageList" :key="item">
                                        <div class="image-box">
                                            <img :src="item" class="image">
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: "first",
            imageList: [
                'https://myinterface.xuanzai.top/getPicture?type=2233&id=2',
                'https://myinterface.xuanzai.top/getPicture?type=2233&id=3',
                'https://myinterface.xuanzai.top/getPicture?type=2233&id=4',
                'https://myinterface.xuanzai.top/getPicture?type=2233&id=5'
            ],
            squareUrl: "https://myinterface.xuanzai.top/getPicture?type=头像&id=8"
        }
    },
    methods: {
        handleClick(tab, event) {
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        position: relative;
        font-size: 1.1rem;
        color: #2f3032;
    }
    .avatar-box {
        position: relative;
        text-align: center;
    }
    .avatar {
        position: relative;
        margin: auto;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .image-box {
        position: relative;
    }
    .image {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .role {
        position: relative;
        font-size: 1.1rem;
        font-weight: bold;
    }
    .name {
        font-size: 1rem;
        color: #7d7d7d;
    }
    .title {
        position: relative;
        margin: 2rem 0 1rem 0;
    }
    .word {
        position: relative;
        padding-left: .3rem;
    }
    .content {
        position: relative;
        font-size: .9rem;
    }
    .timeline-title {
        color: #7d7d7d;
    }
    .timeline-content {
        font-size: .8rem;
    }
</style>