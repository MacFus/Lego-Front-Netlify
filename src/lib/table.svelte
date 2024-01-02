<script>
	export let parts;
	export let ownedParts, missingParts, noneParts, ignoreColors, allowSubstitute;
	let owned, required;
	// Funkcja do klasyfikacji części
	function getClass(part) {
		if (part.owned == part.quantity) {
			return 'all';
		} else if (part.owned < part.quantity && part.owned != 0) {
			return 'missing';
		} else if (part.owned == 0) {
			return 'none';
		}
	}

	// Reaktywne filtrowanie części
	$: filteredParts = parts.filter((part) => {
		const classType = getClass(part);
		return (
			(ownedParts && classType === 'all') ||
			(missingParts && classType === 'missing') ||
			(noneParts && classType === 'none')
		);
	});
</script>

<table id="parts">
	<thead>
		<tr class="table-header">
			{#if ignoreColors}
				<th>ID</th>
				<th>Part Image</th>
				<th>Part Number</th>
				{#if allowSubstitute}
					<th>Substitute Number</th>
				{/if}
				<th>Parts </th>
				<th>Missing </th>
			{:else}
				<th>ID</th>
				<th>Part Image</th>
				<th>Part Number</th>
				{#if allowSubstitute}
					<th>Substitute Number</th>
				{/if}
				<th>ColorId</th>
				<th>Color</th>
				<th>Parts </th>
				<th>Missing </th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each filteredParts as part, index}
			<tr class={getClass(part)}>
				<!-- svelte-ignore a11y-img-redundant-alt -->

				{#if ignoreColors}
					<td>{index + 1}</td>
					<td
						><img src={part.part_img_url} alt="No IMG found" style="width: 50px; height: auto;" />
					</td>
					<td>{part.part_num}</td>
					{#if allowSubstitute}
						<td>{part.substitute}</td>
					{/if}
					<td>{part.owned}/{part.quantity}</td>
					<td>{part.quantity - part.owned}</td>
				{:else}
					<td>{index + 1}</td>
					<td
						><img src={part.part_img_url} alt="No IMG found" style="width: 50px; height: auto;" />
					</td>
					<td>{part.part_num}</td>
					{#if allowSubstitute}
						<td>{part.substitute}</td>
					{/if}
					<td>{part.colorId}</td>
					<td>{part.color}</td>
					<td>{part.owned}/{part.quantity}</td>
					<td>{part.quantity - part.owned}</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	#parts {
		font-family: Arial, Helvetica, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	#parts td {
		border: 1px solid #ddd;
		text-align: center;
	}
	#parts th {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: center;
		background-color: rgb(138, 185, 51);
		color: white;
	}

	/* #parts tr:nth-child(even) {
		background-color: #f2f2f2;
	} */

	#parts tr:hover {
		background-color: #e0e0e0; /* Change background color on hover */
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
	}
	#parts tr {
		transition: background-color 0.3s ease, box-shadow 0.3s ease;
	}
	tr {
		display: none;
	}
	.all {
		background-color: rgb(105, 212, 105);
	}
	.missing {
		background-color: rgba(231, 219, 104, 0.829);
	}
	.none {
		background-color: rgba(121, 40, 40, 0.801);
	}

	tr.missing,
	tr.none,
	tr.all {
		display: table-row;
	}
	.table-header {
		display: table-row;
	}
</style>
