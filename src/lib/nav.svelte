<script>
	import { saveCookies, getCookie, clearCookies } from '$lib/cookie.js';
	import { onMount } from 'svelte';
	import { isLoggedIn, localStorageStore, clearLocalStorage } from '$lib/store.js';

	// const myStoredValue = localStorageStore('isLoggedIn');

	let authToken;
	let myStoredValue;

	$: {
		if (typeof window !== 'undefined') {
            myStoredValue = localStorage.getItem('isLoggedIn')
        }
		if(myStoredValue != undefined){
			isLoggedIn.set(true)
		}else{
			isLoggedIn.set(false)
		}
	}

	function logout() {
		clearCookies();
		if (typeof window !== 'undefined') {
			localStorage.removeItem('isLoggedIn');
		}
		location.reload();
	}

	function removeItemFromLocalStorage(key) {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(key);
		}
	}
</script>

<nav class="navigation">
	<div class="container">
		<div class="img">
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src="https://pngimg.com/d/lego_PNG84.png" />
		</div>

		<div class="nav-item home">
			<a href="/" class="nav-link">Home</a>
		</div>
		{#if $isLoggedIn}
			<div class="nav-item">
				<a href="/build" class="nav-link">Build</a>
			</div>
			<div class="nav-item">
				<a href="/sets" class="nav-link">Sets</a>
			</div>
			<div class="nav-item">
				<a href="/minifigs" class="nav-link">Minifigs</a>
			</div>
			<div class="nav-item">
				<a href="/collection" class="nav-link">My LEGO</a>
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={logout} class="nav-item">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-missing-attribute -->
				<a href="/" class="nav-link">Logout</a>
			</div>
		{:else}
			<div class="nav-item">
				<a href="/login" class="nav-link">Login</a>
			</div>
		{/if}
	</div>
</nav>

<style>
	.navigation {
		background-color: #333;
		height: 60px !important;
	}
	.container {
		display: flex;
		align-items: center;
		padding-right: 40px;
	}

	.nav-item {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 13px;
		width: 4rem;
		height: 60px;
		align-content: center;
		transition: background-color 0.3s;
	}
	.nav-item.home {
		margin-right: auto;
	}
	.nav-item:hover {
		background-color: #8ab933;
		cursor: pointer;
	}

	img {
		height: 40px;
	}
	.img {
		padding: 10px;
		vertical-align: middle;
		height: 40px;
		width: 90px;
		/* margin-right: auto; */
	}
	a {
		display: grid;
		place-items: center;
		height: 60px;
		color: white;
		text-decoration: none;
	}
</style>
