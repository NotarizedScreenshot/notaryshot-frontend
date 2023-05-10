export interface ICutsomFormProps {
  children?: React.ReactNode;
  initialInputData?: string | null;
  validate: (data: string) => Promise<boolean>;
}
