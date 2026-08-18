import { Button } from '../ui/button';

type LoaderButtonProps = {
  buttonText: string;
  isLoading?: boolean;
  loaderText?: string;
  classNames?: string;
  type?: 'button' | 'submit';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null;
  onClick?: () => void;
};

export default function LoaderButton({
  buttonText,
  isLoading,
  loaderText,
  classNames = '',
  type,
  variant = 'default',
  onClick,
}: LoaderButtonProps) {
  return (
    <Button
      color="gray"
      type={type || 'submit'}
      disabled={isLoading}
      className={classNames}
      variant={variant}
      onClick={onClick}
    >
      {isLoading && <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>}

      <span className={`${isLoading && 'pl-3'}`}>{isLoading ? loaderText : buttonText}</span>
    </Button>
  );
}
