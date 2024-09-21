import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SearchAndDisplay = () => {

  const [result,setResult] = useState();
  const formik = useFormik({
    initialValues: {
      firstName: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('first  name cannot be empty'),
    }),
    onSubmit: values => {
      axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => setResult(res.data)).then(()=> console.log(result))
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}  
        <button type="submit">Submit</button>
      </form>
      {result && result.map((item) => (<div><p>{item.id}.{item.title}</p></div>))}
    </div>
  );
};

export default SearchAndDisplay;