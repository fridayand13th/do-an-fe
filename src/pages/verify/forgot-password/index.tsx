import { useEffect, useMemo, useState, useRef } from 'react';
import { MdError } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import ResetPasswordForm from '@components/reset-password';
import Loading from '@components/common/loading';
import NotificationCard from '@components/common/auth-noti-card';
import { verifyForgotPasswordToken } from '@containers/verify/query';
import { useLoadingContext } from '@contexts/loadingContext';

const ForgotPasswordReset = () => {
    const router = useRouter();
    const { startLoading, stopLoading } = useLoadingContext();
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const toast = useToast();
    const { query } = router;
    const token = useMemo(() => {
        return query.token ? String(query.token) : '';
    }, [router.query.token]);

    const { mutateAsync: verifyForgotPassword, isLoading } = verifyForgotPasswordToken();

    const hasVerifiedRef = useRef(false);

    console.log("Token:", token);
    console.log("Verification Status:", verificationStatus);

    useEffect(() => {
        if (isLoading) {
            startLoading();
        } else {
            stopLoading();
        }
    }, [isLoading]);

    useEffect(() => {
        if (token && !hasVerifiedRef.current) {
            hasVerifiedRef.current = true; 
            const verifyToken = async () => {
                try {
                    await verifyForgotPassword(token); 
                    toast({
                        title: 'Xác nhận email thành công.',
                        position: 'top-right',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    setVerificationStatus("success");
                } catch (error) {
                    setVerificationStatus("error");
                }
            };

            verifyToken();
        }
    }, [token]);

    if (isLoading || verificationStatus === 'pending') {
        return <Loading />;
    }

    return (
        <>
            {verificationStatus === "success" ? (
                <ResetPasswordForm token={token}/>
            ) : (
                <NotificationCard
                    title="Liên kết xác thực không hợp lệ"
                    description="Liên kết xác minh bạn nhận được đã hết hạn. Yêu cầu một liên kết mới."
                    redirectLink="/sign-in/forgot-password"
                    redirectText="Bấm vào đây để thử lại"
                    icon={MdError}
                    iconColor="red.600"
                />
            )}
        </>
    );
};

export default ForgotPasswordReset;
