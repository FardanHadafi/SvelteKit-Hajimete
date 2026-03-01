<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	// Derived untuk mengakses objek pertanyaan dengan berbagai fallback casing/nesting
	let questionObject = $derived(
		data.question?.question ||
			data.question?.Question ||
			data.question?.data?.question ||
			data.question?.data?.Question
	);

	// Teks pertanyaan dari objek pertanyaan
	let questionText = $derived(
		questionObject?.question ||
			questionObject?.question_text ||
			questionObject?.QuestionText ||
			questionObject?.text ||
			(questionObject ? 'Pertanyaan tanpa teks' : 'Memuat pertanyaan...')
	);

	let answer = $state('');
	let feedback = $derived(form?.error || '');

	// Reset jawaban saat ID pertanyaan berubah
	$effect(() => {
		const qId = questionObject?.questionId || questionObject?.QuestionID;
		if (qId) {
			answer = '';
		}
	});
</script>

<main class="min-h-screen bg-gray-50 p-8">
	<h2 class="mb-6 text-xl font-semibold">
		{questionText}
	</h2>

	<form method="POST" action="?/submitAnswer" use:enhance>
		<input
			name="answer"
			bind:value={answer}
			class="mb-4 w-full rounded border p-3"
			placeholder="Type your answer..."
			autocomplete="off"
		/>

		<div class="flex gap-4">
			<button type="submit" class="rounded-lg bg-indigo-600 px-5 py-2 text-white">
				Submit
			</button>

			<button
				type="submit"
				formaction="?/skipQuestion"
				class="rounded-lg border border-gray-300 bg-white px-5 py-2 text-gray-600 hover:bg-gray-50"
			>
				Skip
			</button>
		</div>
	</form>

	{#if feedback}
		<p class="mt-4 text-sm text-red-600">{feedback}</p>
	{/if}
</main>
