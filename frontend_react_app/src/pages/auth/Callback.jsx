import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabaseClient } from '../../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) {
        navigate('/auth/error?type=not-configured');
        return;
      }
      try {
        // For supabase-js v2, getSessionFromUrl was removed.
        // Current guidance: exchange code is handled automatically in signInWithOtp.
        // We will fetch current session; if none, route to error.
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          // eslint-disable-next-line no-console
          console.error('Auth callback error:', error);
          navigate('/auth/error');
          return;
        }
        if (data?.session) {
          navigate('/'); // Redirect to dashboard
        } else {
          navigate('/auth/error?type=session-missing');
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Auth callback exception:', e);
        navigate('/auth/error');
      }
    };
    handleAuthCallback();
  }, [navigate]);

  return <div style={{ padding: 20 }}>Processing authentication...</div>;
}
