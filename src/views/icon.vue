<template>
	<div class="iconBox">
		<ceshi :onSuccess="hand"></ceshi>
	</div>
</template>

<script>
import ceshi from "@/views/ceshi";

export default {
	name: "icon",
	components: {
		ceshi
	},
	data() {
		return{
			hand:({header, results}) => {
				console.log(header, results)
			}
		}
	},
	methods: {}
}
</script>

<style scoped lang="scss">
.iconBox {
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
}

.icon-item {
	width: 24px;
	height: 24px;
}

.img {
	width: 24px;
	height: 24px;
	background: url('../assets/icon_sprites.png') -0px -0px no-repeat;
	background-image: url('../assets/icon_sprites.png');
	background-position-x: 0px;
	background-position-y: 0px;
	background-repeat-x: no-repeat;
	background-repeat-y: no-repeat;
	//-webkit-transform: translateZ(0);
	//-moz-transform: translateZ(0);
	//-ms-transform: translateZ(0);
	//-o-transform: translateZ(0);
	//transform: translateZ(0);
}
</style>