<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { isLoggedIn } from '$lib/store.js';
	import { fetchUserSetParts, removeSets, addSet } from '$lib/api.js';
	import { getCookie } from '$lib/cookie.js';
	import SetItem from '../../lib/setItem.svelte';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	const data = writable(null);
	const isLoaded = writable(false);
	const dispatch = createEventDispatcher();
	let myStoredValue;
	let selectedSets = [];

	$: {
		if (typeof window !== 'undefined') {
			myStoredValue = localStorage.getItem('isLoggedIn');
		}
	}

	onMount(async () => {
		try {
			const userId = getCookie('UserId');
			const mySets = await fetchUserSetParts(userId);
			data.set(mySets);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});

	async function displaySet(event) {
		const pathVariables = event.detail.setNum;
		goto(`/sets/${pathVariables}`);
	}

	function toggleSelection(setNum) {
		const index = selectedSets.indexOf(setNum);
		if (index === -1) {
			selectedSets = [...selectedSets, setNum]; // Add if not present
		} else {
			selectedSets = selectedSets.filter((num) => num !== setNum); // Remove if already present
		}
	}

	async function addSetToUser() {
        const response = await addSet(selectedSets);
		location.reload();
    }
	async function removeSelectedSets() {
		const response = await removeSets(selectedSets, false);
		location.reload();
	}
	async function removeAllSets() {
		const response = await removeSets(selectedSets, true);
		location.reload();
	}
</script>

<div class="main">
	{#if myStoredValue && $data}
		<div class="yellow-container">
			<div class="header-container">
				<div class="header">
					<p>My LEGO Collection</p>
				</div>
			</div>
		</div>
		<div class="sets-container">
			<div class="header">
				<p>Your sets:</p>
			</div>
			<div class="tiles-container">
				<!-- svelte-ignore a11y-click-events-have-key-events -->

				<div class="result-wrapper">
					<div class="result-container">
						{#each $data.sets as set}
							<div
								class:selected={selectedSets.includes(set.setNum)}
								on:click={() => toggleSelection(set.setNum)}
							>
								<SetItem {set} quantity={set.quantity} on:displaySet={displaySet} />
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="actions">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="action-btn" on:click={removeSelectedSets}>
					<p>Remove Sets (quantity - 1)</p>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="action-btn" on:click={removeAllSets}>
					<p>Remove All Selected Sets From My Sets Collection</p>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="action-btn" on:click={addSetToUser}>
					<p>Add Sets (quantity + 1)</p>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.yellow-container {
		background-color: #ece288;
		color: #414141;
		width: 100%;
		/* height: 40px; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.sets-container {
		color: #414141;
		width: 70vw;
		/* height: 40px; */
	}
	.selected {
		border: solid 2px #7ea92f;
	}
	.tiles-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
		gap: 10px;
		height: max-content;
		align-content: center;
		justify-items: center;
		justify-content: center;
	}

	.header-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-content: center; */
		width: 70%;
		justify-content: space-between;
	}
	.header p {
		font-size: 26px;
		margin: 5px 0px 2px 0px;
	}
	.actions {
		display: flex;
		justify-content: center;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.action-btn {
		background-color: #ffffff;
		padding: 3px 10px;
		font-size: 16px;
		margin: 0px 10px;
		border: 2px solid #adadad;
		border-radius: 5px;
		cursor: pointer;
	}
	.action-btn:hover {
		background-color: #e6e6e6;
	}
	.action-btn:active {
		transform: scale(0.98);
	}
	.result-wrapper {
		display: flex;
		flex-direction: column;
		width: max-content;
		height: max-content;
		/* align-items: center; */
		/* justify-content: center; */
		background-color: #ffffff;
	}
	.result-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 10px;
		height: max-content;
		width: 70vw;
		align-content: center;
		justify-items: center;
	}
</style>
