<script setup lang="ts">
import {defineEmits} from 'vue'

const emit = defineEmits(['onClick'])
const onClick = () =>{
    emit('onClick')
}

</script>
<template>
    <!-- FAB with ant design vue  -->
    <a-button
        class="FAB"
        type="primary"
        shape="circle"
        icon="plus"
        size="large"
        @click="onClick"
    />
</template>
<style scoped >
.FAB {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}
</style>