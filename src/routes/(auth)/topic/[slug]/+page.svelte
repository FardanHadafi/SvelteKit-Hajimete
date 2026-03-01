<script lang="ts">
	import { goto } from '$app/navigation';

	let { data } = $props();

	async function startLearning() {
		await goto(`/topic/${data.topic.slug || data.topic.id}/learn`);
	}
</script>

<main class="min-h-screen bg-gray-50 p-8">
	<h1 class="mb-4 text-3xl font-bold">{data.topic.title}</h1>
	<p class="mb-8 text-gray-600">{data.topic.description}</p>

	<button
		onclick={startLearning}
		class="rounded-xl bg-indigo-600 px-6 py-3 text-white shadow transition hover:bg-indigo-700"
	>
		Start Learning 🚀
	</button>
</main>
