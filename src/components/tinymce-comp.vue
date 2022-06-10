<template>
	<editor
		:apiKey="apiKey"
		v-model="value"
		:init="init">
	</editor>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
	name: 'tinymce-comp',
	components: {Editor},
	data() {
		return {
			value: '',
			init: {
				language_url: '/tinymce/langs/zh_CN.js',// 语言包的路径
				language: 'zh_CN',//语言
				height: 300,//编辑器高度
				branding: false,//是否禁用“Powered by TinyMCE”
				menubar: true,//顶部菜单栏显示,
				toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | code codesample link help',
				plugins: [
					'advlist autolink lists link image charmap print preview anchor',
					'searchreplace visualblocks code fullscreen',
					'insertdatetime media table paste code help wordcount',
					'codesample'
				],
			},
			apiKey: 'xxx'
		}
	},
}
</script>