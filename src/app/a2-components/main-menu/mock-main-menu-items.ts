import { MainMenuItem } from './main-menu-item';

export const MAINMENUITEMS: MainMenuItem[] = [
  {
    title: 'Main',
    icon: '',
    active: true,
    groupTitle : true,
    sub: '',
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: ''
  },
  {
    title: 'Pages',
    icon: 'fa fa-home',
    active: false,
    groupTitle: false,
    sub: [
      {
        title: 'Envios',
        routing: '/default-layout/envios'
      },
      {
        title: 'Usuarios',
        routing: '/default-layout/usuarios'
      },
      {
        title: 'Empleados',
        routing: '/default-layout/empleados'
      },
      {
        title: 'Paquetes',
        routing: '/default-layout/paquetes'
      },
      {
        title: 'Sucursales',
        routing: '/default-layout/sucursales'
      },
      {
        title: 'Transportes',
        routing: '/default-layout/transportes'
      },
      {
        title: 'Conductores',
        routing: '/default-layout/conductores'
      },
      {
        title: 'Facturas',
        routing: '/default-layout/facturas'
      }

    ],
    routing: '/default-layout/dashboard',
    externalLink: '',
    budge: '8',
    budgeColor: '#f44236'
  },
  {
    title: 'Pages',
    icon: '',
    active: false,
    groupTitle : true,
    sub: '',
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: ''
  },
  {
    title: 'Pages service',
    icon: 'fa fa-edit',
    active: false,
    groupTitle: false,
    sub: [
      {
        title: 'About Us',
        routing: '/default-layout/about-us'
      }
    ],
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: '#008000'
  },
];