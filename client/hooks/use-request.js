import { useState } from 'react';
import axios from 'axios';

export default ({url, method, body, onSuccess}) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const respone = await axios[method](url, body);

      if(onSuccess) {
        onSuccess();
      }
      return respone.data;
    } catch(err) {
      setErrors(
        <div class="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.respone.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return { doRequest, errors };
};