/**
 *  auth 
 */

const auth = {
	state: {
		isLogin: uni.getStorageSync('uniIdToken') && uni.getStorageSync('uniIdTokenExpired') > Date.now(),
		userinfo: {}
	},
	getters: {
		isLogin(state) {
			return state.isLogin;
		},
		user(state) {
			return state.userinfo;
		}
	},
	mutations: {
		login(state, {
			token,
			userInfo,
			tokenExpired
		}) {
			uni.setStorageSync('uniIdToken', token);
			uni.setStorageSync('uniIdTokenExpired', tokenExpired);
			uni.setStorageSync('userinfo', userInfo);
			state.userinfo = userInfo;
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		logout(state) {
			state.userinfo = {};
			uni.removeStorageSync('uniIdToken')
			uni.removeStorageSync('uniIdTokenExpired')
			uni.removeStorageSync('userinfo')
			console.log('logout');
			uni.navigateTo({
				url: '/pages/auth/login/login'
			})
		}
	},
	actions: {
		login(state, params) {
			state.commit('login', params)
		},
		logout(state) {
			state.commit('logout')
		}
	}

}
export default auth;