<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let isSubmitting = $state(false);

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

	// Fase/Stage saat ini
	let stage = $derived(
		questionObject?.stage ||
			questionObject?.Stage ||
			data.question?.current_stage ||
			'observe'
	);

	// Hint dan Explanation (Arti Pertanyaan)
	let hint = $derived(questionObject?.hint || questionObject?.Hint || '');
	let explanation = $derived(
		questionObject?.explanation ||
			questionObject?.Explanation ||
			questionObject?.meaning ||
			questionObject?.Meaning ||
			''
	);

	let answer = $state('');
	let feedback = $derived(form?.error || '');

	// Reset jawaban saat ID pertanyaan berubah atau selesai
	$effect(() => {
		const qId = questionObject?.questionId || questionObject?.QuestionID;
		const isFinished = data.question?.finished || data.question?.Finished;
		
		if (qId || isFinished) {
			answer = '';
			isSubmitting = false;
		}
	});
</script>

<main class="min-h-screen bg-gray-50 p-8">
	{#if isSubmitting}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
			<div class="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
		</div>
	{/if}
	<div class="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
		Phase: {stage}
	</div>

	<h2 class="mb-2 text-xl font-semibold">
		{questionText}
	</h2>

	{#if stage !== 'free' && explanation}
		<p class="mb-4 text-sm text-gray-600">
			Artinya: {explanation}
		</p>
	{/if}

	{#if stage === 'guided' && hint}
		<div class="mb-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800 border border-yellow-200">
			<strong>💡 Hint:</strong> {hint}
		</div>
	{/if}

	{#if stage === 'observe'}
		<p class="mb-4 text-sm text-gray-500 italic">
			In the "observe" phase, you can just click "Next" to continue.
		</p>
	{/if}

	<form
		method="POST"
		action="?/submitAnswer"
		use:enhance={() => {
			isSubmitting = true;
			return async ({ update }) => {
				await update();
				isSubmitting = false;
			};
		}}
	>
		<input
			name="answer"
			bind:value={answer}
			class="mb-4 w-full rounded border p-3 disabled:bg-gray-100"
			placeholder={stage === 'observe' ? 'No answer needed' : 'Type your answer...'}
			autocomplete="off"
			disabled={stage === 'observe' || isSubmitting}
		/>

		<div class="flex gap-4">
			<button
				type="submit"
				class="rounded-lg bg-indigo-600 px-5 py-2 text-white disabled:opacity-50"
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Loading...' : stage === 'observe' ? 'Next' : 'Submit'}
			</button>

			{#if stage !== 'observe'}
				<button
					type="submit"
					formaction="?/skipQuestion"
					class="rounded-lg border border-gray-300 bg-white px-5 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
					disabled={isSubmitting}
				>
					Skip
				</button>
			{/if}
		</div>
	</form>

	{#if feedback}
		<p class="mt-4 text-sm text-red-600">{feedback}</p>
	{/if}
</main>
