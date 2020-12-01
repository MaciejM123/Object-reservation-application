import { Create, DateInput, SimpleForm, TextInput } from 'react-admin';
import React from 'react';

export const CreateReservations = (props) => (
  <Create {...props}>
    <SimpleForm>
      <DateInput label={'Dzień'} source={'start_time'} />
      <TextInput label={'Godzina'} source={'hour'} defaultValue={'15:00'} />
      <TextInput label={'Strefa Boiska'} source={'courtid'} />
      <TextInput label={'Imię'} source={'userid.name'} />
      <TextInput label={'Nazwisko'} source={'userid.surname'} />
    </SimpleForm>
  </Create>
);
