import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {path: '', component: () => import('pages/LoginLayout/LoginPage.vue')},
      {path: 'soporte', component: () => import('pages/LoginLayout/SoportePage.vue')}
    ]
  },
  {
    path: '/usr=:user/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'MP', component: () => import('pages/MainLayout/MenuPrincipal.vue')},
      {path: 'FV', component: () => import('pages/MainLayout/FacturaVentaPage.vue')},
      {path: 'RC', component: () => import('pages/MainLayout/ReciboDeCajaPage.vue')},
      {path: 'CE', component: () => import('pages/MainLayout/ComprobanteEgresoPage.vue')},
      {path: 'DV', component: () => import('pages/MainLayout/DevolucionPage.vue')},
      {path: 'AV', component: () => import('pages/MainLayout/ActivosPage.vue')},
      {path: 'IV', component: () => import('pages/MainLayout/InventarioPage.vue')},
      {path: 'TR', component: () => import('pages/MainLayout/TercerosPage.vue')},
      {path: 'RP', component: () => import('pages/MainLayout/ReportesPage.vue')},
      {path: 'EF', component: () => import('pages/MainLayout/InformesFinancierosPage.vue')},
      {path: 'AM', component: () => import('pages/MainLayout/AdminPage.vue')}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
];

export default routes;
