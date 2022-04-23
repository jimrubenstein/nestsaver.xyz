<template>
	<div class="bg-gray-100 w-full max-w-screen-sm mx-auto rounded-2xl px-8 py-4 shadow-lg drop-shadow-lg">
		<h1 class="text-center text-3xl">Choose a Birb</h1>

		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
			<div v-for="birb in birbs" :key="`birb-${birb.token_id}`"
				class="group"
				@click="selectBirb(birb.token_id)">
				<img :src="birb.image_preview_url" class="rounded-2xl group-hover:border-[#120E25] border-2 border-transparent cursor-pointer">
				<p class="mx-2">#{{ birb.token_id }}</p>
			</div>
		</div>

		<div v-if="pages > 1"
			class="flex justify-center items-center my-4 space-x-4 text-center">
			<button @click="state.page = Math.max(0, state.page - 1)"
				class="bg-slate-600 text-white px-4 py-1 rounded-lg">
				<i class="fas fa-chevron-left"></i>
			</button>

			<p>
				{{ (state.perPage * state.page) + 1 }}
				thru
				{{ Math.min(props.data.birbs.length, (state.perPage * state.page) + state.perPage) }}
				of
				{{ props.data.birbs.length }}
			</p>

			<button	@click="state.page = Math.min(state.page + 1, pages)"
				class="bg-slate-600 text-white px-4 py-1 rounded-lg">
				<i class="fas fa-chevron-right"></i>
			</button>
		</div>

	</div>
</template>
<script>
import { computed, reactive } from 'vue';
export default {
	props: ['data'],
	emits: ['selectBirb'],
	setup(props, { emit: $emit }) {
		const state = reactive({
			page: 0,
			perPage: 8,
		});

		function selectBirb(tokenID) {
			$emit('selectBirb', tokenID);
		}

		const birbs = computed(() => {
			const start = state.page * state.perPage;
			const end = Math.min(start + state.perPage, props.data.birbs.length);

			return props.data.birbs.slice(start, end);
		});

		const pages = computed(() => {
			return Math.ceil(props.data.birbs.length / state.perPage);
		})

		return {
			props,
			state,
			birbs,
			pages,
			selectBirb,
		}
	}
}
</script>
