import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({}),
    [loading, setLoading] = useState(false),
    handleChange = event => {

      // Defina os valores auxiliares como objeto iguais aos valores originais
      const auxValues = { ...values };
      let propName = event.target.name;
      let propValue = event.target.value;


      // Procure o arquivo na página
      let inputArquivo = document.getElementById('curriculo');

      let data = inputArquivo.files[0]

      // Divida os atributos por name e sete os respectivos valores dos inputs
      auxValues[propName] = propName === 'curriculo' ? data : propValue;


      // Seta os valores dos atributos do form
      setValues(auxValues);
    },

    handleSubmit = callback => event => {
      event.preventDefault();
      setLoading(true);
      callback();
      setLoading(false);

    };
  console.log('Valores Finais', values);
  return [{ values, loading }, handleChange, handleSubmit];
};

export default useForm;
