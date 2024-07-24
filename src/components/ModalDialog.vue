<template>
  <dialog class="modal" ref="modal" v-if="showModal">
    <div class="modal__content">
      <slot></slot>
    </div>

    <button class="modal__close-button" @click="modalCloseHandler" :disabled="isDisabled">
      Закрыть окно
      <svg class="modal__close-icon" width="18" height="18" aria-hidden="true">
        <use xlink:href="/img/icons/sprite.svg#icon-close"></use>
      </svg>
    </button>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch, type ButtonHTMLAttributes } from 'vue';

defineProps<{
  showModal: Boolean;
  isDisabled?: ButtonHTMLAttributes['disabled'];
}>();

const emits = defineEmits(['destroyModal']);

const modal = ref<HTMLDialogElement | null>(null);

const modalCloseHandler = () => {
  emits('destroyModal');
};

const modalKeyCloseHandler = (evt: KeyboardEvent) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    emits('destroyModal');
  }
};

watch(modal, (newVal) => {
  if (newVal) {
    modal.value?.showModal();
    modal.value?.addEventListener('close', modalCloseHandler);
    modal.value?.addEventListener('keydown', modalKeyCloseHandler);
  } else {
    modal.value?.close();
    modal.value?.removeEventListener('close', modalCloseHandler);
    modal.value?.removeEventListener('keydown', modalKeyCloseHandler);
  }
});
</script>

<style scoped>
dialog:-internal-dialog-in-top-layer {
  max-width: 100%;
}
.modal {
  min-width: 335px;
  padding: 0;

  background-color: transparent;
  border: none;
}

.modal::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__content {
  position: relative;
}

.modal__close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;

  font-size: 0;
  line-height: 0;

  cursor: pointer;

  background-color: var(--background-white);
  border: none;
  border-radius: 24px;
}

.modal__close-button:disabled {
  pointer-events: none;
  cursor: auto;

  opacity: 0.6;
}

.modal__close-icon {
  width: 14px;
  height: 14px;

  fill: var(--content-black);
}

.v-enter-active {
  animation: modalShow 0.4s ease normal;
}

.v-leave-active {
  animation: modalShow 0.4s ease reverse;
}

@keyframes modalShow {
  from {
    opacity: 0;
    transform: translateY(-1000px) scaleY(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

@media (min-width: 768px) {
  .modal {
    padding-right: 74px;
    padding-left: 74px;
  }

  .modal__close-button {
    top: 0;
    right: 2px;

    width: 48px;
    height: 48px;

    background-color: var(--background-white);
    border-radius: 24px;
  }

  .modal__close-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
