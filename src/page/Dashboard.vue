<script lang="ts">
    export default {
        name: 'Dashboard',
    }
</script>

<template>
    <main>
        <section class="hero">
            <div class="flex flex-col justify-start items-center basis-7/12 p-4">
                <h3>Melakukan Pencatatan Data-data Kesehatanmu Secara digital!</h3>
                <div class="grid grid-cols-2 grid-rows-2 gap-2">
                    <div class="feature-item">
                        <font-awesome-icon icon="fa-solid fa-notes-medical" size="xl" class="mr-1"/>
                        <div class="p-2">
                            <p>Melakukan pencatatan</p>
                            <p class="text-secondary">Lorem ipsum</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <font-awesome-icon icon="fa-solid fa-flask" size="xl" class="mr-1"/>
                        <div class="p-2">
                            <p>Memberikan hasil analisis (<span class="italic">SOON</span>)</p>
                            <p class="text-secondary">Lorem ipsum</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <font-awesome-icon icon="fa-solid fa-microscope" size="xl"  class="mr-1"/>
                        <div class="p-2">
                            <p>Lorem ipsum</p>
                            <p class="text-secondary">Lorem ipsum</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <font-awesome-icon icon="fa-solid fa-truck-medical" size="xl"  class="mr-1"/>
                        <div class="p-2">
                            <p>Lorem ipsum</p>
                            <p class="text-secondary">Lorem ipsum</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basis-5/12 p-4">
                <img class="rounded-md" src="https://media.istockphoto.com/id/1314389439/photo/charming-female-doctor-doing-paperwork-in-clinic.jpg?s=612x612&w=0&k=20&c=IMn4jAe5vMp9efCNqNsurM62oe15YDlvpWvNHksWGUw=">
            </div>
        </section>
    </main>
</template>

<style scoped>
    .hero {
        @apply flex flex-row justify-between items-center p-2;
    }

    .feature-item {
        @apply flex flex-row justify-start items-center;
    }
</style>