type OnboardingHintProps = {
  className?: string;
  dense?: boolean;
};

export function OnboardingHint({ className = '', dense }: OnboardingHintProps) {
  return (
    <div className={`onboarding-hint ${dense ? 'onboarding-hint--dense' : ''} ${className}`.trim()}>
      <p className="onboarding-hint__title">Quick steps</p>
      <ol className="onboarding-hint__steps">
        <li>Open 3D preview, then enter AR if your phone supports it.</li>
        <li>Aim at the floor or a table until the ring appears.</li>
        <li>Tap Place, then rotate or reset from the bar below.</li>
      </ol>
    </div>
  );
}
