import React, { useState, useEffect, useCallback, render } from 'react';
import './global.css'
import useForm from './useForm';

const FormAtendimento = _ => {
  const [{ values, loading }, handleChange, handleSubmit] = useForm(),
    [disabled, setDisabled] = useState(""),
    [dialog, setDialog] = useState(false);

  const enviarContato = () => {
    // Cadastra os dados
    fetch("/api/dataentities/TB/documents", {
      "method": "POST",
      "headers": {
        "Accept": "application/vnd.vtex.ds.v10+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => {

      })
      .catch(err => {
        console.error(err);
      });

  };

  return <div className="atendimento-form-content" id="form">
    <div className="atendimento-form-center">
      <p className="atendimento-form-title">Trabalhe conosco</p>
      <p className="atendimento-form-description">Envie seu curriculo</p>
      <form className="form-content" className={`form-content ${disabled == "disabled" && "disabled"}`} onSubmit={handleSubmit(enviarContato)} encType='multipart/form-data'>
        <input type="text" onChange={handleChange} id="name" name="name" required="required" placeholder="Nome*" />
        <input type="email" onChange={handleChange} id="email" name="email" required="required" placeholder="Email*" />
        <input type="tel" onChange={handleChange} id="telefone" name="telefone" required="required" placeholder="Telefone*" />
        <input type="text" onChange={handleChange} id="Mensagem" name="Mensagem" placeholder="Mensagem" />
        <div className="input-file">
          <span id="curriculoTxt">


            {
              // ternário - se exister um valor para o currículo, defina o texto do span como nome do arquivo, caso não exista, exiba o 'anexe seu currículo'
              values.curriculo ? values.curriculo.name : 'Anexe seu currículo'
            }
          </span>
          <label for='curriculo' >Procurar</label>
          <input onChange={handleChange} id="curriculo" name="curriculo" type="file" />
        </div>
        {dialog && <span>{dialog}</span>}
        <button>{loading ? 'Loading...' : `${disabled == "disabled" ? "Enviado!" : "Enviar"}`}</button>
      </form>
    </div>
  </div>;
}

export default FormAtendimento;
