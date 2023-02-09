<script setup lang="ts">
import {FAB} from  '../../components/shared'
</script>
<template>
    <a-row>
        <a-col :span="12">
            <a-typography-title :level="3">Insumos</a-typography-title>
        </a-col>
        <a-col>
            <RouterLink :to="{name: 'item-register'}">
                <a-button type="primary">Registar producto</a-button>
            </RouterLink>
        </a-col>
    </a-row>
</template>