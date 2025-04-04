# Frontend del Proyecto de Cobranza  

Este es el frontend de un sistema de cobranza que interactúa con una API desarrollada en Node.js y una base de datos MySQL manejada con XAMPP. **Antes de utilizar este proyecto, es obligatorio configurar y ejecutar el backend disponible en el siguiente repositorio:**  

🔗 **Backend del Proyecto:** [ServerAPI - GitHub](https://github.com/CesarSanchez19/ServerAPI)  

---

## 📌 1. Descripción del Proyecto  

Este frontend proporciona una interfaz para que los usuarios puedan registrarse, iniciar sesión y visualizar su perfil después de autenticarse. Utiliza React para el desarrollo de la interfaz y Material UI para los estilos. Se conecta con la API alojada en el backend para la autenticación y recuperación de datos de usuario.  

---

## 📌 2. Módulos y Componentes  

El frontend está compuesto por los siguientes módulos principales:  

### 🔹 **Login** (`src/pages/Login.js`)  
- Permite a los usuarios autenticarse con su correo y contraseña.  
- Verifica las credenciales con la API de usuarios.  
- Si las credenciales son correctas, almacena el token y redirige al usuario a la página de inicio.  

### 🔹 **Signup** (`src/pages/Signup.js`)  
- Permite a los nuevos usuarios registrarse en el sistema.  
- Envía la información de usuario a la API para su almacenamiento en la base de datos.  
- Si el registro es exitoso, redirige a la pantalla de inicio de sesión.  

### 🔹 **Home** (`src/pages/Home.js`)  
- Muestra los datos del perfil del usuario autenticado.  
- Recupera la información desde la API utilizando el token de autenticación.  
- Protege el acceso, asegurando que solo los usuarios autenticados puedan ver esta página.  

---

## 📌 3. Consumo de la API de Usuarios  

El frontend se comunica con el backend a través de los siguientes endpoints de la API de usuarios:  

| Método  | Endpoint          | Descripción                        |
|---------|------------------|------------------------------------|
| `POST`  | `/usuarios`       | Registrar un nuevo usuario        |
| `POST`  | `/usuarios/login` | Autenticar usuario                |
| `GET`   | `/usuarios/:id`   | Obtener datos del usuario autenticado |

### 🔹 **Ejemplo de Consumo en React (Perfil de Usuario en Home)**  
En el archivo `src/services/userService.js`, se realiza una petición `GET` para obtener los datos del usuario autenticado:  

```javascript
const API_URL = 'http://localhost:5000';

export const getUserProfile = async (token, userId) => {
    const response = await fetch(`${API_URL}/usuarios/${userId}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener perfil');
    }
    return response.json();
};
```

### 🔹 **Ejemplo de Uso en el Componente Home**  
```javascript
import { useEffect, useState } from 'react';
import { getUserProfile } from '../services/userService';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                try {
                    const data = await getUserProfile(token, userId);
                    setUser(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchProfile();
    }, []);

    if (!user) return <p>Cargando perfil...</p>;

    return (
        <div>
            <h1>Bienvenido, {user.nombre}</h1>
            <p>Email: {user.correo}</p>
        </div>
    );
};

export default Home;
```

---

## 📌 4. Librerías Utilizadas  

El proyecto usa las siguientes librerías:  

```json
"dependencies": {
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "material-ui": "^5.0.0",
  "axios": "^1.2.0"
}
```

### 🔹 **¿Para qué se usan?**  
- **React** → Framework para construir la interfaz.  
- **React Router DOM** → Manejo de rutas en la aplicación.  
- **Material UI** → Estilos y componentes UI modernos.  
- **Axios** → Manejo de peticiones HTTP a la API.  

---

## 📌 5. Hecho por  
👤 **César David Sánchez Trejo**