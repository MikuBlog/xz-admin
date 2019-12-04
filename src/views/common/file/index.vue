<template>
    <div class="preview-file">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header">
                        <span style="font-size: 1rem">示例</span>
                    </div>
                    <el-button class="margin-box" type="primary" @click="previewFile('http://file.xuanzai.top/test/test_4.xlsx')">查看excel</el-button>
                    <el-button class="margin-box" type="success" @click="previewFile('http://file.xuanzai.top/test/test_2.docx')">查看word</el-button>
                    <el-button class="margin-box" type="info" @click="previewFile('http://file.xuanzai.top/test/test_3.pptx')">查看ppt</el-button>
                    <el-button class="margin-box" type="warning" @click="previewFile('http://file.xuanzai.top/test/test_5.jpg')">查看图片</el-button>
                    <el-button class="margin-box" type="danger" @click="previewFile('http://file.xuanzai.top/test/test_1.txt')">查看txt</el-button>
                    <el-button class="margin-box" type="danger" @click="$print()">打印</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        previewFile(url) {
            this.$previewFile(url)
        }
    }
}
</script>

<style>

</style>
