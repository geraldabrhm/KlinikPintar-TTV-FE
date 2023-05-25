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
            },
            isBloodPressureNormal() {
                return this.vital.bloodPressureSistol >= 110 && this.vital.bloodPressureSistol <= 125 && this.vital.bloodPressureDiastol >= 70 && this.vital.bloodPressureDiastol <= 85;
            },
            isHeartRateNormal() {
                return this.vital.heartRate >= 60 && this.vital.heartRate <= 100;
            },
            isRespiratoryRateNormal() {
                return this.vital.respiratoryRate >= 12 && this.vital.respiratoryRate <= 20;
            },
            isBodyTemperatureNormal() {
                return this.vital.bodyTemperature >= 36.5 && this.vital.bodyTemperature <= 37.5;
            },
        }
    }
</script>

<template>
    <div class="flex flex-row justify-between">
        <p class="table-cell basis-1/12">{{ num }}</p>
        <p class="table-cell basis-3/12">{{ vital.name }}</p>
        <!-- <p class="table-cell basis-3/12">{{ nameById }}</p> -->
        <p class="table-cell basis-2/12">{{ dateFormatted }}</p>
        <div class="table-cell basis-2/12">
            <div class="flex flex-row justify-start gap-2">
                <p>
                    {{ vital.bloodPressureSistol }}/{{ vital.bloodPressureDiastol }}
                </p>
                <div>
                    <font-awesome-icon v-if="isBloodPressureNormal" icon="fa-solid fa-thumbs-up" style="color: #05f511;" />
                    <font-awesome-icon  v-if="!isBloodPressureNormal" icon="fa-solid fa-circle-exclamation" style="color: #fb0000;"/>
                </div>
            </div>
        </div>
        <div class="table-cell basis-1/12">
            <div class="flex flex-row justify-start gap-2">
                <p>
                    {{ vital.heartRate }}
                </p>
                <div>
                    <font-awesome-icon v-if="isHeartRateNormal" icon="fa-solid fa-thumbs-up" style="color: #05f511;" />
                    <font-awesome-icon  v-if="!isHeartRateNormal" icon="fa-solid fa-circle-exclamation" style="color: #fb0000;"/>
                </div>
            </div>
        </div>
        <div class="table-cell basis-1/12">
            <div class="flex flex-row justify-start gap-2">
                <p>
                    {{ vital.respiratoryRate }}
                </p>
                <div>
                    <font-awesome-icon v-if="isRespiratoryRateNormal" icon="fa-solid fa-thumbs-up" style="color: #05f511;" />
                    <font-awesome-icon  v-if="!isRespiratoryRateNormal" icon="fa-solid fa-circle-exclamation" style="color: #fb0000;"/>
                </div>
            </div>
        </div>
        <div class="table-cell basis-1/12">
            <div class="flex flex-row justify-start gap-2">
                <p>
                    {{ vital.temperature }}
                </p>
                <div>
                    <font-awesome-icon v-if="isBodyTemperatureNormal" icon="fa-solid fa-thumbs-up" style="color: #05f511;" />
                    <font-awesome-icon  v-if="!isBodyTemperatureNormal" icon="fa-solid fa-circle-exclamation" style="color: #fb0000;"/>
                </div>
            </div>
        </div> 
        <p class="table-cell basis-1/12">-</p>
    </div>
</template>

<style scoped>
    .table-cell {
        @apply p-1 m-2;
    }
</style>