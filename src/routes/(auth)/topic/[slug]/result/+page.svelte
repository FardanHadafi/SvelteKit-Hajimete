<script lang="ts">
	let { data } = $props();
	
	const result = $derived(data.result || {});
	const correct = $derived(result.correct || 0);
	const total = $derived(result.total || 0);
	const percentage = $derived(total > 0 ? Math.round((correct / total) * 100) : 0);
</script>

<main class="flex min-h-screen items-center justify-center bg-gray-50 p-8">
	<div class="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-xl">
		<div class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-4xl">
			🎉
		</div>

		<h1 class="mb-2 text-3xl font-bold text-gray-900">Session Completed!</h1>
		<p class="mb-8 text-gray-500">You've finished your learning session.</p>

		<div class="mb-8 rounded-xl bg-gray-50 p-6">
			<div class="mb-2 text-sm font-medium text-gray-500 uppercase tracking-wider">Your Score</div>
			<div class="text-5xl font-black text-indigo-600">
				{percentage}%
			</div>
			<div class="mt-2 text-sm text-gray-500">
				{correct} correct out of {total}
			</div>
		</div>

		<a
			href="/topic"
			class="inline-block w-full rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-indigo-200"
		>
			Back to Topics
		</a>
	</div>
</main>
