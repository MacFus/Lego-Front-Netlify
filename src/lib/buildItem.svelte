<script>
	import { createEventDispatcher } from 'svelte';
	import { fetchSetWithParts, fetchUserSetParts } from '$lib/api.js';
	import { getCookie } from '$lib/cookie.js';
	import { writable } from 'svelte/store';
    import {
		processParts,
		combinePartsFromSetsNoSpare,
		combinePartsFromSets,
		combinePartsFromSetsNoSpareWithColors,
		combinePartsFromSetsWithColors,
		matchParts,
		mapToArray,
        processSubstituteParts
	} from '$lib/match.js';

	export let set = [];
    export let ignoreColors;
    export let allowSubstitute;

    const dataLoaded = writable(false);
    const dispatch = createEventDispatcher();

	let embeddedSets = [];
	let parts,
		myParts,
		processed,
		match,
		tableItems,
		owned = 0;

	let setNum = set.setNum,
		percentage = 72.1;


	async function load() {
		const parts = await fetchSetWithParts(setNum);
		const userId = getCookie('UserId');
		const mySets = await fetchUserSetParts(userId);
		const data = {
			combinedParts: mySets,
			parts: parts
		};
		return data;
	}

	$: if (setNum) {
		load()
			.then((data) => {
				if (data) {
					console.log('W build do set: ', setNum);
					calcMatch(data);
                    dataLoaded.set(true);
				}
			})
			.catch((error) => {
				console.error('Error loading data:', error);
			});
	}

	function calcMatch(data) {
		parts = data.parts;
		let length = parts?.sets?.length;
		if (length > 1) {
			embeddedSets = parts.sets.slice(1);
			hasEmbedded.set(true);
		}
		processed = processParts(parts);
		myParts = data.combinedParts;
		let combinedParts, combinedMyParts;
		if (ignoreColors) {
			owned = 0;
			combinedParts = combinePartsFromSetsNoSpare(parts);
			combinedMyParts = combinePartsFromSets(myParts);
		} else {
			owned = 0;
			combinedParts = combinePartsFromSetsNoSpareWithColors(parts);
			combinedMyParts = combinePartsFromSetsWithColors(myParts);
		}

		if (allowSubstitute) {
			const subs = processSubstituteParts(combinedParts, data.parts.substitutes, ignoreColors);
			match = matchParts(combinedParts, combinedMyParts, subs, allowSubstitute);
		} else {
			match = matchParts(combinedParts, combinedMyParts, null, null);
		}

		tableItems = mapToArray(match);
		tableItems.forEach((part) => {
			owned += part.owned;
		});
	}

	function displaySet() {
		dispatch('displaySet', { setNum });
	}
</script>

{#if $dataLoaded}
	{#if set}
		<div class="main-container">
			<div class="img-container">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img src={set.imgUrl} alt="IMG NOT FOUND" id="imgId" on:click={displaySet} />
			</div>
			<div class="second-container">
				<div class="match-container">
					<div class="match-text">{(owned/processed.partsQuantity * 100).toFixed(2)}%</div>
				</div>
				<div class="missing-container">
					<div>Missing: {processed.partsQuantity - owned} of {processed.partsQuantity} parts</div>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="name-container" on:click={displaySet}>{set.name}</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		height: 15rem;
		width: 13rem;
		justify-content: space-between;
		margin: 20px 20px;
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
		height: 40%;
		padding: 0px 5px;
	}
	.match-container {
		font-weight: 700 !important;
		font-size: 30px;
		color: #28a4c9;
		font-family: Arial, Helvetica, sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.img-container {
		width: 100%;
		height: 60%;
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

	.missing-container {
		color: #8ab933;
		padding: 5px;
		font-size: 15px;
		display: flex;
		justify-content: center;
	}
</style>
