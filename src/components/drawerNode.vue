<template>
	<a-drawer
		title="Basic Drawer"
		placement="right"
		:closable="false"
		:visible="visible"
		:maskClosable="true"
		destroyOnClose
	>
		<a-button type="primary" @click="showDrawer">Open</a-button>
		稀粑粑
		<drawerNode v-if="childVvisible" :visible="childVvisible"></drawerNode>
	</a-drawer>
</template>

<script>
import drawerNode from "@/components/drawerNode";

export default {
	name: "drawerNode",
	components: {drawerNode},
	props: {
		visible: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			childVvisible: false
		}
	},
	methods: {
		showDrawer() {
			this.childVvisible = true
		}
	}
}
</script>

<style scoped>

</style>