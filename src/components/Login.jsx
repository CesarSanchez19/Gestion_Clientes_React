import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Avatar, 
  Button, 
  TextField, 
  Link, 
  Grid, 
  Box, 
  Typography, 
  Container, 
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  Fade
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errors = { email: '', password: '' };

    // Validar email
    if (!email) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'El formato del correo electrónico no es válido';
      isValid = false;
    }

    // Validar contraseña
    if (!password) {
      errors.password = 'La contraseña es requerida';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setError('');
      await login(email, password);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(
        err.message === 'Usuario no encontrado' 
          ? 'El correo electrónico no está vinculado a ninguna cuenta registrada' 
          : err.message === 'Contraseña incorrecta'
            ? 'Contraseña incorrecta'
            : 'Error al iniciar sesión. Inténtelo de nuevo.'
      );
    }
  };

  return (
    <Fade in={true} timeout={800}>
      <Container component="main" maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Paper 
          elevation={10} 
          sx={{ 
            p: { xs: 3, sm: 5 }, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            borderRadius: 4,
            width: '100%',
            background: 'linear-gradient(145deg, #ffffff, #f6f7ff)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '5px',
              background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)'
            }} 
          />
          
          <Avatar 
            sx={{ 
              m: 2, 
              bgcolor: 'secondary.main',
              width: 70,
              height: 70,
              boxShadow: '0 8px 16px rgba(245, 0, 87, 0.3)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 4, 
              fontWeight: 700,
              background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Iniciar Sesión
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              variant="filled"
              sx={{ 
                width: '100%', 
                mb: 3,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)'
              }}
            >
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputProps={{
                sx: { 
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                  transition: 'all 0.3s ease'
                }
              }}
              sx={{
                mb: 2,
                '& label.Mui-focused': {
                  color: 'primary.main',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                  },
                },
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                sx: { 
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                  transition: 'all 0.3s ease'
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& label.Mui-focused': {
                  color: 'primary.main',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                  },
                },
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 2, 
                mb: 4, 
                py: 1.5, 
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 8px 16px rgba(63, 81, 181, 0.3)',
                background: 'linear-gradient(90deg, #3f51b5 0%, #5c6bc0 100%)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: '0 12px 20px rgba(63, 81, 181, 0.4)',
                  transform: 'translateY(-2px)',
                  background: 'linear-gradient(90deg, #3949ab 0%, #5c6bc0 100%)',
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: '0.5s',
                },
                '&:hover:after': {
                  left: '100%',
                }
              }}
            >
              Iniciar Sesión
            </Button>
            
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body1" align="center" sx={{ fontSize: '1rem' }}>
                  ¿No tienes una cuenta?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/signup" 
                    variant="body2" 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600,
                      textDecoration: 'none',
                      position: 'relative',
                      '&:hover': {
                        color: 'primary.dark',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        bottom: '-2px',
                        left: 0,
                        background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)',
                        transform: 'scaleX(0)',
                        transformOrigin: 'bottom right',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                        transformOrigin: 'bottom left',
                      },
                    }}
                  >
                    Regístrate
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
}