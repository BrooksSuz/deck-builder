import { FormEvent, useState } from 'react';
import './styles/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const action = form.getAttribute('action');

      if (action) {
        const formData = new FormData(form);
        const res = await fetch(action, {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setResult(data);
        } else {
          console.error('Request failed with status: ', res.status);
        }
      }
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  return (
    <div>
      <Link to={'/deck-builder'}>Skip the login</Link>
      <form
        action='http://localhost/index.php'
        className='login-container flex'
        method='post'
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>
          Email:
          <input
            id='email'
            name='email'
            onChange={(e) => handleChange(e)}
            placeholder='Enter your email'
            type='email'
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password'
          />
        </label>
        <button type='submit'>Log in</button>
      </form>
      <a href='#'>Forgot password?</a>
      <hr />
      <button type='button'>Create new account</button>
      <h1>{result}</h1>
    </div>
  );
};

export default Login;
