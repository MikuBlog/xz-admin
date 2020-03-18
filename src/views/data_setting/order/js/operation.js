export default {
  created() {
    this.getIntegralRules()
  },
	methods: {
    doSubmit() {
      this.form.id ? this.doEdit() : this.doAdd();
    },
    doAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/groupData/add",
            method: "post",
            data: {
							sort: this.form.sort,
							value: JSON.stringify(this.form),
							enabled: this.form.enabled,
							groupName: this.form.groupName
						}
          }).then(result => {
            this.$successMsg("添加成功");
          });
        } else {
          return false;
        }
      });
    },
    doEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
					this.form.value = JSON.parse(JSON.stringify(this.form))
          this.$http_json({
            url: "/api/groupData/edit",
            method: "post",
            data: {
							id: this.form.id,
							sort: this.form.sort,
							value: JSON.stringify(this.form),
							enabled: this.form.enabled,
							groupName: this.form.groupName
						}
          }).then(result => {
            this.$successMsg("编辑成功");
          });
        } else {
          return false;
        }
      });
    },
		initialIntegrallist(list) {
      !list.length
      ? this.form.scale = ""
      : (this.form.orderUnpaid = JSON.parse(list[0].value).orderUnpaid,
      this.form.orderUnconfirm = JSON.parse(list[0].value).orderUnconfirm,
      this.form.orderComment = JSON.parse(list[0].value).orderComment,
      this.form.id = list[0].id)
		},
		getIntegralRules() {
		  this.$http_normal({
		    url: `/api/groupData/page?page=0&size=1&sort=sort,asc&groupName=order_setting`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialIntegrallist(data.content);
		  });
		},
	}
}