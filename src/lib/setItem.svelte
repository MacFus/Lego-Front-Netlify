<script>
	import { createEventDispatcher } from 'svelte';
	export let set = [];
	export let quantity;
	const dispatch = createEventDispatcher();
	let setNum = set.setNum;

	function displaySet() {
		dispatch('displaySet', { setNum });
	}
</script>

{#if set}
	<div class="main-container">
		<div class="img-container">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img src={set.imgUrl} alt="IMG NOT FOUND" id="imgId" on:dblclick={displaySet} />
		</div>
		<div class="second-container">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if quantity}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="name-container" on:dblclick={displaySet}>{quantity} x {set.name}</div>
			{:else}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="name-container" on:dblclick={displaySet}>{set.name}</div>
			{/if}

			<div class="third-container">
				<div class="small-text">{setNum}</div>
				<div class="small-text">({set.numParts} parts)</div>
			</div>
			<div class="third-container">
				<div class="small-text">{set.themeName}</div>
				<div class="small-text">{set.year}</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		height: 15rem;
		width: 10rem;
		justify-content: space-between;
		/* margin: 20px 5px; */
		border: solid 2px #ddd;
		background-color: #ffffff;
	}

	.main-container:hover {
		border: solid 2px #7ea92f;
	}
	.name-container {
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-weight: 550;
		padding: 0px 5px;
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
	}
	.third-container {
		display: flex;
		justify-content: space-between;
	}
	.img-container {
		width: 100%;
		height: 70%;
		display: flex;
		justify-content: center;
		max-width: 100%;
		max-height: 70%;
		cursor: pointer;
	}
	.main-container img-container img {
		width: 30rem;
	}
	#imgId {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
	.small-text {
		font-size: x-small;
		margin-top: 5px;
		padding: 2px 5px;
		font-weight: 500;
	}
</style>
