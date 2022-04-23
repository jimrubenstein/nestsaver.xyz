<template>
	<div class="w-full max-w-screen-sm mx-auto bg-gray-100 rounded-2xl px-4 sm:px-8 py-4 shadow-lg drop-shadow-lg py-6">
		<h1 class="text-center text-4xl">Hoot!</h1>

		<div class="flex justify-center my-8">
			<div class="">
				<i class="fas fa-circle-exclamation fa-7x text-red-500 "></i>
			</div>
		</div>

		<div class="text-center text-xl leading-relaxed my-4">
			There was an error!
			<br>
			Check your selected wallet, refresh the page, and try again.
		</div>

		<div class="my-4 text-center text-lg">
			<button class="bg-slate-600 text-white px-6 py-2 text-lg rounded-lg hover:bg-slate-500 shadow hover:shadow-none"
				@click="close"
			>Close</button>
		</div>

	</div>
</template>
<script>
export default {
	props: ['birb', 'src', 'dest'],
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
