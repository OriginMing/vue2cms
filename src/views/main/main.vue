<template>
	<div class="main">
		<el-container class="main-content">
			<el-aside :width="isCollapse ? '60px' : '210px'">
				<nav-menu></nav-menu>
			</el-aside>
			<el-container class="page">
				<el-header class="page-header">Header</el-header>
				<el-main class="page-content">
					<div class="page-info">
						<router-view></router-view>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script lang="ts">
import NavMenu from '@/components/nav-menu'
import { defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
	components: {
		NavMenu
	},
	setup() {
		const isCollapse = ref(false)
    return{
      isCollapse
    }
	}
})
</script>
<style scoped lang="less">
.main {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
