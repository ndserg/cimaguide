<template>
  <button
    class="button-default"
    :class="extraClass ? `button-default--${extraClass}` : ''"
    type="button"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  extraClass?: 'primary' | '';
}>();
</script>

<style scoped>
.button-default {
  padding-top: 15px;
  padding-right: 39px;
  padding-bottom: 15px;
  padding-left: 39px;

  font-size: 18px;
  font-weight: 700;
  line-height: 133%;
  color: var(--content-primary);

  cursor: pointer;

  background-color: var(--background-secondary);
  border: 1px solid var(--content-placeholder);
  border-radius: 28px;

  outline: none;

  transition:
    color 0.3s,
    background-color 0.3s,
    border-color 0.3s;
}

.button-default:focus-visible,
.button-default:hover {
  color: var(--content-black);

  background-color: var(--background-white);
  border-color: var(--content-black);
}

.button-default:disabled {
  color: var(--content-disabled);

  pointer-events: none;
  cursor: default;

  background-color: var(--background-black-disabled);
  border-color: var(--content-placeholder);
}

.button-default--primary {
  color: var(--content-primary);

  background-color: var(--background-brand-active);
  border: none;
}

.button-default--primary:focus-visible,
.button-default--primary:hover {
  color: var(--content-primary);

  background-color: var(--background-brand-hovered);
}

.button-default--primary:disabled {
  color: var(--content-disabled);

  background-color: var(--background-brand-disabled);
}
</style>
