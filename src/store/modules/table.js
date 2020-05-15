import store from '../index'
// 用于动态固定表格高度
const 
	state = {
		tableHeight: 0
	},
	mutations = {
		SET_TABLE_HEIGHT(state, height) {
			state.tableHeight = height
		}
	}

window.addEventListener('load', e => {
	store.commit('SET_TABLE_HEIGHT', document.body.clientHeight - 180)
})

window.addEventListener('resize', e => {
	store.commit('SET_TABLE_HEIGHT', document.body.clientHeight - 180)
})

export default {
	state,
	mutations
}