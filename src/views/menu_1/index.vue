<template>
    <div class="ceshi">
        <el-card>
            二级子菜单
        </el-card>
    </div>
</template>

<script>
export default {
  mounted() {
    const array = [{ name: "旋仔", age: 20 }, { name: "小伙子", age: 16 }]
    console.log(this.$searchResult(array, ['age'], '16'))
  }
}
</script>