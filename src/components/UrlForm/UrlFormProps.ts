import React from 'react';

export interface IUrlFormProps { 
  children?: React.ReactNode;
  onSubmit: (url: string) => void | Promise<void>;
  inline?: boolean;
  
};