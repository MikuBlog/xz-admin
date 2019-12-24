<template>
  <ve-water-fall :data="data"></ve-water-fall>
</template>

<script>
import VeWaterFall from "v-charts/lib/waterfall.common";
export default {
  components: { VeWaterFall },
  data() {
    return {
      data: {
        columns: ["活动", "时间"],
        rows: [
          { 活动: "吃饭", 时间: 4 },
          { 活动: "睡觉", 时间: 10 },
          { 活动: "打豆豆", 时间: 5 }
        ]
      }
    };
  }
};
</script>