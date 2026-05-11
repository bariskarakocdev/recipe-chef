import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, Avatar, Divider, Grid } from '@mui/material';
import { MdEmail, MdAccessTime, MdDateRange, MdPerson } from 'react-icons/md';

function Information() {
  const user = useSelector((state) => state.auth.user);

  // Helper to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "Bilinmiyor";
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 4, pb: 8, px: 2 }}>
      <Paper elevation={3} sx={{ maxWidth: 450, width: '100%', p: { xs: 3, md: 4 }, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={user?.photoURL || ""} 
            sx={{ width: 90, height: 90, mb: 2, bgcolor: 'primary.main', fontSize: '3rem' }}
          >
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <MdPerson />}
          </Avatar>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
            Profil Bilgileri
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.dark', width: 48, height: 48 }}>
                <MdPerson size={28} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
                  Ad Soyad
                </Typography>
                <Typography variant="body1" fontWeight="600" fontSize="1.3rem">
                  {user?.displayName || "Belirtilmemiş"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'info.light', color: 'info.dark', width: 48, height: 48 }}>
                <MdEmail size={28} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
                  E-posta Adresi
                </Typography>
                <Typography variant="body1" fontWeight="600" fontSize="1.3rem">
                  {user?.email || "Belirtilmemiş"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark', width: 48, height: 48 }}>
                <MdDateRange size={28} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
                  Kayıt Olma Tarihi
                </Typography>
                <Typography variant="body1" fontWeight="600" fontSize="1.3rem">
                  {formatDate(user?.metadata?.creationTime)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.dark', width: 48, height: 48 }}>
                <MdAccessTime size={28} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
                  Son Giriş Tarihi
                </Typography>
                <Typography variant="body1" fontWeight="600" fontSize="1.3rem">
                  {formatDate(user?.metadata?.lastSignInTime)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Information;