<script>
	import { browser } from '$app/env';

	import { goto } from '$app/navigation';

	if (browser) {
		if (localStorage.getItem('token') !== null) {
			goto('/jobs');
		}else{
			goto('/login');
		}
	}
</script>