import {createApp,VueElement} from 'vue';
import App from './app/app.vue';
import router from './router';
import store from './store';
import {i18n} from './translation';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import DataTablesLib from 'datatables.net';
import DatatableSelect from 'datatables.net-select';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5/js/dataTables.bootstrap5.min.js';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import Toast, {PluginOptions} from 'vue-toastification';
import {VueWindowSizePlugin} from 'vue-window-size/option-api';

import {ProfabricComponents} from '@profabric/vue-components';
import './index.scss';

const options: PluginOptions = {
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
};

(window as any).PF = {
    config: {
        mode: 'bs4'
    }
};

// Vue.component('dataTables', DataTablesLib);
DataTable.use(DataTablesCore);
DataTable.use(DataTablesLib);
DataTable.use(DatatableSelect);

createApp(App)
    .component('DataTable', DataTable)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .use(router)
    .use(VueWindowSizePlugin)
    .use(Toast, options)
    .use(i18n as any)
    .use(ProfabricComponents)
    .mount('#app');
