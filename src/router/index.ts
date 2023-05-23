import { createRouter, createWebHistory } from "vue-router";
import User from "../page/User.vue";
import Vital from "../page/Vital.vue";

const routes = [
    {
        path: "/user",
        name: "User",
        component: User,
    },
    {
        path: "/vital",
        name: "Vital",
        component: Vital,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;