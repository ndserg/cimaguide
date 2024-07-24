<template>
  <main class="user-page">
    <div class="container">
      <h1 class="user-page__title">Мой аккаунт</h1>

      <nav class="user-nav">
        <RouterLink
          class="user-nav__link user-nav__link--favorite"
          aria-label="Избранные фильмы"
          to="/user/favorites"
        >
          <svg class="user-nav__icon user-nav__icon--favorite" aria-hidden="true">
            <use xlink:href="/img/icons/sprite.svg#icon-favorite"></use>
          </svg>
        </RouterLink>
        <RouterLink
          class="user-nav__link user-nav__link--settings"
          aria-label="Настройка аккаунта"
          to="/user/settings"
        >
          <svg class="user-nav__icon user-nav__icon--user" aria-hidden="true">
            <use xlink:href="/img/icons/sprite.svg#icon-user"></use>
          </svg>
        </RouterLink>
      </nav>
    </div>

    <RouterView />
  </main>
</template>

<style scoped>
.user-page {
  padding-top: 24px;
}

.user-page__title {
  margin: 0;
  margin-bottom: 40px;

  font-size: clamp(24px, 6.4vw, 48px);
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);
}

.user-nav {
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
  align-items: center;

  margin-bottom: 48px;
}

.user-nav__link {
  position: relative;

  display: flex;
  column-gap: 12px;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;

  font-size: 24px;
  font-weight: 400;
  line-height: 133%;
  color: var(--background-white);
  text-decoration: none;
}

.user-nav__link--favorite::before {
  content: 'Избранное';
}

.user-nav__link--settings::before {
  content: 'Настройки';
}

.user-nav__link::after {
  position: absolute;
  bottom: 0;

  display: block;
  width: 100%;
  height: 1.5px;

  content: '';
  background-color: transparent;

  transition:
    transform 0.3s,
    background-color 0.3s;
  transform: scaleX(0);
}

.current.user-nav__link::after {
  background-color: #dc5dfc;

  transform: scaleX(1);
}

.user-nav__icon {
  order: -1;
  width: 20px;
  height: 20px;

  fill: var(--content-primary);
}

.user-nav__icon--favorite {
  width: 20px;
  height: 19px;
}

.user-nav__icon--user {
  width: 16px;
  height: 21px;
}

@media (min-width: 768px) {
  .user-page {
    padding-top: 32px;
  }

  .user-page__title {
    margin-bottom: 32px;
  }

  .user-nav__link--favorite::before {
    content: 'Избранные фильмы';
  }

  .user-nav__link--settings::before {
    content: 'Настройка аккаунта';
  }
}

@media (min-width: 992px) {
  .user-nav {
    margin-bottom: 64px;
  }

  .user-page {
    padding-top: 64px;
  }

  .user-page__title {
    margin-bottom: 64px;
  }
}
</style>
