<script lang="ts">
    import VitalCard from '../components/VitalCard.vue';
    import VitalAPI from '../api/VitalAPI';
    import UserAPI from '../api/UserAPI';
    import LoadingFullWidth from '../components/LoadingFullWidth.vue';
    export default {
        name: 'Vital',
        components: {
            VitalCard,
            LoadingFullWidth,
        },
        data() {
            return {
                vitals: [] as any[],
                users: [] as any[],
                isShowingForm: false,
                isLoading: true,
                vitalPromptData: {
                    personId: null,
                    bloodPressureSistol: null,
                    bloodPressureDiastol: null,
                    heartRate: null,
                    respiratoryRate: null,
                    temperature: null,
                },
            }
        },
        computed: {
            vitalEmpty() {
                return this.vitals === null || this.vitals.length === 0;
            },
            buttonText() {
                return this.isShowingForm ? 'Batal Tambah' : 'Tambahkan Data TTV';
            }
        },
        methods: {
            getData() {
                this.isLoading = true;
                const result = VitalAPI.getAllVitals()
                result.then((res) => {
                    console.info(res); // ! Debug
                    this.vitals = res.data;
                }).finally(() => {
                    this.isLoading = false;
                })
            },
            getAllUsers() {
                const result = UserAPI.getAllUsers();
                result.then((res) => {
                    console.info(res); // ! Debug
                    this.users = res.data;
                })
            },
            handleFormNewTTV() {
                if(this.vitalPromptData.personId === null || this.vitalPromptData.bloodPressureSistol === null || this.vitalPromptData.bloodPressureDiastol === null || this.vitalPromptData.heartRate === null || this.vitalPromptData.respiratoryRate === null || this.vitalPromptData.temperature === null) {
                    alert('Mohon isi semua data dengan benar');
                    return;
                }
                this.isLoading = true;
                const result = VitalAPI.addVital(this.vitalPromptData);
                result.then((res) => {
                    console.info(res); // ! Debug
                    this.getData();
                    this.isShowingForm = false;
                }).finally(() => {
                    this.isLoading = false;
                })
            }
        },
        mounted() {
            this.getData();
            this.getAllUsers();
        }
    }
</script>

<template>
    <main>
        <div class="flex flex-row w-full justify-between px-5 items-center">
            <h3>Daftar Tanda-tanda Vital</h3>
            <div class="flex flex-row justify-end items-center">
                <button 
                    @click="isShowingForm = !isShowingForm"
                    class="minimal-button"
                    :class="{ 'bg-[#12ae8f]': !isShowingForm, 'bg-red-500': isShowingForm}">
                    {{ buttonText }}
                </button>
            </div>
        </div>

        <div v-if="isShowingForm" class="flex flex-row justify-center w-full mb-5">
            <form v-on:submit.prevent="handleFormNewTTV" class="w-50 bg-[#1e293b] p-5 rounded-md">
                <div class="flex flex-row justify-center p-2">
                    <label class="input-label">Nama: </label>
                    <select class="input-box" name="name" v-model="vitalPromptData.personId" required>
                        <option :value="user.id"  v-for="user in users" >
                            {{ user.name }}
                        </option>
                    </select>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="input-label">Tekanan darah (Sistol): </label>
                    <input class="input-box" placeholder="Masukan tekanan darah (sistol)" type="number" min="1" required v-model="vitalPromptData.bloodPressureSistol"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="input-label">Tekanan darah (Diastol): </label>
                    <input class="input-box" placeholder="Masukan tekanan darah (diastol)" type="number" min="1" required v-model="vitalPromptData.bloodPressureDiastol"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="input-label">Denyut nadi (bpm): </label>
                    <input class="input-box" placeholder="Masukan denyut nadi" type="number" min="1" required v-model="vitalPromptData.heartRate"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="input-label">Rate pernapasan (per menit): </label>
                    <input class="input-box" placeholder="Masukan denyut nadi" type="number" min="1" required v-model="vitalPromptData.respiratoryRate"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="input-label">Suhu tubuh (Celcius): </label>
                    <input class="input-box" placeholder="Masukan suhu tubuh" type="number" min="1" required v-model="vitalPromptData.temperature"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <button type="submit" class="minimal-button bg-[#12ae8f]">
                        Tambahkan
                    </button>
                </div>
            </form>
        </div>

        <div v-if="!vitalEmpty && !isLoading && !isShowingForm" class="flex flex-col text-left w-full px-5">
            <div class="flex flex-row justify-between border-b border-[#b3b3b3]">
                <p class="table-header basis-1/12">#</p>
                <p class="table-header basis-3/12">Name</p>
                <!-- <p class="table-header basis-3/12">Name</p> -->
                <p class="table-header basis-2/12">Date</p>
                <p class="table-header basis-2/12">Blood Pressure <span class="italic">(mmHg)</span></p>
                <p class="table-header basis-1/12">Heart Rate <span class="italic">(bpm)</span></p>
                <p class="table-header basis-1/12">Respiratory Rate <span class="italic">(per minute)</span></p>
                <p class="table-header basis-1/12">Temperature <span class="italic">(celcius)</span></p>  
                <p class="table-header basis-1/12">Note</p>
            </div>
            <VitalCard v-for="(vital, index) in vitals" :key="vital.id" :num="index + 1" :vital="vital"/>  
        </div>
        <div v-if="vitalEmpty && !isLoading && !isShowingForm" class="flex flex-row justify-center">
            <p>There is no vital sign data</p>
        </div>
        <div v-if="isLoading && !isShowingForm" class="w-full">
            <LoadingFullWidth />
        </div>
    </main>
</template>

<style scoped>
    .table-header {
        @apply p-1 m-2 font-bold;
    }

    .input-label{
        @apply text-white p-1 mr-1
    }
    .input-box{
        @apply text-black p-1 rounded-md
    }
</style>