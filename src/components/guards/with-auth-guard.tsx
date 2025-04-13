import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const withAuthGuard = (WrappedComponent: any) => (props: any) => {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  const handleAuthMe = async () => {
    const { data } = await axios.get('http://localhost:3000/api/auth/me');

    if (data.isSuccess) {
      return <WrappedComponent {...props} />;
    } else {
      return router.replace('/');
    }
  };
  useEffect(() => {
    handleAuthMe();
  }, []);
};

export default withAuthGuard;
