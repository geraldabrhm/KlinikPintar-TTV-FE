import { createRouter, createWebHistory } from "vue-router";
import User from "../page/User.vue";
import Vital from "../page/Vital.vue";
import Dashboard from "../page/Dashboard.vue";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
    },
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