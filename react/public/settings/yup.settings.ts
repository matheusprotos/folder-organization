import * as YupSettings from 'yup';

YupSettings.setLocale({
  mixed: {
    required: 'Campo obrigatório',
    default: 'Campo inválido',
  },
  string: {
    email: 'Digite um e-mail válido',
    min: 'Verifique a quantidade mínima',
    max: 'Verifique a quantidade máxima',
  },
});

export default YupSettings;
