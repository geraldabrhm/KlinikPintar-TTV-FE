<script lang="ts">
    import UserAPI from '../api/UserAPI';
    export default {
        name: 'UserCard',
        props: {
            user: {
                type: Object,
                required: true,
            },
            num: {
                type: Number,
                required: true,
            }
        },
        methods: {
        }
    }
</script>

<template>
    <div class="flex flex-row justify-between">
        <p class="user-cell basis-2/12">{{ num }}</p>
        <p class="user-cell basis-3/12">{{ user.name }}</p>
        <p class="user-cell basis-3/12">{{ user.age }}</p>
        <div class="user-cell basis-4/12">
            <button @click="$emit('deleteuser', user.id)" class="minimal-button bg-red-500">
                Hapus
            </button>
        </div>
    </div>
</template>

<style scoped>
    .user-cell {
        @apply p-2 m-2;
    }
</style>