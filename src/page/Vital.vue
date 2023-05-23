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
                    bloodPressureSistol: 0,
                    bloodPressureDiastol: 0,
                    heartRate: 0,
                    respiratoryRate: 0,
                    temperature: 0,
                },
            }
        },
        computed: {
            vitalEmpty() {
                return this.vitals.length === 0;
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
                const result = VitalAPI.addVital(this.vitalPromptData);
                result.then((res) => {
                    console.info(res); // ! Debug
                    this.getData();
                    this.isShowingForm = false;
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

        <div v-if="isShowingForm" class="flex flex-row justify-center w-full mb-5 border-b border-white">
            <form v-on:submit.prevent="handleFormNewTTV" class="w-50 bg-[#1e293b] p-5 rounded-md">
                <div class="flex flex-row justify-center p-2">
                    <label class="mr-1">Nama: </label>
                    <select name="name" v-model="vitalPromptData.personId" required>
                        <option :value="user.id"  v-for="user in users" >
                            {{ user.name }}
                        </option>
                    </select>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="mr-1">Tekanan darah (Sistol): </label>
                    <input class="" placeholder="Masukan tekanan darah (sistol)" type="number" min="1" required v-model="vitalPromptData.bloodPressureSistol"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="mr-1">Tekanan darah (Diastol): </label>
                    <input class="" placeholder="Masukan tekanan darah (diastol)" type="number" min="1" required v-model="vitalPromptData.bloodPressureDiastol"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="mr-1">Denyut nadi (bpm): </label>
                    <input class="" placeholder="Masukan denyut nadi" type="number" min="1" required v-model="vitalPromptData.heartRate"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="mr-1">Rate pernapasan (per menit): </label>
                    <input class="" placeholder="Masukan denyut nadi" type="number" min="1" required v-model="vitalPromptData.respiratoryRate"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="mr-1">Suhu tubuh (Celcius): </label>
                    <input class="" placeholder="Masukan suhu tubuh" type="number" min="1" required v-model="vitalPromptData.temperature"/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <button @click="handleFormNewTTV" type="submit" class="minimal-button bg-[#12ae8f]">
                        Tambahkan
                    </button>
                </div>
            </form>
        </div>

        <div v-if="!vitalEmpty && !isLoading" class="flex flex-col text-left w-full px-5">
            <div class="flex flex-row justify-between border-b border-[#b3b3b3]">
                <p class="table-header basis-1/12">#</p>
                <p class="table-header basis-3/12">User Id</p>
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
        <div v-if="vitalEmpty && !isLoading" class="flex flex-row justify-center">
            <p>There is no vital sign data</p>
        </div>
        <div v-if="isLoading">
            <LoadingFullWidth />
        </div>
    </main>
</template>

<style scoped>
    .table-header {
        @apply p-1 m-2 font-bold;
    }
</style>