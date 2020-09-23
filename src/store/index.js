import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // chosenList: [],
    // allList: [
    //   { name: '产品运营及策划部', src: '/', des: '红岩网校是重邮校园的互联网学生组织' },
    //   { name: '视觉设计部', src: '/', des: '红岩网校是重邮校园的互联网学生组织' },
    //   { name: '移动开发部', src: '/', des: '红岩网校是重邮校园的互联网学生组织' },
    //   { name: 'Web研发部', src: '/', des: '红岩网校是重邮校园的互联网学生组织' },
    //   { name: '运维安全部', src: '/', des: '红岩网校是重邮校园的互联网学生组织' }],
    inforList: [
      { name: '姓名', data: undefined, classname: 'name' },
      { name: '学号', data: undefined, classname: 'numSchool' },
      { name: '联系电话', data: undefined, classname: 'phone' },
      { name: '报名部门', data: undefined, classname: 'department' },
    ],
    Deadline: [{ id: 9, time: 1600826400000 }, { id: 47, time: 1600870261000 }, { id: 70, time: 1600870261000 }]
  },
  getters: {
    // showList: state => {
    //   return state.chosenList;
    // },
    // showAll: state => {
    //   return state.allList;
    // },
  },
  mutations: {
    // chChosenList(state, array) {
    //   state.chosenList = [];
    //   array.forEach((items) => {
    //     state.chosenList.push(state.allList[items])
    //   });
    //   console.log(state.chosenList)
    // },
    chdepart(state, departments) {
      state.inforList[3].data = departments;
      console.log(state.inforList)
    },
    chphone(state, phone) {
      state.inforList[2].data = phone;
      console.log(phone)
    },
    chName(state, name) {
      state.inforList[0].data = name;
    },
    chNum(state, num) {
      state.inforList[1].data = num;
    }
  },
  actions: {
  },
  modules: {
  }
})
