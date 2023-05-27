import Vue from 'vue';
import Router from 'vue-router'
import Dashboard from './page/DashBoard.vue'
import TrackList from './page/TrackList.vue'



Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Dashboard
        },
        {
            path: "/tracks",
            component: TrackList
        }
    ]
})