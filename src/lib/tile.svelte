<script>
	import { createEventDispatcher } from 'svelte';

	export let set = [];
	export let img;
	export let quantity;
	export let id;
	let setNum = set.setNum;
	const dispatch = createEventDispatcher();

	function displaySet() {
		dispatch('displaySet', { id });
	}
</script>

{#if set}
	<div class="main-container">
		<div class="img-container">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img src={img} alt="IMG NOT FOUND" id="imgId" on:dblclick={displaySet} />
		</div>
		<div class="second-container">
			{#if quantity}
				<div class="name-container" on:dblclick={displaySet}>{quantity} x {id}</div>
			{:else}
				<div class="name-container" on:dblclick={displaySet}>{id}</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		width: 97px;
		min-height: 114px;
		/* margin: 5px 4px; */
		border: solid 2px #ddd;
		background-color: #ffffff;
		align-items: center;
		justify-content: center;
	}

	.main-container:hover {
		border: solid 2px #7ea92f;
	}
	.name-container {
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 75%;
		color: #8ab933;
		padding: 0px 5px;
		font-family: 'Lato', sans-serif;
	}

	.name-container:hover {
		/* overflow: visible; */
		/* white-space: normal; */
		background-color: rgba(255, 255, 255, 0.9);
		color: #7ea92f;
		cursor: pointer;
	}

	.second-container {
		height: 30%;
		display: flex;
		align-items: center;
		margin: 0;
		font-weight: 500;
	}
	.img-container {
		width: 100%;
		display: flex;
		justify-content: center;
		max-width: 100%;
		max-height: 70%;
		cursor: pointer;
	}
	/* .main-container img-container img {
		width: 30rem;
	} */
	#imgId {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
