import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const FormularioPago = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "",
  });

  const StateChange = (e) => {
    if (e.target.name === "number" || e.target.name === "cvc") {
      e.target.value = e.target.value.replace(/\D/g, "");
    }

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState(state);

  const FocusChange = (e) => {
    setState({
      ...state,
      focused: e.target.name,
    });
  };

  const onValidate = (state) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    if (!state.name.trim()) {
      errors.name = "El campo Nombre no puede ser vacío";
    } else if (!regexName.test(state.name)) {
      errors.name = "Solo se acepta letras y espacios";
    }
    if (!state.number.trim()) {
      errors.number = "El campo Número no puede ser vacío";
    }else if(state.number.length !== 16){
      errors.number = "Número incompleto";
    }
    if (!state.expiry.trim()) {
      errors.expiry = "La fecha de expiración no puede ser vacía";
    }
    if (!state.cvc.trim()) {
      errors.cvc = "El campo cvc no puede ser vacío";
    }
    return errors;
  };

  const [formdata, setFormdata] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const err = onValidate(state);
    if (Object.keys(err).length === 0) {
      if (state.name !== "") {
        setFormdata([...formdata, state]);
        setErrors({});
      }
    } else {
      setErrors(err);
    }
  };

  const handleRemoveItem = (index) => {
    formdata.splice(index.target.id, 1);
    setFormdata([...formdata]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="card">
            <div className="card-body">
              <Cards
                number={state.number}
                name={state.name}
                expiry={state.expiry}
                cvc={state.cvc}
                focused={state.focused}
              />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="number">Número de la tarjeta</label>
                  <input
                    className="form-control"
                    type="text"
                    name="number"
                    id="number"
                    maxLength={16}
                    onChange={StateChange}
                    onFocus={FocusChange}
                  />
                  {errors.number && (
                    <div className="alert alert-danger p-1" role="alert">
                      {errors.number}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    onChange={StateChange}
                    onFocus={FocusChange}
                  />
                  {errors.name && (
                    <div className="alert alert-danger p-1" role="alert">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label htmlFor="expiry">Fecha de expiración</label>
                      <input
                        className="form-control"
                        type="month"
                        name="expiry"
                        id="expiry"
                        onChange={StateChange}
                        onFocus={FocusChange}
                      />
                      {errors.expiry && (
                        <div className="alert alert-danger p-1" role="alert">
                          {errors.expiry}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label htmlFor="cvc">CVC</label>
                      <input
                        className="form-control"
                        type="text"
                        name="cvc"
                        id="cvc"
                        maxLength={3}
                        onChange={StateChange}
                        onFocus={FocusChange}
                      />
                      {errors.cvc && (
                        <div className="alert alert-danger p-1" role="alert">
                          {errors.cvc}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="btn-group">
                  <button className="btn btn-primary btn-lg btn-block">
                    Pagar
                  </button>
                </div>                
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Número</th>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha expiración</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {formdata.map((arr, index) => (
                <tr key={index}>
                  <td>************{arr.number.substring(12, 16)}</td>                  
                  <td>{arr.name}</td>
                  <td>{arr.expiry}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-1"
                      id={index}
                      onClick={handleRemoveItem}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="list-group-item">
            <span className="fw-light font-monospace">
              Total de pagos: {formdata.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioPago;
