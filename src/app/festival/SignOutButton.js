'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    setBusy(true);
    try {
      await fetch('/api/festival/session', { method: 'DELETE' });
    } finally {
      router.refresh();
      setBusy(false);
    }
  };

  return (
    <Button size="small" onClick={signOut} disabled={busy}>
      Sign out
    </Button>
  );
}
