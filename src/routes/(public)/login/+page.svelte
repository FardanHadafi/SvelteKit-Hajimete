<script lang="ts">
	const { form } = $props<{
		form?: {
			error?: string;
		};
	}>();
</script>

<header>
	<nav>
		<a href="/register">Register</a>
	</nav>
</header>

<main>
	<form method="POST">
		<label
			>Email
			<input type="email" name="email" minlength="3" placeholder="Your Email..." required />
		</label>
		<label
			>Password
			<input
				type="password"
				name="password"
				minlength="8"
				placeholder="Your Password..."
				required
			/>
		</label>
		<button type="submit">Login</button>
	</form>
	{#if form?.error}
		<p>{form.error}</p>
	{/if}
</main>
