export interface ICutsomFormProps {
  children?: React.ReactNode;
  initialInputData?: string | null;
  onSubmit: (id: string) => Promise<boolean>;
  validate: (data: string) => Promise<boolean>;
}
