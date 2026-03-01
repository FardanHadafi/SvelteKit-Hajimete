<script lang="ts">
	const { data } = $props<{
		data: {
			user: {
				id: string;
				email: string;
			};
		};
	}>();
</script>

<header>
	<nav>
		<span>{data.user.email}</span>
		<form method="POST" action="?/logout">
			<button type="submit">Logout</button>
		</form>
	</nav>
</header>

<main>
	<h1>Welcome to topic based japanese learning</h1>
</main>
