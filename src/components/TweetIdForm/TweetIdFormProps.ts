export interface ICutsomFormProps {
  children?: React.ReactNode;
  initialInputData?: string | null;
  onSubmitCallback?: (id: string) => Promise<boolean>;
  validate: (data: string) => Promise<boolean>;
}
