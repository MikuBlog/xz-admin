import { validateBothPhMob } from '@/utils/form_validate'
export default {
  data() {
    return {
      typeList: [],
      coverImage: "",
      address: "",
      preAddress: "",
      addressList: [],
      form: {
        name: "",
        fullName: "",
        phone: "",
        info: "",
        image: "",
        detailAddress: "",
        longitude: "",
        latitude: "",
        description: "",
        provinceId: "",
        cityId: "",
        districtId: "",
        city: "",
        province: "",
        district: ""
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      geocoder: "",
      rules: {
        name: [
          { required: true, message: "请输入门店名称", trigger: "blur" }
        ],
        fullName: [
          { required: true, message: "请输入店长姓名", trigger: "blur" }
        ],
        province: [
          { required: true, message: "请选择省市区", trigger: "blur" }
        ],
        phone: [
          { required: true, validator: validateBothPhMob, trigger: "change" }
        ],
        info: [
          { required: false, message: "请输入门店简介", trigger: "blur" }
        ],
        image: [
          { required: true, message: "请上传门店Logo", trigger: "change" }
        ],
        detailAddress: [
          { required: true, message: "请输入门店详细地址", trigger: "blur" }
        ],
        longitude: [
          { required: true, message: "请输入门店经度", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "请输入门店纬度", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入门店详细介绍", trigger: "blur" }
        ],
      },
      buttonOptions: [{
        type: "primary",
        title: "确认",
        name: "确认",
        method: "submitForm"
      }, {
        type: "info",
        title: "重置",
        name: "重置",
        method: "resetForm"
      }]
    }
  }
}