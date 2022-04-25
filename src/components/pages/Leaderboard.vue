<template>
	<nav-bar class="sticky" />
	<div class="flex">
		<div>
			<p>Longest Nesters</p>
			<table>
				<thead>
					<tr>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(id, idx) in (new Array(10))">
						<td>
							<p class="text-3xl">{{ 10 - idx }}</p>
						</td>
						<td>
							<p>#1802</p>
							<img src="https://lh3.googleusercontent.com/LQpNI7W-Aqo4zOJgwUZM-4Gf_PPod_-eIU9NxYP3ET9P_BFy8CtX-6keIEJ3pUVzwfO_RUfFrayEPpgiWn7ZI3mHo3Fev7zRILef=s250"
								class="w-20">
							<p>
								<i class="far fa-clock"></i> 2 days
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div>
			<div class="
				px-6 py-4
				text-center text-2xl
				bg-slate-300 rounded-lg">
				<p class="font-semibold">Birbs Nested</p>
				<p class="font-light">8,732</p>
			</div>

			<div class="
				px-6 py-4
				text-center text-2xl
				bg-slate-300 rounded-lg">
				<p class="font-semibold">Birbs Listed</p>
				<div class="group">
					<p class="font-light inline-block">375</p>
					<div class="relative inline-block">
						<i class="far fa-question"></i>
						<div class="group-hover:block absolute text-xs text-left bg-slate-100 p-4 rounded left-full top-0 whitespace-nowrap">
							<p>Opensea: 275</p>
							<p>Looks Rare: 125</p>
							<p>x2y2: 25</p>
							<p>Rarible: 5</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	setup(props) {
		return {
			props,
		}
	}
}
</script>
