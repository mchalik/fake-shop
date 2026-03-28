import { useState, type FC } from 'react';

import {
  Dialog, Card, CardContent, Typography, TextField, Button, Snackbar, Alert, Box, Link, useMediaQuery, useTheme
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { useMutation } from '@tanstack/react-query';

import { useAppForm } from '@/shared/hooks/useAppForm';
import { type Product } from '@/entities/product';

export const AddProduct: FC = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const postProductMutation = useMutation({
    mutationFn: (_product: Product) => new Promise((resolve) => { resolve(true); })
  });
  const {
    register,
    handleSubmit
  } = useAppForm<Product>();

  return (
    <>
      <Button variant="contained" startIcon={<ControlPointIcon />} onClick={() => { setOpen(true); }}>
      Добавить
      </Button>
      <Dialog open={open} fullScreen={fullScreen} scroll='body'>
        <Card
          sx={{
            minWidth: 350,
            padding: 4,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="h5" component="h1" align="center" fontWeight="bold" sx={{ mb: 1 }}>
            Добавьте товар
            </Typography>

            <form onSubmit={handleSubmit((data) => postProductMutation.mutate(data))} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
              <TextField
                type="input"
                variant="outlined"
                label="Наименование"
                fullWidth
                {...register('title', {
                  required: 'Поле не может быть пустым',
                  maxLength: {
                    value: 128,
                    message: 'Значение больше 128 символов'
                  }
                })}
              />
              <TextField
                label="Вендер"
                type="input"
                variant="outlined"
                fullWidth
                {...register('brand', {
                  required: 'Поле не может быть пустым',
                  maxLength: {
                    value: 128,
                    message: 'Значение больше 128 символов'
                  }
                })}
              />
              <TextField
                label="Категория"
                type="input"
                variant="outlined"
                fullWidth
                {...register('category', {
                  required: 'Поле не может быть пустым',
                  maxLength: {
                    value: 128,
                    message: 'Значение больше 128 символов'
                  }
                })}
              />
              <TextField
                label="Цена"
                type="input"
                variant="outlined"
                fullWidth
                {...register('price', {
                  required: 'Поле не может быть пустым',
                  maxLength: {
                    value: 128,
                    message: 'Значение больше 128 символов'
                  }
                })}
              />
              <TextField
                label="Рейтинг"
                type="number"
                variant="outlined"
                fullWidth
                {...register('rating', {
                  required: 'Поле не может быть пустым',
                  maxLength: {
                    value: 4,
                    message: 'Значение должно быть в формате 1.XX'
                  },
                  min: {
                    value: 1,
                    message: 'Значение меньше 1'
                  },
                  max: {
                    value: 5,
                    message: 'Значение больше 5'
                  }
                })}
              />
              <TextField
                label="Артикул"
                type="input"
                variant="outlined"
                fullWidth
                {...register('sku', {
                  required: 'Поле не может быть пустым',
                  maxLength: {
                    value: 128,
                    message: 'Значение больше 128 символов'
                  }
                })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                loading={postProductMutation.isPending}
                loadingPosition="start"
                sx={{
                  mt: 1,
                  textTransform: 'none',
                  fontSize: '16px'
                }}
              >
                Добавить
              </Button>
              <Snackbar
                open={postProductMutation.isSuccess}
                autoHideDuration={3000}
                onClose={() => { postProductMutation.reset(); }}
              >
                <Alert
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                Товар успешно добавлен
                </Alert>
              </Snackbar>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};