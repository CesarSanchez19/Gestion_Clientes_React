import React, { useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Avatar, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Fade,
  Grow,
  Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { currentUser, refreshUserData, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Actualiza la información del usuario sin mostrar pantalla de carga
    refreshUserData().catch(err => {
      console.error('No se pudieron cargar los datos del usuario:', err);
    });
  }, [refreshUserData]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ mt: 4, px: 2 }}>
        <Paper 
          elevation={8} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 4,
            background: 'linear-gradient(145deg, #f0f7ff 0%, #e4eafa 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            maxWidth: '1000px',
            mx: 'auto',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '8px',
              background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)'
            }
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              mb: 5
            }}
          >
            <Grow in={true} timeout={800} style={{ transformOrigin: '50% 0 0' }}>
              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                  bgcolor: 'primary.main',
                  fontSize: 56,
                  mb: 3,
                  boxShadow: '0 8px 20px rgba(63, 81, 181, 0.3)',
                  border: '5px solid white'
                }}
              >
                {currentUser?.nombre_usuario?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </Grow>
            
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 2
              }}
            >
              ¡Bienvenido, {currentUser?.nombre_usuario}!
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center" 
              sx={{ 
                maxWidth: 700, 
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              Has iniciado sesión correctamente. Aquí puedes ver toda la información relacionada con tu cuenta.
            </Typography>
            
            <Divider 
              sx={{ 
                width: '100%', 
                mb: 5,
                '&::before, &::after': {
                  borderColor: 'primary.light',
                }
              }} 
            />
            
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                alignSelf: 'flex-start', 
                mb: 4,
                fontWeight: 600,
                position: 'relative',
                paddingLeft: '16px',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px',
                  height: '70%',
                  bgcolor: 'secondary.main',
                  borderRadius: '4px'
                }
              }}
            >
              Información de la cuenta
            </Typography>
            
            <Grid container spacing={4}>
              <Grid xs={12} md={4}>
                <Grow in={true} timeout={1000} style={{ transformOrigin: '50% 0 0' }}>
                  <Card 
                    elevation={4} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 4,
                      transition: 'all 0.3s ease-in-out',
                      background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)',
                        '& .MuiAvatar-root': {
                          transform: 'scale(1.1)',
                          bgcolor: 'primary.dark'
                        }
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main', 
                          mb: 3,
                          width: 70,
                          height: 70,
                          transition: 'all 0.3s ease',
                          boxShadow: '0 5px 15px rgba(63, 81, 181, 0.3)'
                        }}
                      >
                        <PersonIcon fontSize="large" />
                      </Avatar>
                      <Typography 
                        variant="subtitle1" 
                        color="text.secondary" 
                        gutterBottom
                        sx={{ fontWeight: 500, mb: 1 }}
                      >
                        Nombre de Usuario
                      </Typography>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: '1.3rem',
                          textAlign: 'center'
                        }}
                      >
                        {currentUser?.nombre_usuario}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              
              <Grid xs={12} md={4}>
                <Grow in={true} timeout={1200} style={{ transformOrigin: '50% 0 0' }}>
                  <Card 
                    elevation={4} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 4,
                      transition: 'all 0.3s ease-in-out',
                      background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)',
                        '& .MuiAvatar-root': {
                          transform: 'scale(1.1)',
                          bgcolor: 'secondary.dark'
                        }
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'secondary.main', 
                          mb: 3,
                          width: 70,
                          height: 70,
                          transition: 'all 0.3s ease',
                          boxShadow: '0 5px 15px rgba(245, 0, 87, 0.3)'
                        }}
                      >
                        <EmailIcon fontSize="large" />
                      </Avatar>
                      <Typography 
                        variant="subtitle1" 
                        color="text.secondary" 
                        gutterBottom
                        sx={{ fontWeight: 500, mb: 1 }}
                      >
                        Correo Electrónico
                      </Typography>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: '1.3rem',
                          textAlign: 'center',
                          wordBreak: 'break-word'
                        }}
                      >
                        {currentUser?.correo_electronico}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              
              <Grid xs={12} md={4}>
                <Grow in={true} timeout={1400} style={{ transformOrigin: '50% 0 0' }}>
                  <Card 
                    elevation={4} 
                    sx={{ 
                      height: '100%',
                      borderRadius: 4,
                      transition: 'all 0.3s ease-in-out',
                      background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)',
                        '& .MuiAvatar-root': {
                          transform: 'scale(1.1)',
                          bgcolor: 'success.dark'
                        }
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'success.main', 
                          mb: 3,
                          width: 70,
                          height: 70,
                          transition: 'all 0.3s ease',
                          boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)'
                        }}
                      >
                        <VerifiedUserIcon fontSize="large" />
                      </Avatar>
                      <Typography 
                        variant="subtitle1" 
                        color="text.secondary" 
                        gutterBottom
                        sx={{ fontWeight: 500, mb: 1 }}
                      >
                        Estatus
                      </Typography>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: '1.3rem',
                          color: currentUser?.estatus === 'activo' ? 'success.main' : 'error.main',
                          textShadow: '0 0 1px rgba(0,0,0,0.1)',
                          padding: '4px 16px',
                          borderRadius: '20px',
                          background: currentUser?.estatus === 'activo' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                          border: currentUser?.estatus === 'activo' ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(244, 67, 54, 0.3)'
                        }}
                      >
                        {currentUser?.estatus?.toUpperCase()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            </Grid>
            
            <Fade in={true} timeout={2000}>
              <Box 
                sx={{ 
                  mt: 7, 
                  p: 3, 
                  borderRadius: 4, 
                  width: '100%',
                  background: 'linear-gradient(90deg, #3f51b5 0%, #7986cb 100%)',
                  boxShadow: '0 8px 20px rgba(63, 81, 181, 0.2)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <Typography 
                  variant="body1" 
                  align="center" 
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  ID de Usuario: <b>{currentUser?.id}</b>
                </Typography>
              </Box>
            </Fade>

            {/* Botón para cerrar sesión */}
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained" 
                color="secondary" 
                onClick={handleLogout}
                sx={{ borderRadius: 2, fontWeight: 600 }}
              >
                Cerrar Sesión
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
}
