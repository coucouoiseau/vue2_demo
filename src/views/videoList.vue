<template>
	<div>
		<div style="width: 300px;height: 150px;">
			<video ref="videoP" controls width="250">
				<source :src="videoActive.src" type="video/mp4">
			</video>
		</div>
		<div style="display: flex;flex-direction: row;">
			<div style="width: 100px;height: 100px;" v-for="item in videoListImg" :key="item.id" @click="change(item)">
				<img :src="item.img" alt="" style="width: 100%;height: 100%;">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "videoList",
	data() {
		return {
			videoActive: {},
			videoList: [
				{
					id: 11,
					img: 'https://static.runoob.com/images/demo/demo2.jpg',
					src:'https://media.w3.org/2010/05/sintel/trailer.mp4'
				},
				{
					id: 22,
					img: 'https://img95.699pic.com/photo/50034/0209.jpg_wh300.jpg',
					src:'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
				},
				{
					id: 33,
					img: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
					src:'https://www.w3schools.com/html/movie.mp4'
				},
			]
		}
	},
	computed: {
		videoListImg() {
			return this.videoList.filter(item => item.src !== this.videoActive.src)
		},
	},
	methods: {
		change(data) {
			this.videoActive = {}
			setTimeout(()=>{
				this.videoActive = data
				let videoDom = this.$refs.videoP
				videoDom.play()
			},150)
		}
	}
}
</script>

<style scoped>

</style>
