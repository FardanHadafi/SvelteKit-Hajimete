<script lang="ts">
	const { data, children } = $props<{
		data: {
			user: {
				id: string;
				email: string;
			};
			token: string;
		};
		children: () => any;
	}>();
</script>

<header>
	<nav>
		<span>{data.user.email}</span>

		<form method="POST" action="/logout?/logout">
			<button type="submit">Logout</button>
		</form>
	</nav>
</header>

{@render children()}
