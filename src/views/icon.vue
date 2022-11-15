<template>
	<div>
		<div class="custom-tree-container">
			<div class="block">
				<p>使用 render-content</p>
<!--				<el-tree-->
<!--					:data="data"-->
<!--					show-checkbox-->
<!--					node-key="id"-->
<!--					default-expand-all-->
<!--					:expand-on-click-node="false"-->
<!--					:render-content="renderContent"-->
<!--					:node-click="ceshi"-->
<!--				>-->
<!--				</el-tree>-->
				<el-tree
					:data="data"
					show-checkbox
					node-key="id"
					default-expand-all
					@node-click="ceshi"
				>
				</el-tree>
			</div>
		</div>
	</div>
</template>

<script>
let id = 1000;

export default {
	data() {
		const data = [{
			id: 1,
			label: '一级 1',
			children: [{
				id: 4,
				label: '二级 1-1',
				children: [{
					id: 9,
					label: '三级 1-1-1'
				}, {
					id: 10,
					label: '三级 1-1-2'
				}]
			}]
		}, {
			id: 2,
			label: '一级 2',
			children: [{
				id: 5,
				label: '二级 2-1'
			}, {
				id: 6,
				label: '二级 2-2'
			}]
		}, {
			id: 3,
			label: '一级 3',
			children: [{
				id: 7,
				label: '二级 3-1'
			}, {
				id: 8,
				label: '二级 3-2'
			}]
		}];
		return {
			data: JSON.parse(JSON.stringify(data))
		}
	},

	methods: {
		ceshi(obj,node,elm){
			obj.label += '1'
		},
		renderContent(h, { node, data, store }) {
			if(node.level == 1){
				return (
					<span class="custom-tree-node">
						<span>{node.label}</span>
						<span style="width:20px;">
							<el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
						</span>
					</span>);
			}else{
				return (
					<span class="custom-tree-node">
						<span>{node.label}</span>
					</span>);
			}
		}
	}
};
</script>

<style>
.custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 100px;
}
</style>
