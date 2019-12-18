<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <div slot="header">
          <span style="font-size: 1rem">列表1</span>
        </div>
        <draggable
          v-model="myArray_1"
          :options="options_1"
          style="min-height: 100px"
          @change="setData_1"
        >
          <div v-for="items in myArray_1" :key="items.id" class="items">{{items.title}}</div>
        </draggable>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <div slot="header">
          <span style="font-size: 1rem">列表2</span>
        </div>
        <draggable style="min-height: 100px" v-model="myArray_2" :options="options_1">
          <div
            v-for="items in myArray_2"
            :key="items.id"
            class="items"
            @change="setData_2"
          >{{items.title}}</div>
        </draggable>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      options_1: {
        group: "a",
        animation: 150,
        draggable: ".items"
      },
      options_2: {
        group: "a",
        animation: 150,
        draggable: ".items"
      },
      myArray_1: [
        {
          id: 1,
          title: "我的名字叫旋仔"
        },
        {
          id: 2,
          title: "我今年二十岁了"
        },
        {
          id: 3,
          title: "我所读专业为计算机科学与技术"
        },
        {
          id: 4,
          title: "我喜欢打羽毛球、敲代码、看书"
        }
      ],
      myArray_2: [
        {
          id: 5,
          title: "你好吗"
        },
        {
          id: 6,
          title: "我很好"
        },
        {
          id: 7,
          title: "很高兴认识你"
        },
        {
          id: 8,
          title: "我也是"
        }
      ]
    };
  },
  methods: {
    setData_1() {
      // todo
    },
    setData_2() {
      // todo
    }
  }
};
</script>

<style lang="scss" scoped>
.items {
  position: relative;
  line-height: 2.3rem;
  text-indent: 1rem;
  border: 1px solid #dfdfdf;
  color: #666;
  border-radius: 5px;
  margin: 0.2rem 0;
  cursor: move;
}
/deep/ .group {
  min-height: 100px;
}
</style>