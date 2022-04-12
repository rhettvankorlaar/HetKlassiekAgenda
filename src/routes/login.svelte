<script lang="ts">
	import { userCredentials, getUserInfo } from '$lib/stores/UserInfoStore';
	import type { LoginRequest } from 'src/types/LoginRequest';
	import { goto } from '$app/navigation';

	let loginRequest: LoginRequest = {
		username: '',
		password: '',
		user_type: 'app_ambassador_user'
	};

	const handleLogin = () => {
		console.log(loginRequest);
		if (loginRequest.username.length > 0 && loginRequest.password.length > 0) {
			getUserInfo(loginRequest);
			goto('/jobs');
		}
	};
</script>

<form on:submit|preventDefault={handleLogin}>
	<label for="username">Username</label>
	<input
		type="username"
		id="username"
		name="username"
		bind:value={loginRequest.username}
		autocomplete="username"
	/>

	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		bind:value={loginRequest.password}
		autocomplete="current-password"
	/>

	<button type="submit">Login</button>
</form>
