'use client';

import { ArrowRight, Check } from 'lucide-react';

import { APP_ROUTES } from '@/constants/routes';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useRouter } from '@/i18n/navigation';

const OnboardingComplete = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push(APP_ROUTES.DASHBOARD);
  };

  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false} className="max-w-lg">
        <DialogHeader className="items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-5 w-5" strokeWidth={3} />
            </div>
          </div>

          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Step 04 / 04
          </p>

          <DialogTitle className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">
            You&apos;re All Set!
          </DialogTitle>

          <DialogDescription className="max-w-md text-center">
            Your profile is ready. Start discovering people, sharing your
            skills, and learning something new.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 rounded-2xl border bg-muted/40 p-5 text-center">
          <p className="text-sm font-medium">Welcome to the community 🎉</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Find skills you want to learn and people who want to learn from you.
          </p>
        </div>

        <Button type="button" className="mt-2 w-full" onClick={handleContinue}>
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingComplete;
