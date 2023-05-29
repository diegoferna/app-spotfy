import Vue from 'vue';
import Router from 'vue-router'
import Dashboard from './page/DashBoard.vue'
import TrackList from './page/TrackList.vue'
import TrackDetails from '@/page/TrackDetails.vue'




Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: Dashboard
        },
        {
            path: "/album",
            name: "album",
            component: TrackList,
            props: true,

        },
        {
            name: "trackDetails",
            path: "/trackDetails",
            component: TrackDetails,
            props: true
        }

    ]

})