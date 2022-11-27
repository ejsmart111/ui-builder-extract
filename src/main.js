import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { initializeApp } from "firebase/app";
import 'document-register-element/build/document-register-element'
import './styles.css'

Vue.config.productionTip = false
library.add(faStar)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const firebaseConfig = {
    apiKey: "AIzaSyAHZtERyxaG80Nww-Do2qLdXQNDZ2BVHAs",
    authDomain: "ui-builder-373c7.firebaseapp.com",
    databaseURL: "https://ui-builder-373c7-default-rtdb.firebaseio.com",
    projectId: "ui-builder-373c7",
    storageBucket: "ui-builder-373c7.appspot.com",
    messagingSenderId: "587991581200",
    appId: "1:587991581200:web:bf54f49abee05041068095",
    measurementId: "G-7HS3BM1SFZ"
};

const div = document.createElement('div')
div.id = 'app'
document.body.appendChild(div)

initializeApp(firebaseConfig)

new Vue({
    render: h => h(App),
}).$mount('#app')