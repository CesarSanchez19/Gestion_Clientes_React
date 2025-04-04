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
  Fade,
  CircularProgress,
  Zoom
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo_electronico: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({
    nombre_usuario: '',
    correo_electronico: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { 
      nombre_usuario: '', 
      correo_electronico: '', 
      password: '' 
    };

    if (!formData.nombre_usuario) {
      errors.nombre_usuario = 'El nombre de usuario es requerido';
      isValid = false;
    } else if (formData.nombre_usuario.length < 3) {
      errors.nombre_usuario = 'El nombre debe tener al menos 3 caracteres';
      isValid = false;
    }

    if (!formData.correo_electronico) {
      errors.correo_electronico = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.correo_electronico)) {
      errors.correo_electronico = 'El formato del correo electrónico no es válido';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError('');
      
      await registerUser(formData);
      setSuccess(true);
      
      setTimeout(async () => {
        try {
          await login(formData.correo_electronico, formData.password);
          navigate('/home');
        } catch (err) {
          console.error('Error al iniciar sesión automáticamente:', err);
          navigate('/login');
        }
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setError(
        err.message.includes('Duplicate entry') 
          ? 'Este correo electrónico ya está registrado' 
          : 'Error al registrar el usuario. Inténtelo de nuevo.'
      );
    } finally {
      setLoading(false);
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
              bgcolor: 'primary.main',
              width: 70,
              height: 70,
              boxShadow: '0 8px 16px rgba(63, 81, 181, 0.3)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <PersonAddIcon fontSize="large" />
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
            Crear Cuenta
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
          
          {success && (
            <Zoom in={success}>
              <Alert 
                severity="success" 
                variant="filled"
                icon={<CheckCircleIcon fontSize="inherit" />}
                sx={{ 
                  width: '100%', 
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
                }}
              >
                ¡Cuenta creada exitosamente! Iniciando sesión...
              </Alert>
            </Zoom>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre_usuario"
              label="Nombre de Usuario"
              name="nombre_usuario"
              autoComplete="name"
              autoFocus
              value={formData.nombre_usuario}
              onChange={handleChange}
              error={!!formErrors.nombre_usuario}
              helperText={formErrors.nombre_usuario}
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
              id="correo_electronico"
              label="Correo Electrónico"
              name="correo_electronico"
              autoComplete="email"
              value={formData.correo_electronico}
              onChange={handleChange}
              error={!!formErrors.correo_electronico}
              helperText={formErrors.correo_electronico}
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
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
              disabled={loading || success}
              sx={{ 
                mt: 2, 
                mb: 4, 
                py: 1.5, 
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 8px 16px rgba(63, 81, 181, 0.3)',
                background: 'linear-gradient(90deg, #3f51b5 0%, #7986cb 100%)',
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
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <HowToRegIcon />}
            >
              {loading ? 'Registrando...' : success ? '¡Cuenta Creada!' : 'Registrarse'}
            </Button>
            
            <Grid container justifyContent="center">
              {/* Se remueve el prop "item" */}
              <Grid>
                <Typography variant="body1" align="center" sx={{ fontSize: '1rem' }}>
                  ¿Ya tienes una cuenta?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/login" 
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
                    Inicia sesión
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
