import { object, string, ref } from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const emailRules =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const messages = {
  requiredField: 'Это поле обязательно для заполнения',
  invalidEmail: 'Поле E-mail заполнено не кореектно',
  incorrectPass:
    'Пароль должен быть не менее 5 сиволов (латинские буквы и цыфры). Должны быть минимум: 1 заглавная буква, 1 прописная буква, 1 символ.',
  notMatchPass: 'Пароли не совпадают'
};

export const defaultSchema = object({
  email: string()
    .required(messages.requiredField)
    .email(messages.invalidEmail)
    .matches(emailRules, messages.invalidEmail),
  password: string().required(messages.requiredField).matches(passwordRules, messages.incorrectPass)
});

export const registerSchema = defaultSchema.concat(
  object({
    name: string()
      .required(messages.requiredField)
      .min(3, `Введите минимум 3 буквы`)
      .max(20, `Допускается максимум 20 символов`),
    surname: string()
      .required(messages.requiredField)
      .min(3, `Введите минимум 3 буквы`)
      .max(20, `Допускается максимум 20 символов`),
    confirmPassword: string()
      .required(messages.requiredField)
      .oneOf([ref('password')], messages.notMatchPass)
  })
);
