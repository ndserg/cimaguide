<template>
  <div class="user-form__item">
    <div class="user-form__group">
      <input
        class="user-form__input"
        :type="type"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        v-bind="$attrs"
        v-on="handlers"
        :value="value"
        :invalid="errorMessage ? true : false"
      />
      <label class="user-form__label" :for="id">
        {{ name }}

        <svg
          class="user-form__input-icon"
          aria-hidden="true"
          v-if="iconName"
          :width="iconWidth"
          :height="iconHeight"
        >
          <use :xlink:href="`/img/icons/sprite.svg#${iconName}`"></use>
        </svg>
      </label>
    </div>
    <span class="user-form__input-error">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef, watch } from 'vue';
import { useField } from 'vee-validate';
import { modes } from '@/types/interactionModes';
import type { FormInputTypes } from '@/types';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    type: FormInputTypes;
    placeholder: string;
    iconName?: string;
    iconWidth?: string;
    iconHeight?: string;
    mode: string;
  }>(),
  {
    type: 'text',
    mode: 'aggressive',
    iconWidth: '100%',
    iconHeight: '100%'
  }
);

const { meta, value, errorMessage, handleChange, handleBlur } = useField(
  toRef(props, 'name'),
  undefined,
  {
    validateOnValueUpdate: false
  }
);

// generates the listeners
const handlers = computed(() => {
  const on: Record<string, any> = {
    blur: handleBlur,
    // default input event to sync the value
    // the `false` here prevents validation
    input: [(e: Event) => handleChange(e, false)]
  };

  // Get list of validation events based on the current mode
  const triggers = modes[props.mode]({
    errorMessage,
    meta
  });

  // add them to the "on" handlers object
  triggers.forEach((t: string | number) => {
    if (Array.isArray(on[t])) {
      on[t].push(handleChange);
    } else {
      on[t] = handleChange;
    }
  });

  return on;
});

watch(value, (newVal) => {
  value.value = String(newVal).trim();
});
</script>

<style scoped>
.user-form__group {
  position: relative;
}

.user-form__input {
  width: 100%;
  padding-top: 14px;
  padding-right: 16px;
  padding-bottom: 14px;
  padding-left: 52px;

  font-size: 18px;
  font-weight: 400;
  line-height: 133%;
  color: var(--content-placeholder);

  background-color: var(--background-white);
  border: 1px solid var(--content-placeholder);
  border-radius: 8px;

  outline: none;

  transition: border-color 0.3s;
}

.user-form__input:not(:placeholder-shown) {
  color: var(--content-black);

  background-color: rgba(255, 255, 255, 0.15);
  border-color: var(--content-placeholder);
}

.user-form__input:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: var(--content-active);
}

.user-form__input:focus {
  border-color: var(--content-active);
}

.user-form__input[invalid='true'] {
  border-color: #ff7575;
}

.user-form__label {
  position: absolute;
  top: 50%;
  left: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  font-size: 0;
  line-height: 0;

  transform: translateY(-50%);
}

.user-form__input:not(:placeholder-shown) + .user-form__label svg {
  fill: var(--content-placeholder);
}

.user-form__input:hover + .user-form__label svg {
  fill: var(--content-active);
}

.user-form__input:focus + .user-form__label svg {
  fill: var(--content-active);
}

.user-form__input[invalid='true'] + .user-form__label svg {
  fill: #ff7575;
}

.user-form__input-icon {
  max-height: 100%;

  fill: var(--content-placeholder);

  transition: fill 0.3s;
}

.user-form__input-error {
  display: block;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;

  font-size: 12px;
  font-weight: 400;
  color: #ff7575;
}
</style>
