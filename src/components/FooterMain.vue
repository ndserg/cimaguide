<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <div class="footer__info">
          <p class="footer__info-text footer__info--company">LLC «Мультимедиа Визион»</p>
          <p class="footer__info-text footer__info--copyright">
            <svg width="16" height="16" aria-hidden="true">
              <use xlink:href="/img/icons/sprite.svg#icon-copyright"></use>
            </svg>
            Все права защищены
          </p>
        </div>

        <div class="footer__socials">
          <ul class="socials-list list-reset">
            <li class="socials-list__item">
              <a class="socials-list__link" href="">
                <svg
                  class="socials-list__icon socials-list__icon--vkontakte"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use xlink:href="/img/icons/sprite.svg#icon-vkontakte"></use>
                </svg>
              </a>
            </li>

            <li class="socials-list__item">
              <a class="socials-list__link" href="">
                <svg
                  class="socials-list__icon socials-list__icon--youtube"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use xlink:href="/img/icons/sprite.svg#icon-youtube"></use>
                </svg>
              </a>
            </li>

            <li class="socials-list__item">
              <a class="socials-list__link" href="">
                <svg
                  class="socials-list__icon socials-list__icon--ok"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use xlink:href="/img/icons/sprite.svg#icon-ok"></use>
                </svg>
              </a>
            </li>

            <li class="socials-list__item">
              <a class="socials-list__link" href="">
                <svg
                  class="socials-list__icon socials-list__icon--telegram"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use xlink:href="/img/icons/sprite.svg#icon-telegram"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: 24px;
  padding-bottom: 24px;

  background-color: var(--background-black);
}

.footer__wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
}

.footer__info {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  column-gap: 12px;
}

.footer__info-text {
  margin: 0;
}

.footer__info--company {
  font-size: 18px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);
}

.footer__info--copyright {
  display: flex;
  column-gap: 14px;
  align-items: center;

  font-size: 14px;
  font-weight: 400;
  line-height: 143%;
  color: var(--content-disabled);
}

.footer__info--copyright svg {
  width: 16px;
  height: 16px;
}

.socials-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
}

.socials-list__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  font-size: 0;
  line-height: 0;
  color: var(--content-primary);

  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 8px;

  outline: none;

  transition:
    color 0.3s,
    border-color 0.3s;
}

.socials-list__link:focus-visible,
.socials-list__link:hover {
  color: var(--content-active);
  border-color: var(--content-active);
}

.socials-list__icon--vkontakte {
  width: 12px;
  height: 8px;
}

.socials-list__icon--youtube {
  width: 10px;
  height: 8px;
}

.socials-list__icon--ok {
  width: 8px;
  height: 12px;
}

.socials-list__icon--telegram {
  width: 11px;
  height: 9px;
}

@media (min-width: 768px) {
  .footer {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .footer__wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .footer__info {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  .footer__info--copyright {
    font-size: 18px;
    line-height: 133%;
  }

  .footer__info--copyright svg {
    width: 20px;
    height: 20px;
  }

  .socials-list__link {
    width: 36px;
    height: 36px;
  }

  .socials-list__icon--vkontakte {
    width: 18px;
    height: 10px;
  }

  .socials-list__icon--youtube {
    width: 15px;
    height: 11px;
  }

  .socials-list__icon--ok {
    width: 11px;
    height: 18px;
  }

  .socials-list__icon--telegram {
    width: 16px;
    height: 14px;
  }
}
</style>
