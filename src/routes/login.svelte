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

<h1 class="text-center text-lg">Het Klassiek Event Exporter</h1>
<h2 class="text-center">Login met je Het Klassiek App gegevens</h2>
<div class="container">
	<form
		on:submit|preventDefault={handleLogin}
		class="bg-blue-500 text-center w-1/3 px-3 py-4 text-white mx-auto rounded"
	>
		<label for="username">Username</label>
		<input
			type="username"
			id="username"
			name="username"
			placeholder="Username"
			bind:value={loginRequest.username}
			autocomplete="username"
			class="block w-full mx-auto text-sm py-2 px-3 rounded text-black"
		/>

		<label for="password">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			placeholder="Password"
			bind:value={loginRequest.password}
			autocomplete="current-password"
			class="block w-full mx-auto text-sm py-2 px-3 rounded my-3 text-black"
		/>

		<button
			type="submit"
			class="bg-blue text-white font-bold py-2 px-4 rounded border block mx-auto w-full"
			>Login</button
		>
	</form>
</div>
