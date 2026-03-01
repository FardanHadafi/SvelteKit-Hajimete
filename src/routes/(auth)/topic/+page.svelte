<script lang="ts">
	import type { TopicListItem } from '$lib/types/topics';

	const { data } = $props<{
		data: {
			topics: TopicListItem[];
		};
	}>();

	function getPercentage(completed: number, total: number) {
		if (!total) return 0;
		return Math.round((completed / total) * 100);
	}
</script>

<main class="min-h-screen bg-gray-50 p-8">
	<h1 class="mb-8 text-3xl font-bold">Choose Your Topic</h1>

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.topics as topic (topic.id)}
			<a
				href={`/topic/${topic.slug || topic.id}/learn`}
				class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm
				transition duration-300 hover:-translate-y-1 hover:shadow-lg"
			>
				<h2 class="mb-2 text-xl font-semibold">
					{topic.title}
				</h2>

				<p class="mb-4 text-sm text-gray-500">
					{topic.description}
				</p>

				<!-- Progress Text -->
				<div class="mb-2 flex justify-between text-sm">
					<span>Progress</span>
					<span class="font-medium">
						{topic.completed}/{topic.total}
					</span>
				</div>

				<!-- Progress Bar -->
				<div class="h-2 w-full rounded-full bg-gray-200">
					<div
						class="h-2 rounded-full bg-indigo-500 transition-all duration-500"
						style={`width: ${getPercentage(topic.completed, topic.total)}%`}
					></div>
				</div>
			</a>
		{/each}
	</div>
</main>
