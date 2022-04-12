<script>
	import { browser } from '$app/env';

	import { goto } from '$app/navigation';
	import Login from './Login.svelte';
	if (browser) {
		if (localStorage.getItem('token') !== null) {
			goto('/jobs');
		}
	}
</script>

<Login />
