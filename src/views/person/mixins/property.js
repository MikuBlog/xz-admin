import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      isShow: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}