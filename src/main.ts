import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

// * Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouseMedical, faNotesMedical, faFlask, faMicroscope, faTruckMedical, faCircleExclamation, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

library.add(faHouseMedical, faNotesMedical, faFlask, faMicroscope, faTruckMedical, faCircleExclamation, faThumbsUp);

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
