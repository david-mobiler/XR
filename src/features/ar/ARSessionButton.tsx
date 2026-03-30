import { TouchButton } from '../../components/TouchButton';

type ARSessionButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

export function ARSessionButton({
  onClick,
  disabled,
  label = 'Start AR',
}: ARSessionButtonProps) {
  return (
    <TouchButton onClick={onClick} disabled={disabled}>
      {label}
    </TouchButton>
  );
}
