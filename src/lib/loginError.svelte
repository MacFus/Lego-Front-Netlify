<script>
	import { clearCookies } from "$lib/cookie.js";
    import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
    onMount(async () => {
        clearCookies();
		goto("/");
    })

</script>

<div class="login-message">
	<h2>Access Restricted</h2>
	<p>
		Nie jesteś zalogowany. Aby otrzymać dostęp do tej funkcjonalności proszę zaloguj się do serwisu.
	</p>
	<h2>Dostępne Funkcjonalności:</h2>
	<ul>
		<li>Wyszukiwanie zestawów</li>
		<li>Przeglądanie figurek</li>
		<li>Dodawanie zestawów do swojego konta</li>
		<li>Sprawdzanie, ile procent zestawu możesz złożyć</li>
	</ul>
</div>

<style>
	.login-message {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 20px;
		max-width: 400px;
		margin: 20px auto;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		font-family: Arial, sans-serif;
		background-color: #f9f9f9;
	}

	h2 {
		color: #333;
		margin-bottom: 10px;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 5px;
		font-size: 14px;
		color: #555;
	}

	li:before {
		content: '•';
		color: #007bff;
		font-weight: bold;
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
</style>
