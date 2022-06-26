<script>
	uni.showShareMenu({
		menus:["shareAppMessage","shareTimeline"]
	})
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide')
		},
		onShareAppMessage() {
			return {
			  title: '武汉\"游\"点料',
			  path: '/pages/homepage/index',
			  imageUrl:'http://121.40.19.45:8080/pics/fengmian.png'
			}
		},
		onShareTimeline() {
			return {
			  title: '武汉\"游\"点料',
			  imageUrl:'http://121.40.19.45:8080/pics/fengmian.png'
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./static/icons.css");

	page {
		background-color: #efefef;
	}
</style>
