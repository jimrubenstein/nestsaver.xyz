<template>
	<div class="fixed top-0 left-0 right-0
		flex justify-start py-4 px-8
		text-slate-600 border-b border-gray-200 bg-gray-50
		z-10">
		<div class="space-x-4 flex justify-start items-center">
			<router-link :to='{ path: "/" }'>Transfer Moonbird</router-link>
			<!-- <router-link :to='{ path: "/leaderboard" }'>Leaderboard</router-link> -->

		</div>
		<div class="ml-auto space-x-4">
			<input type="tel" maxlength="4" max="9999" min="0"
				v-model="state.birb_lookup"
				@keyup="handleKeyup"
				class="rounded border border-slate-300 shadow text-lg
				px-2 py-1 w-32"
				placeholder="Moonbird ID">
			<button class="bg-slate-300 px-4 py-2 rounded-xl font-semibold hover:bg-slate-300 shadow hover:shadow-none text-slate-600 hover:text-slate-800"
				@click="lookupBirb">
				🦉 &nbsp; Lookup
			</button>
		</div>
		<div v-if="props.wallet"
			class="space-x-4 ml-4 flex items-center">
			<span class="tracking-wider">{{ `${props.wallet.substr(0, 6).toUpperCase().replace('X', 'x')}...${props.wallet.substr(-4).toUpperCase()}` }}</span>
		</div>
	</div>
</template>
<script>
import { reactive } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router';

export default {
	props: ['wallet'],
	setup(props) {
		const state = reactive({
			birb_lookup: null,
		});

		const router = useRouter();

		function handleKeyup(evt) {
			if (evt.key == 'Enter') {
				lookupBirb();
			}
		}

		function lookupBirb() {
			router.push({
				path: `/birb/${state.birb_lookup}`
			});
		}

		return {
			props,
			state,
			handleKeyup,
			lookupBirb,
		}
	}
}
</script>
