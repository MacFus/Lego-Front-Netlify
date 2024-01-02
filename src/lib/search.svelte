<script>
	import { onMount } from 'svelte';
	import { fetchThemes } from '$lib/api.js';
	import { createEventDispatcher } from 'svelte';
	import { minifigSearch, hasPrevious, hasNext, pageNumber } from '$lib/store.js';

	export let plcHolder = 'Search for LEGO Sets';
	export let themes = [];

	let search, sYear, eYear, min, max, theme;
	let direction, sortField, pageSize;

	const dispatch = createEventDispatcher();

	function searchResults(){
		pageNumber.set(0);
		sendDataToParent()
	}

	function sendDataToParent() {
		let sortBy = sortField,
			dir = direction,
			pgSize = pageSize;

		let params = {};
		if (pgSize !== undefined) params.pageSize = pgSize;
		if (sortBy !== undefined) params.sortBy = sortBy;
		if (dir !== undefined) params.dir = dir;

		if (search !== undefined) params.search = search;
		if (sYear !== undefined) params.sYear = sYear;
		if (eYear !== undefined) params.eYear = eYear;
		if (min !== undefined) params.min = min;
		if (max !== undefined) params.max = max;
		if (theme !== '') params.theme = theme;
		dispatch('sendData', { params });
	}

	export function nextPage() {
		pageNumber.update((n) => n + 1);
		sendDataToParent();
	}

	export function prevPage() {
		pageNumber.update((n) => n - 1);
		sendDataToParent();
	}
</script>

<div class="main-container">
	<div class="container">
		<div class="search-container">
			<input bind:value={search} type="text" class="search-input" placeholder={plcHolder} />
			<button on:click={searchResults} class="search-btn"
				><p class="search-text">Search</p></button
			>
		</div>
		<div class="second-container">
			<div class="left-container">
				<label for="" class="labels">Year of Release:</label>
				<div class="year-container">
					<div class="from-year">
						<label for="" class="first-el">From</label>
						<input bind:value={sYear} type="text" class="second-el" placeholder="1945" />
					</div>
					<div class="from-year">
						<label for="" class="first-el">To</label>
						<input bind:value={eYear} type="text" class="second-el" placeholder="2024" />
					</div>
				</div>
			</div>
			<div class="right-container">
				<label for="" class="labels">Number of Parts:</label>
				<div class="year-container">
					<div class="from-year">
						<label for="" class="first-el">From</label>
						<input bind:value={min} type="text" class="second-el" placeholder="0" />
					</div>
					<div class="from-year">
						<label for="" class="first-el">To</label>
						<input bind:value={max} type="text" class="second-el" placeholder="No Limit" />
					</div>
				</div>
			</div>
		</div>
		<div class="search-container theme-container">
			<select bind:value={theme} name="theme" id="" class="select-input">
				<option value="" disabled selected>Select Theme</option>
				{#each themes as theme}
					<option value={theme}>{theme}</option>
				{/each}
			</select>
			<button on:click={searchResults} class="theme-btn"
				><p class="search-text">Search</p></button
			>
		</div>
	</div>
	<div class="sort-container">
		<div class="sort-left-container">
			<select bind:value={sortField} class="sortBy">
				{#if $minifigSearch}
					<option value="name" selected>Name</option>
					<option value="num_parts">Num Parts</option>
				{:else}
					<option value="name" selected>Name</option>
					<option value="year">Year</option>
					<option value="num_parts">Num Parts</option>
					<option value="set_num">Set Num</option>
				{/if}
			</select>
			<select bind:value={direction} class="dir">
				<option selected>ASC</option>
				<option>DESC</option>
			</select>
		</div>
		<div class="sort-right-container">
			<select bind:value={pageSize} class="offsize">
				<option selected>20</option>
				<option>50</option>
				<option>100</option>
				<option>200</option>
			</select>
			{#if $hasPrevious}
				<button on:click={prevPage} class="prev-btn">&lt; Prev</button>
			{/if}
			{#if $hasNext}
				<button on:click={nextPage} class="next-btn">Next &gt;</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.main-container {
		background-color: #ffffff;
		padding: 20px;
	}
	.container {
		display: flex;
		flex-direction: column;
		width: max-content;
		background-color: #f5f5f5;
		color: #666666;
		padding: 10px;
		font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
		font: 14px !important;
		border: solid 2px #ddd;
	}
	.search-container {
		display: flex;
		background-color: #f5f5f5;
		width: 65vw;
		padding: 10px;
	}
	.search-container input {
		padding: 10px;
		background-color: #ffffff;
	}
	.search-text {
		font-size: 10px;
	}

	input select {
		background-color: #ffffff;
	}
	button {
		color: #ffffff;
		font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.search-input {
		width: 90%;
		border: 2px solid #ddd;
		border-right: none;
		padding: 3px;
		background-color: #fff;
	}
	.search-btn {
		width: 10%;
		background-color: #7ea92f;
		margin: 0px;
		padding: 0px;
		border: 1px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		transition: background-color 0.3s ease;
	}
	.search-btn:hover {
		background-color: #6b8d26;
		cursor: pointer;
	}

	.search-btn:active {
		transform: scale(0.98); /* Slightly scale down the div when clicked */
	}
	input {
	}
	.second-container {
		display: flex;
		flex-direction: row;
		gap: 15px;
		background-color: #f5f5f5;
		padding: 5px;
	}

	.left-container {
		width: 50%;
		margin-left: 10px;
		font: 14px;
	}
	.right-container {
		width: 50%;
		margin-right: 10px;
	}
	.year-container {
		display: grid;
		width: 100%;
		gap: 10px;
	}
	.first-el {
		width: 25%;
		margin-right: 5px;
	}
	.second-el {
		width: 70%;
		font-size: small;
	}
	.labels {
		position: relative;
		bottom: 8px;
	}
	.from-year {
		display: flex;
		justify-content: end;
		align-items: center;
	}
	.theme-container {
		justify-content: space-between;
	}
	.theme-btn:hover {
		background-color: #6b8d26;
		cursor: pointer;
	}

	.theme-btn:active {
		transform: scale(0.98); /* Slightly scale down the div when clicked */
	}

	label {
		font-size: small;
	}
	.select-input {
		width: 70%;
		border: 2px solid #ddd;
		padding: 3px;
		background-color: #fff;
	}
	.theme-btn {
		width: 10%;
		background-color: #7ea92f;
		margin: 0px;
		padding: 0px;
		border: 1px;
		border-radius: 4px;
		transition: background-color 0.3s ease;
	}
	.sort-container {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		width: 65vw;
		padding-left: 20px;
	}
	select:hover,
	button:hover {
		cursor: pointer;
	}
	.sort-container button {
		color: #333333;
	}
	.sort-left-container select {
		padding: 5px;
	}
	.sort-right-container select,
	button {
		padding: 5px;
		background-color: #fff;
	}
	.sort-right-container select {
		padding: 5px;
		margin-right: 15px;
	}
	.sort-left-container {
		padding: 10px;
		margin-right: auto;
	}
	.sort-right-container {
		padding: 10px;
	}
	input,
	select,
	button {
		border: solid 2px #ddd;
	}
</style>
