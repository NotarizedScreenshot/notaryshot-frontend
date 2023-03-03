export interface ITwitterIdFormProps {
  children?: React.ReactNode;
  onSubmit: (url: string) => Promise<boolean>;
  inline?: boolean;
  initialInputData?: string | null;
  validate: (data: string) => Promise<boolean>;
}
