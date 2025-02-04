"use client"

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// Datos de ejemplo
const _offices = [
  {
    id: 1,
    country: 'País 1',
    address: 'Dirección 1',
    photo: '/travel_5.jpg',
    email: 'email1@example.com',
    phoneNumber: '123456789',
  },
  {
    id: 2,
    country: 'País 2',
    address: 'Dirección 2',
    photo: '/travel_6.jpg',
    email: 'email2@example.com',
    phoneNumber: '987654321',
  },
  {
    id: 3,
    country: 'País 3',
    address: 'Dirección 3',
    photo: '/travel_7.jpg',
    email: 'email3@example.com',
    phoneNumber: '456123789',
  },
];

const customShadows = {
  z24: '0px 4px 16px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
};

export default function Cards() {
  return (
    <>

      <Box
        sx={{
          py: { xs: 10, md: 15 },
          bgcolor: 'background.neutral',
        }}
      >
        <Container>
          <Box
            sx={{
              gap: 4,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            {_offices.map((office) => (
              <OfficeCard key={office.id} office={office} />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

function OfficeCard({ office }) {
  const { country, address, photo, email, phoneNumber } = office;

  return (
    <Paper
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        '&:hover': {
          boxShadow: customShadows.z24,
        },
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <img src={photo} alt={country} style={{ width: '100%', height: 'auto' }} />
      </Box>

      <Stack spacing={1.5} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          {country}
        </Typography>

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Dirección
          </Typography>
          <Typography variant="body2">{address}</Typography>
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Teléfono
          </Typography>
          <Typography variant="body2">{phoneNumber}</Typography>
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Email
          </Typography>
          <Typography variant="body2">{email}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

OfficeCard.propTypes = {
  office: PropTypes.shape({
    address: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    photo: PropTypes.string,
  }),
};
