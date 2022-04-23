<template>
	<div class="w-full max-w-screen-sm mx-auto bg-gray-100 rounded-2xl px-4 sm:px-8 py-4 shadow-lg drop-shadow-lg py-6">
		<h1 class="text-center text-3xl">Confirm Birb Transfer</h1>

		<div class="flex justify-center my-12">
			<div class="">
				<span class="font-semibold text-xl">#{{ props.birb.token_id }}</span>
				<img :src="props.birb.image_preview_url" class="rounded-xl mx-auto">
			</div>
		</div>

		<div class="sm:text-center space-y-2">
			<p>
				<span class="sm:text-xl font-semibold">From: </span>
				<span class="text-sm sm:hidden font-mono block">
					{{ `${props.src.substr(0, 12)}...${props.src.substr(-10)}` }}
				</span>
				<span class="text-sm hidden sm:inline font-mono">{{ props.src }}</span>
			</p>
			<p>
				<span class="sm:text-xl font-semibold">To: </span>
				<span class="text-sm sm:hidden font-mono block">
					{{ `${props.dest.substr(0, 12)}...${props.dest.substr(-10)}` }}
				</span>
				<span class="text-sm hidden sm:inline font-mono">{{ props.dest }}</span>
			</p>
		</div>

		<div class="my-6">
			<button
				class="block w-full bg-green-600 text-white text-xl rounded-lg py-3 shadow hover:bg-green-500 hover:shadow-none
				disabled:bg-gray-300 disabled:text-gray-400 hover:disabled:shadow"
				:disabled="props.awaitingSignature"
				@click="send">
				Send it
			</button>
		</div>

		<div class="text-center">
			<a href="#" class="text-slate-600 hover:text-slate-500"
				@click="close">
				Cancel
			</a>
		</div>
	</div>
</template>
<script>
export default {
	props: ['birb', 'src', 'dest', 'awaitingSignature'],
	emits: ['send', 'close'],
	setup(props, { emit: $emit }) {
		function send() {
			$emit('send');
		}

		function close() {
			$emit('close');
		}

		return {
			props,
			send,
			close,
		}
	}
}
</script>
