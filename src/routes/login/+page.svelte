<script>
	import { saveCookies } from "$lib/cookie.js";
	import { buildUrl } from "$lib/api.js";
	import { goto } from '$app/navigation';
	import { isLoggedIn, localStorageStore } from '$lib/store.js';

	// $: {
	// 	clearLocalStorage('isLoggedIn')
	// }
	let visibleForm = 'form1';
	let loginActive = 'login-item active',
		registerActive;

	let email = '';
	let firstname = '';
	let password = '';
	let lastname = '';

	async function login() {
		const url = buildUrl('/auth/authenticate');
		const body = { email, password };
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(body)
			});

			if (response.ok) {
				const data = await response.json();
				await saveCookies(data);
				localStorage.setItem('isLoggedIn', JSON.stringify(true));
				goto('/');
			} else {
				console.error('HTTP Error:', response.status);
			}
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	async function register(){
		const url = buildUrl('/auth/register');
		const body = { firstname, lastname, email, password };
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(body)
			});

			if (response.ok) {
				const data = await response.json();
				location.reload();
				goto('/login');
			} else {
				console.info('HTTP Error:', response.status)
			}
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	function toggleForm() {
		visibleForm = visibleForm === 'form1' ? 'form2' : 'form1';
		if (visibleForm === 'form1') {
			loginActive = 'login-item active';
			registerActive = 'login-item';
			email = firstname = password = lastname = '';
		} else {
			loginActive = 'login-item';
			registerActive = ' login-item active';
			email = firstname = password = lastname = '';
		}
	}
</script>

<div class="container">
	{#if visibleForm === 'form1'}
		<div class="banner"><p class="banner-text">Login</p></div>
	{/if}
	{#if visibleForm === 'form2'}
		<div class="banner"><p class="banner-text">Register</p></div>
	{/if}
	<div class="login-header">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a on:click={toggleForm} class={loginActive}>
			<div class="login-item">Sign in</div>
		</a>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a on:click={toggleForm} class={registerActive}>
			<div class="login-item">New account</div>
		</a>
	</div>
	{#if visibleForm === 'form1'}
		<form class="login-form">
			<input bind:value={email} type="email" placeholder="E-mail" />
			<input bind:value={password} type="password" placeholder="Password" />
			<button on:click={login} type="submit" class="login-button">Login</button>
		</form>
	{/if}
	{#if visibleForm === 'form2'}
		<form class="register-form">
			<input bind:value={firstname} type="firstname" placeholder="Firstname" required />
			<input bind:value={lastname} type="lastname" placeholder="Lastname" required />
			<input bind:value={email} type="email" placeholder="E-mail" required />
			<input bind:value={password} type="password" placeholder="Password" required />
			<button on:click={register} type="submit" class="login-button">Register</button>
		</form>
	{/if}
</div>

<!-- <div class="container">
	<ul class="switcher">
        <div class="left-tab">
            <a href="#0" class="selected">Sign in</a>
        </div>
		<div class="right-tab">
            <a href="#0" class="">New account</a>
        </div>
		
	</ul> -->
<!-- <div id="login" class="is-selected">
		<form class="form">
			<p class="fieldset">
				<label class="image-replace email" for="signin-email">E-mail</label>
				<input
					class="full-width has-padding has-border"
					id="signin-email"
					type="email"
					placeholder="E-mail"
				/>
				<span class="error-message">An account with this email address does not exist!</span>
			</p>
			<p class="fieldset">
				<label class="image-replace password" for="signin-password">Password</label>
				<input
					class="full-width has-padding has-border"
					id="signin-password"
					type="password"
					placeholder="Password"
				/>
				<a href="#0" class="hide-password">Show</a>
				<span class="error-message">Wrong password! Try again.</span>
			</p>
			<p class="fieldset">
				<input type="checkbox" id="remember-me" checked="" />
				<label for="remember-me">Remember me</label>
			</p>
			<p class="fieldset">
				<input class="full-width" type="submit" value="Login" />
			</p>
		</form>
		<p class="form-bottom-message"><a href="#0">Forgot your password?</a></p>
	</div> -->
<!-- </div> -->

<style>
	.login-item {
		display: flex;
		align-items: center;
		justify-content: center;
		/* max-height: max-content; */
		text-align: center;
		font-size: 13px;
		height: 30px;
		align-content: center;
		transition: background-color 0.3s;
	}
	a {
		color: black;
		text-decoration: none;
	}
	.formName {
		width: 100%;
		background-color: #999;
		height: 30px;
	}
	p {
		font: 300;
		font-size: large;
		text-align: center;
	}
	.login-item:hover {
		cursor: pointer;
	}

	.container {
		position: relative;
		top: 40px;
		margin: auto;
		background: #f5f5f5;
		width: 400px;
		padding: 10px 20px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		border-radius: 4px;
	}

	.login-header {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 20px;
	}

	.signin-button {
		background-color: aqua;
	}
	.newaccount-button {
		background-color: red;
		border: 2px black;
		font-weight: bold;
		cursor: pointer;
	}

	.register-form input {
		width: 100%;
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.login-form input {
		width: 100%;
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.login-button {
		width: 100%;
		padding: 10px;
		border: none;
		border-radius: 4px;
		background: #d9534f;
		color: white;
		cursor: pointer;
	}

	.banner {
		height: 40px;
		border-radius: 5px;
		background-image: linear-gradient(to right, #9e9e9e, #e0e0e0);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		text-align: center;
		position: relative;
		bottom: 22px;
	}

	.banner-text {
		position: relative;
		z-index: 1;
		color: #333;
		font-size: 2rem;
		font-weight: bold;
		letter-spacing: 1px;
	}

	.active {
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
		transform: translateY(2px);
	}
</style>
