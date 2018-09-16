<template>
    <div class='member-center-panel'>
        <div class="nav">
            <Menu mode="horizontal"
                :active-name="currentMenuItem"
                class='menu'
                @on-select='onMenuChange'>
                <MenuItem name="course">
                <Icon type="ios-paper"></Icon>
                我的课程
                </MenuItem>
                <MenuItem name="task">
                <Icon type="ios-list"></Icon>
                我的作业
                </MenuItem>
            </Menu>
        </div>

        <div class='content'>
            <transition>
                <keep-alive include="psninfo,task,course">
                    <component :is="currentMenuItem"></component>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import course from './course.vue'

export default {
    components: {
        course,
       
    },
    data() {
        return {
            currentMenuItem: 'course',
        }
    },
    methods: {
        onMenuChange(name) {
            this.currentMenuItem = name
        }
    },
}
</script>

<style lang="less">
.member-center-panel {

    display: flex;
    flex-direction: column;
    .nav{
        height:60px ;
    }
    .content {
        flex: 1
    }
}
</style>
