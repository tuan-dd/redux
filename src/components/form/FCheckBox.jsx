import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function FCheckbox({ name, ...other }) {
   const { control } = useFormContext();
   return (
      <FormControlLabel
         control={
            <Controller
               name={name}
               control={control}
               render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
               )}
            />
         }
         {...other}
      />
   );
}
