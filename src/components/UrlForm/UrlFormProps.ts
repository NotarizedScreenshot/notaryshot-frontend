import React from 'react';

export interface IUrlFormProps {
  children?: React.ReactNode;
  onSubmit: (url: string) => Promise<boolean>;
  inline?: boolean;
}
