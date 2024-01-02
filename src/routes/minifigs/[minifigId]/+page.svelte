<script>
	import { goto } from '$app/navigation';
	import { hasEmbedded, isLoggedIn } from '$lib/store.js';
	import { addSet } from '$lib/api.js';
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
	import Tile from '$lib/tile.svelte';
	import Table from '$lib/table.svelte';
	import LoginError from '$lib/loginError.svelte';

	let embeddedSets = [];
	let minifig,
		sets,
		parts,
		processed = 0,
		tableItems,
		owned = 0;
	let ownedParts = true,
		missingParts = false,
		noneParts = false,
		ignoreColors = true,
		allowSubstitute = true;
	export let data;
	let myStoredValue;

	$: {
		if (typeof window !== 'undefined') {
			myStoredValue = localStorage.getItem('isLoggedIn');
		}
		if (myStoredValue != undefined) {
			// new Promise(resolve => setTimeout(resolve, 1000));
			isLoggedIn.set(true);
			minifig = data.minifig;
			sets = data.sets;
			parts = data.parts;
			console.log('data', data);
			processed = processMinifigParts();
			// calcMatch(data, ignoreColors, allowSubstitute, match, owned, processed, tableItems);
		} else {
			console.log('niezalogowany');
		}
	}

	function processMinifigParts(){
		let total = 0;
		parts.forEach((p) => {
			total += p.quantity;
				});
				return total;
	}

	function calcMatch() {
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

	async function displaySet(event) {
		const pathVariables = event.detail.id;
		goto(`/sets/${pathVariables}`);
	}

	let isSpareOpen = false,
		isStandardOpen = false,
		isBuildOpen = false;

	function toggleSpare() {
		isSpareOpen = !isSpareOpen;
	}
	function toggleBuild() {
		isBuildOpen = !isBuildOpen;
	}
	function toggleStandard() {
		isStandardOpen = !isStandardOpen;
	}

	async function addSetToUser() {
		let setNum = [data.parts.sets[0].setNum];
		const response = await addSet(setNum);
		location.reload();
	}
</script>

<div class="main">
	{#if $isLoggedIn}
		<div class="yellow-container">
			<div class="header-container">
				<div class="header">
					<p>LEGO SET {minifig.figNum} - {minifig.name}</p>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="left-container">
				<div class="img-container">
					<img src={minifig.imgUrl} alt="NO IMG FOUND" />
				</div>
				<div class="details-container">
					<div class="section-header"><h4>Sets</h4></div>
					<div class="section-text">
						<p>This figure appears in the following Sets:</p>
					</div>
					<div class="tiles-container">
						{#each sets as set}
							<div class="tile">
								<Tile
									img={set.imgUrl}
									id={set.setNum}
									on:displaySet={displaySet}
								/>
							</div>
						{/each}
					</div>
					<details>
						<summary on:click={toggleStandard}>
							<div class="section-header">
								<h4>Standard Parts</h4>
								<h4 class="toggle-sign">{isStandardOpen ? '-' : '+'}</h4>
							</div>
						</summary>
						<div class="section-text">
							<p>
								There are <span>{parts.length}</span> parts in this inventory, with
								<span>{processed}</span> total quantity.
							</p>
						</div>
						<div class="tiles-container">
							{#each parts as part}
								<div class="tile">
									<Tile img={part.part_img_url} quantity={part.quantity} id={part.part_num} />
								</div>
							{/each}
						</div>
					</details>
					<!-- <details>
							<summary on:click={toggleSpare}>
								<div class="section-header">
									<h4>Spare Parts</h4>
									<h4 class="toggle-sign">{isSpareOpen ? '-' : '+'}</h4>
								</div>
							</summary>
							<div class="section-text">
								<p>
									There are <span>{processed.spareParts.length}</span> parts in this inventory, with
									<span>{processed.spareQuantity}</span> total quantity. These spare parts are not required
									to build this set. If you own this set, they will be included in your parts list when
									considering other sets than can be built.
								</p>
							</div>
							<div class="tiles-container">
								{#each processed.spareParts as part}
									<div class="tile">
										<Tile img={part.part_img_url} quantity={part.quantity} id={part.part_num} />
									</div>
								{/each}
							</div>
						</details>
						<details>
							<summary on:click={toggleBuild}>
								<div class="section-header">
									<h4>Build Percentage</h4>
									<h4 class="toggle-sign">{isBuildOpen ? '-' : '+'}</h4>
								</div>
							</summary>
							<div class="section-text">
								<div class="block">
									<label>
										<input type="checkbox" bind:checked={ownedParts} />
										Show Owned Parts
									</label>
									<label>
										<input type="checkbox" bind:checked={missingParts} />
										Show Partly Missing Parts
									</label>
								</div>
								<div class="block">
									<label>
										<input type="checkbox" bind:checked={noneParts} />
										Show Missing Parts
									</label>
									<label>
										<input type="checkbox" bind:checked={ignoreColors} />
										Ignore colors
									</label>
								</div>
								<div class="block">
									<label>
										<input type="checkbox" bind:checked={allowSubstitute} />
										Allow substitute parts
									</label>
								</div>

								<p>
									There are <span>{processed.requiredParts.length}</span> parts in this inventory,
									with
									<span>{processed.partsQuantity}</span> total quantity.
								</p>
							</div>
							<div class="tiles-container">
								<div class="table">
									<Table
										parts={tableItems}
										{ownedParts}
										{missingParts}
										{noneParts}
										{ignoreColors}
										{allowSubstitute}
									/>
								</div>
							</div>
						</details> -->
				</div>
			</div>
			<div class="right-container">
				<!-- Set INFO -->
				<div class="set-info">
					<div class="setname">
						<h3>{minifig.figNum}</h3>
					</div>
					<div class="setinfo-columns">
						<div class="setinfo-row">
							<div class="setinfo-label">
								<p>Name</p>
							</div>
							<div class="setinfo-value">
								<p>{minifig.name}</p>
							</div>
						</div>
						<div class="setinfo-row">
							<div class="setinfo-label">
								<p>Inventory</p>
							</div>
							<div class="setinfo-value">
								<p>{minifig.numParts} parts</p>
							</div>
						</div>
						<div class="setinfo-row">
							<div class="setinfo-label">
								<p>Found In</p>
							</div>
							<div class="setinfo-value">
								<p>{sets.length} sets</p>
							</div>
						</div>
					</div>
				</div>
				<!-- Build PERCENTAGE -->
				<!-- <div class="set-info">
					<div class="buildname">
						<h3>Build this Set</h3>
						<p class="norm-text">You have</p>
						<p class="percentage">{((owned / processed.partsQuantity) * 100).toFixed(2)}%</p>
						<p class="norm-text">of the buildable parts in this Set</p>
						<p class="norm-text">{owned} out of {processed.partsQuantity}</p>
					</div>
				</div> -->
				<!-- ACTIONS -->
				<!-- <div class="set-info">
					<div class="buildname">
						<h3>Actions</h3>
						<div class="action-btn" on:click={addSetToUser}>
							<p>Add Set to My Sets Collection</p>
						</div>
					</div>
				</div> -->
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
	.breadcrumb p {
		font-size: 12px;
		margin: 5px 0px 0px 10px;
		position: relative;
		top: 2px;
	}
	.content {
		width: 70%;
		display: flex;
		/* height: 100%; */
	}
	.left-container {
		width: 70%;
		padding: 10px;
	}
	.img-container {
		display: flex; /* Use flexbox */
		justify-content: center; /* Center horizontally */
		align-items: center; /* Center vertically */
		height: 500px; /* Set a specific height for the container */
	}

	.img-container img {
		max-height: 500px; /* Maximum height for the image */
		width: auto; /* Maintain aspect ratio */
	}
	.right-container {
		width: 30%;
		background-color: rgb(243, 243, 243);
		padding: 10px;
		border-left: 3px solid rgb(138, 185, 51);
		color: #414141;
	}
	.set-info {
		display: grid;
	}
	.setname h3 {
		margin: 0;
	}
	.setname {
		font-size: 20px;
		padding-bottom: 28px;
		padding-top: 10px;
		text-align: center;
		border-bottom: 2px solid #ddd;
	}
	.setinfo-row {
		display: flex;
		width: 100%;
		justify-content: space-between;
		border-bottom: 2px solid #ddd;
		font-size: 15px;
		padding: 5px 0px;
	}
	.setinfo-label {
		width: 30%;
		display: flex;
		align-items: center;
	}
	.setinfo-value {
		width: 70%;
		color: #8ab933;
	}
	.buildname {
		font-size: 20px;
		padding-bottom: 28px;
		padding-top: 10px;
		text-align: center;
		border-bottom: 2px solid #ddd;
	}
	.norm-text {
		margin: 0;
		font-size: 16px;
	}
	.percentage {
		margin: 0;
		color: #28a4c9;
		font-size: 30px;
		margin: 5px 0px;
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
	.details-container {
		border: 3px solid #ddd;
	}
	.tiles-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
		gap: 10px 2px;
		height: max-content;
		align-content: center;
		justify-items: center;
		justify-content: center;
	}
	.tile {
		padding: 0;
	}
	.section-header {
		padding-top: 20px;
		margin: 15px;
		border-bottom: 2px solid rgb(138, 185, 51);
		font-size: 18px;
		color: #414141;
		cursor: pointer;
		display: block;
		width: 100%;
	}
	.section-text {
		margin: 15px;
		margin-top: 10px;
		position: relative;
		display: inline-block;
	}
	.section-header h4 {
		margin: 0;
		margin-top: 10px;
		position: relative;
		display: inline-block;
	}
	span {
		font-weight: 600;
	}

	details {
		user-select: none;
	}

	summary {
		display: flex;
		cursor: pointer;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.table {
		width: 100%;
	}

	.toggle-sign {
		float: right;
		padding-right: 10px;
	}

	summary {
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none; /* Hide the default arrow marker in webkit browsers */
	}
	.block {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
</style>
