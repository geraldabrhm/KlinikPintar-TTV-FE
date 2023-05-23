<script lang="ts">
    import UserCard from '../components/UserCard.vue';
    import UserAPI from '../api/UserAPI';
    import LoadingFullWidth from '../components/LoadingFullWidth.vue';
    export default {
        name: 'User',
        components: {
            UserCard,
            LoadingFullWidth,
        },
        data() {
            return {
                users: [] as any[],
                isShowingForm: false,
                isLoading: true,
                formNewUser: {
                    name: null,
                    age: null,
                }
            }
        },
        computed: {
            userEmpty() {
                return this.users.length === 0;
            },
            buttonText() {
                return this.isShowingForm ? 'Batal Tambah' : 'Tambahkan Data Pengguna';
            }
        },
        methods: {
            getData() {
                this.isLoading = true;
                const result = UserAPI.getAllUsers()
                result.then((res) => {
                    // console.info(res); // ! Debug
                    this.users = res.data;
                }).finally(() => {
                    this.isLoading = false;
                })
            },
            handleFormNewUser() {
                const result = UserAPI.addUser(this.formNewUser);
                result.then((res) => {
                    // console.info(res); // ! Debug
                    this.getData();
                    this.isShowingForm = false;
                })
            },
            handleDeleteUser(id: string) {
                console.info(id); // ! Debug
                const result = UserAPI.deleteUser(id);
                result.then((res) => {
                    console.info(res); // ! Debug
                    this.getData();
                })
            }
            
        },
        mounted() {
            this.getData();
        }
    }
</script>

<template>
    <main>
        <div class="flex flex-row w-full justify-between px-5 items-center">
            <h3>Daftar Pengguna</h3>
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
            <form v-on:submit.prevent="handleFormNewUser" class="w-50 bg-[#1e293b] p-5 rounded-md">
                <div class="flex flex-row justify-center p-2">
                    <label class="mr-1">Nama: </label>
                    <input class="" v-model="formNewUser.name" placeholder="Masukan nama" type="text" required/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <label class="mr-1">Umur: </label>
                    <input class="" v-model="formNewUser.age" placeholder="Masukan umur" type="number" min="1" required/>
                </div>
                <div class="flex flex-row justify-center p-2">
                    <button type="submit" class="minimal-button bg-[#12ae8f]">
                        Tambahkan
                    </button>
                </div>
            </form>
        </div>
        
        <div v-if="!userEmpty && !isLoading" class="flex flex-col text-left w-full px-5">
            <div className="flex flex-row justify-between border-b border-[#b3b3b3]">
                <p className="user-header basis-2/12">#</p>
                <p className="user-header basis-3/12">Nama</p>
                <p className="user-header basis-3/12">Umur</p>
                <p className="user-header basis-4/12">Aksi</p>
            </div>
            <UserCard v-for="(user, idx) in users" :key="user.id" :num="idx + 1" :user="user" @deleteuser="(userId) => handleDeleteUser(userId)"/>
        </div>
        <div v-if="userEmpty && !isLoading" class="flex flex-row justify-center">
            <p>There is no user</p>
        </div>
        <div v-if="isLoading">
            <LoadingFullWidth/>
        </div>
    </main>
</template>

<style scoped>
    .user-header {
        @apply p-2 m-2 font-bold;
    }
</style>