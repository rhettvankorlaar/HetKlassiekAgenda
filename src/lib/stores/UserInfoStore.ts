import type { LoginRequest } from 'src/types/LoginRequest';
import type { UserInfo } from 'src/types/UserInfo';
import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/env';

export const userCredentials: Writable<UserInfo> = writable();

export const getUserInfo = async (loginRequest: LoginRequest) => {
	if (localStorage !== null) {
		const res = await fetch('https://backend.fleks.works/api/users/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(loginRequest)
		})
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					return res.json();
				}
				throw new Error('Logging in failed!');
			})
			.then((data) => {
				userCredentials.set({
					uuid: data.results.uuid,
					token: data.results.token
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
};

userCredentials.subscribe((data) => {
	if (data !== undefined && browser) {
		localStorage.setItem('token', data.token);
		localStorage.setItem('uuid', data.uuid);
	}
});
