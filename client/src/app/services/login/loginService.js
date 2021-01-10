import FuseUtils from '@fuse/utils/FuseUtils';

import axios from 'axios/axios-auth';

class LoginService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Błąd autoryzacji, zostałeś wylogowany.');
						this.setUser(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const id = this.getUserId();

		this.setUser(id);
		this.emit('onAutoLogin', true);
	};

	checkUserUSOS = () => {
		return new Promise((resolve, reject) => {
			axios.get('/loginUsos').then(response => {
				if (response.data) {
					console.log(response.data);
					this.setUser(response.data._id);
					resolve(response.data);
				} else {
					this.logout();
					reject(new Error('Błąd autoryzacji, zostałeś wylogowany.'));
				}
			});
		});
	};

	signWithSession = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`/checkUser`)
				.then(response => {
					if (response.data._id) {
						this.setUser(response.data._id);
						resolve(response.data);
					} else {
						this.checkUserUSOS();
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Błąd autoryzacji, zostałeś wylogowany.'));
				});
		});
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/auth/register', data).then(response => {
				if (response.data.user) {
					this.setUser(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(
					'/login',
					{
						email,
						password
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					if (response.data) {
						this.setUser(response.data._id);
						resolve(response.data);
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	signInWithUSOS = () => {
		window.location.href = 'http://localhost:3001/api/loginUsos/connect';
	};

	setUser = id => {
		if (id) {
			localStorage.setItem('userId', JSON.stringify(id));
		} else {
			localStorage.removeItem('userId');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setUser(null);
	};

	isUserValid = id => {
		if (!id) {
			console.warn('Użytkownik nie jest zalogowany.');
			return false;
		}

		return true;
	};

	getUserId = () => {
		return JSON.parse(localStorage.getItem('userId'));
	};
}

const instance = new LoginService();

export default instance;
