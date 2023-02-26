import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

export default function FMultiCheckbox({ name, options, ...other }) {
   const { control } = useFormContext();
   return (
      <Controller
         name={name}
         control={control}
         render={({ field }) => {
            const onSelected = (option) => {
               return field.value.includes(options)
                  ? field.value.filter((value) => value !== option)
                  : [...field.value, option];
            };
            return (
               <FormGroup>
                  {options.map((option) => (
                     <FormControlLabel
                        key={option}
                        control={
                           <Checkbox
                              checked={field.value.includes(option)}
                              onChange={() =>
                                 field.onChange(onSelected(option))
                              }
                           />
                        }
                        label={option}
                        {...other}
                     />
                  ))}
               </FormGroup>
            );
         }}
      />
   );
}
