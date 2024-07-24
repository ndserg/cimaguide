import type { FieldContext } from 'vee-validate';

type InteractionEventGetter = (ctx: FieldContext) => string[];

const aggressive: InteractionEventGetter = () => ['input'];

export const modes: Record<string, any> = {
  aggressive
};
