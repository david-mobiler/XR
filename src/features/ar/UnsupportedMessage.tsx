import type { ReactNode } from 'react';

type UnsupportedMessageProps = {
  title?: string;
  children: ReactNode;
};

export function UnsupportedMessage({
  title = 'AR not available on this device',
  children,
}: UnsupportedMessageProps) {
  return (
    <div className="unsupported" role="alert">
      <p className="unsupported__title">{title}</p>
      <p className="unsupported__text">{children}</p>
    </div>
  );
}
