import Icon from "@/components/icon_select/requireIcons";
export default {
  created() {
    this.initialIconList();
  },
  methods: {
    initialIconList() {
      Icon.forEach((val, ind) => {
        this.iconList.push({
          key: ind,
          name: val,
          tag: `<svg-icon icon-class="${val}"/>`
        });
      });
    },
  }
}