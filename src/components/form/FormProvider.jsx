import { FormProvider as RHFormProvider } from 'react-hook-form';

export default function FormProvider({ children, onSubmit, methods }) {
   return (
      <RHFormProvider {...methods}>
         <form onSubmit={onSubmit}>{children}</form>
      </RHFormProvider>
   );
}
