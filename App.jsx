import React, { useState } from 'react';

const styles = {
  app: {
    maxWidth: '420px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  authContainer: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  authHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    marginBottom: '20px',
    borderBottom: '2px solid #eee',
  },
  greeting: {
    margin: 0,
    fontSize: '1.5em',
    color: '#333',
  },
  logoutBtn: {
    padding: '10px 20px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none',
  },
  inputFocus: {
    borderColor: '#007bff',
    boxShadow: '0 0 8px rgba(0, 123, 255, 0.3)',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 123, 255, 0.2)',
  },
  error: {
    color: '#dc3545',
    fontSize: '13px',
    marginTop: '8px',
  },
  userList: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  deleteBtn: {
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null); // Для эффекта фокуса

  const handleLogin = () => {
    if (login.trim() && password.trim()) {
      setUserName(login);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Пожалуйста, введите логин и пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLogin('');
    setPassword('');
    setError('');
  };

  const handleAddUser = () => {
    if (login.trim() && password.trim()) {
      const newUser = { id: Date.now(), name: login, email: 'test@example.com' };
      setUsers([...users, newUser]);
      setLogin('');
      setPassword('');
      setError('');
    } else {
      setError('Пожалуйста, введите логин и пароль');
    }
  };

  const handleRemoveUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const inputStyle = (fieldName) => ({
    ...styles.input,
    ...(focusedInput === fieldName ? styles.inputFocus : {}),
  });

  return (
    <div style={styles.app}>
      {!isAuthenticated ? (
        <div style={styles.authContainer}>
          <div style={styles.authHeader}>
            <h2 style={styles.greeting}>Авторизация</h2>
            {/* Убрана кнопка "Войти" из шапки */}
          </div>
          <form
            style={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div style={styles.formGroup}>
              <input
                style={inputStyle('login')}
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onFocus={() => setFocusedInput('login')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
            <div style={styles.formGroup}>
              <input
                style={inputStyle('password')}
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <button style={styles.button} type="submit">
              Войти
            </button>
          </form>
        </div>
      ) : (
        <>
          <div style={styles.authContainer}>
            <div style={styles.authHeader}>
              <h2 style={styles.greeting}>Здравствуйте, {userName}!</h2>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                Выйти
              </button>
            </div>
            {/* Добавление пользователя */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>Добавить пользователя</h3>
              <input
                style={inputStyle('newUser')}
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onFocus={() => setFocusedInput('newUser')}
                onBlur={() => setFocusedInput(null)}
              />
              <button style={{ ...styles.button, marginTop: '10px' }} onClick={handleAddUser}>
                Добавить
              </button>
            </div>
          </div>

          {/* Список пользователей */}
          {users.length > 0 && (
            <div style={styles.userList}>
              <h3 style={{ marginBottom: '15px', color: '#555' }}>Пользователи</h3>
              {users.map((user) => (
                <div key={user.id} style={styles.userItem}>
                  <div style={styles.userInfo}>
                    <strong style={{ fontSize: '1.1em', color: '#222' }}>{user.name}</strong>
                    <span style={{ fontSize: '0.9em', color: '#555' }}>{user.email}</span>
                  </div>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;