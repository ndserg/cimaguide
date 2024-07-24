import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import MainView from '@/views/MainVue.vue';
import FilmView from '@/views/FilmVue.vue';
import GenresView from '@/views/GenresView.vue';
import UserPageView from '@/views/UserPageView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'current',
  linkExactActiveClass: 'current-exact',
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      component: MainView
    },
    {
      path: '/about',
      component: FilmView,
      children: [
        {
          path: '/about/:filmId',
          component: () => import('@/components/Films/FilmAbout.vue')
        }
      ]
    },
    {
      path: '/genres',
      component: GenresView,
      children: [
        {
          path: '',
          name: 'genres-list',
          component: () => import('@/components/Genres/GenresList.vue')
        },
        {
          path: '/genres/:genre',
          name: 'films-list',
          component: () => import('@/components/Films/FilmsByGenre.vue')
        }
      ]
    },
    {
      path: '/user',
      component: UserPageView,
      redirect: { name: 'favorites' },
      children: [
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('@/components/Films/FilmsFavorites.vue')
        },
        { path: 'settings', component: () => import('@/components/UserSettings.vue') }
      ],
      meta: {
        requiredAuth: true
      }
    }
  ]
});

router.beforeEach((to) => {
  const user = useUserStore();

  if (to.meta.requiredAuth && !user.isAuth) {
    user.openForm = true;
    return false;
  }
});

export default router;
