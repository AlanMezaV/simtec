<template>
	<div class="home">
		
		<HelloWorld msg="Ponte a chambear mokii" />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "HomeView",
	components: {
		HelloWorld,
	},
};
</script>
