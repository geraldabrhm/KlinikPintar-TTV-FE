<script lang="ts">
    import UserAPI from '../api/UserAPI';
    export default {
        name: 'VitalCard',
        props: {
            vital: {
                type: Object,
                required: true,
            },
            num: {
                type: Number,
                required: true,
            }
        },
        computed: {
            dateFormatted() {
                return this.vital.createdAt.toString().split('T')[0];
            },
            nameById() {
                const result = UserAPI.getUserById(this.vital.personId);
                result.then((res) => {
                    console.info(res); // ! Debug
                    console.info(res.data.name);
                    return res.data.name;
                })
            }
        }
    }
</script>

<template>
    <div class="flex flex-row justify-between">
        <p class="table-cell basis-1/12">{{ num }}</p>
        <p class="table-cell basis-3/12">{{ vital.personId }}</p>
        <!-- <p class="table-cell basis-3/12">{{ nameById }}</p> -->
        <p class="table-cell basis-2/12">{{ dateFormatted }}</p>
        <p class="table-cell basis-2/12">{{ vital.bloodPressureSistol }}/{{ vital.bloodPressureDiastol }}</p>
        <p class="table-cell basis-1/12">{{ vital.heartRate }}</p>
        <p class="table-cell basis-1/12">{{ vital.respiratoryRate }}</p>
        <p class="table-cell basis-1/12">{{ vital.temperature }}</p>  
        <p class="table-cell basis-1/12">-</p>
    </div>
</template>

<style scoped>
    .table-cell {
        @apply p-1 m-2;
    }
</style>