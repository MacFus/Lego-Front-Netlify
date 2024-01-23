<script>
	// import { authenticated } from '$lib/auth';
	import { isLoggedIn, mySetsParts } from '$lib/store.js';
	import { onMount } from 'svelte';
	import { fetchUserDetails, fetchUserSetParts } from '$lib/api.js';
	import { localStorageStore } from '$lib/store.js';
	let message = '';

	let myStoredValue;

	$: {
		if (typeof window !== 'undefined') {
            myStoredValue = localStorage.getItem('isLoggedIn')
        }
		// myStoredValue = localStorageStore('isLoggedIn', 'true');
		if(myStoredValue != undefined){
			isLoggedIn.set(true)
			message = `You are logged in. Congrats!`;
			fetchUserDetails().then(response => {console.log(response)});
		}else{
			message = `You are NOT logged in!`;
		}
	}

	// onMount(async () => {
	// 	myStoredValue = localStorageStore('isLoggedIn');
	// 	if ($myStoredValue) {
	// 		message = `You are logged in. Congrats!`;
	// 		const response = await fetchUserDetails();
	// 		// const sets = await fetchUserSetParts();
	// 		// const combinedParts = combinePartsFromSets(sets);
	// 		// mySetsParts.set(combinedParts);
	// 	} else {
	// 		message = `You're not logged in`;
	// 	}
	// });

	
</script>

<div class="index">
	<h1 class="status">{message}</h1>

	<h1>Hello and welcome to my site!</h1>
</div>

<style>
	.index {
		display: block;
		text-align: center;
		margin: 20px auto;
	}

	.status {
		color: red;
	}
</style>
