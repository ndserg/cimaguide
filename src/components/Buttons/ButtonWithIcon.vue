<template>
  <button
    class="button-with-icon"
    :class="{ 'button-with-icon--active': isActive }"
    type="button"
    @click="emit('action')"
  >
    <svg aria-hidden="true" :width="iconWidth" :height="iconHeight">
      <use :xlink:href="`/img/icons/sprite.svg#icon-${icon}${isActive ? '-active' : ''}`"></use>
    </svg>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    iconWidth?: string;
    iconHeight?: string;
    isActive?: boolean;
  }>(),
  {
    iconWidth: '24px',
    iconHeight: '24px'
  }
);

const emit = defineEmits(['action']);
</script>

<style scoped>
.button-with-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 56px;

  cursor: pointer;

  background-color: #333333;
  border: 1px solid var(--content-placeholder);
  border-radius: 28px;

  outline: none;

  transition: opacity 0.3s;
}

.button-with-icon svg {
  fill: var(--content-primary);

  transition: fill 0.3s;
}

.button-with-icon--active svg {
  fill: var(--content-active);
}

.button-with-icon:focus-visible svg,
.button-with-icon:hover svg {
  fill: var(--background-brand-hovered);
}
.button-with-icon:active svg {
  fill: var(--content-active);
}

.button-with-icon:disabled {
  pointer-events: none;
  cursor: default;

  opacity: 0.6;
}
</style>
