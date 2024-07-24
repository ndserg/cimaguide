<template>
  <ul class="nav-list list-reset">
    <li class="nav-list__item nav-list__item--home">
      <RouterLink class="nav-list__link" to="/">Главная</RouterLink>
    </li>

    <li class="nav-list__item">
      <RouterLink class="nav-list__link" to="/genres">
        Жанры

        <svg class="nav-list__icon" aria-hidden="true">
          <use xlink:href="/img/icons/sprite.svg#icon-genres"></use>
        </svg>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.nav-list {
  display: flex;
  column-gap: 20px;
}

.nav-list__item {
  display: block;

  font-size: 0;
  line-height: 0;
}

.nav-list__item--home {
  display: none;
}

.nav-list__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;

  font-size: inherit;
  line-height: inherit;
  color: var(--background-white);
  text-decoration: none;

  outline: none;

  transition: color 0.3s;
}

.nav-list__link:focus-visible,
.nav-list__link:hover {
  color: var(--content-active);
}

.nav-list__icon {
  width: 19px;
  height: 19px;

  fill: var(--content-primary);

  transition: fill 0.3s;
}

.current.nav-list__link .nav-list__icon {
  fill: #dc5dfc;
}

.nav-list__link:focus-visible .nav-list__icon,
.nav-list__link:hover .nav-list__icon {
  fill: var(--content-active);
}

@media (min-width: 992px) {
  .nav-list {
    column-gap: 40px;
  }

  .nav-list__item {
    display: block;

    font-size: 24px;
    font-weight: 400;
    line-height: 133%;
  }

  .nav-list__link {
    position: relative;

    display: block;
    width: auto;
    height: auto;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .nav-list__link::after {
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
  .current.nav-list__link::after {
    background-color: #dc5dfc;

    transform: scaleX(1);
  }

  .nav-list__icon {
    display: none;
  }
}
</style>
