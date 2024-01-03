<script>
	import { hasContext, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		isLoggedIn,
		isLoading,
		minifigSearch,
		hasNext,
		hasPrevious,
		pageNumber,
		loadedSets
	} from '$lib/store.js';
	import Search from '$lib/search.svelte';
	import BuildItem from '$lib/buildItem.svelte';
	import { fetchThemes, fetchSetsWithCriteria } from '$lib/api.js';
	import { writable } from 'svelte/store';
	import LoginError from '$lib/loginError.svelte';

	let themes = [];
	let allowSubstitute, ignoreColors;
	const isLoaded = writable(false);

	onMount(async () => {
		themes = await fetchThemes();
		minifigSearch.set(false);
		pageNumber.set(0);
	});

	async function handleDataFromChild(event) {
		const pathVariables = event.detail.params;

		const { offset, pageSize, ...params } = pathVariables;
		let response = await fetchSetsWithCriteria(params, $pageNumber, pageSize);
		loadedSets.set(response.response);
		isLoaded.set(true);
		if (response.pages > $pageNumber) {
			hasNext.set(true);
		} else {
			hasNext.set(false);
		}
		if ($pageNumber > 0) {
			hasPrevious.set(true);
		} else {
			hasPrevious.set(false);
		}
	}
	async function displaySet(event) {
		const pathVariables = event.detail.setNum;
		goto(`/sets/${pathVariables}`);
	}
</script>

<div class="main">
	{#if $isLoggedIn}
		<div class="search-container">
			<Search on:sendData={handleDataFromChild} {themes} plcHolder="Search for LEGO Sets" />
		</div>
		<div class="block">
			<label>
				<input type="checkbox" bind:checked={allowSubstitute} />
				Allow substitute parts
			</label>
		</div>
		<div class="block">
			<label>
				<input type="checkbox" bind:checked={ignoreColors} />
				Ignore colors
			</label>
		</div>

		<div class:blurred={$isLoading}>
			<div class="result-wrapper">
				{#if $loadedSets}
					<div class="result-container">
						{#each $loadedSets as set}
							<BuildItem {set} {allowSubstitute} {ignoreColors} on:displaySet={displaySet} />
						{/each}
					</div>
				{:else}
					<div class="result-container">NO DATA LOADED</div>
				{/if}
			</div>
		</div>
	{:else}
		<LoginError />
	{/if}
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.search-container {
		padding-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
	}
	.result-wrapper {
		display: flex;
		flex-direction: column;
		width: max-content;
		height: max-content;
		gap: 10px;
		/* align-items: center; */
		/* justify-content: center; */
		background-color: #ffffff;
	}
	.result-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 10px;
		height: max-content;
		width: 70vw;
		align-content: center;
		justify-items: center;
	}
	.loader {
		/* Your loader styles */
	}

	.blurred {
		filter: blur(8px);
	}
	.block{
		width: 60%;
		display: flex;
		justify-content: space-between;
	}
</style>
