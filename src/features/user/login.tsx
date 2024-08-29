import type React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/input';
import { Button, Link } from '@nextui-org/react';
import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ErrorMessage } from '../../components/error';
import { hasErrorField } from '../../utils/hasErrorFieid';


type LoginFormData = {
    email: string;
    password: string;
}

type Props = {
    setSelected: (value: string) => void;
}

export const Login: React.FC<Props> = ({ setSelected }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormData>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [triggerCurrentQuery] = useLazyCurrentQuery();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data).unwrap();
            await triggerCurrentQuery().unwrap();
            navigate("/")
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error);
            }
        }
    };

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
                control={control}
                name="email"
                label="Email"
                type="email"
                required="required field"
            />
            <Input
                control={control}
                name="password"
                label="Password"
                type={isPasswordVisible ? 'text' : 'password'}
                required="required field"
                endContent={
                    <button
                        className="focus:outline-none"
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label="toggle password visibility"
                    >
                        {isPasswordVisible ? (
                            <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
            />
            <ErrorMessage error={error} />
            <p className="text-center text-small">
                No account?{' '}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected('sign-up')}
                >
                    Sign up
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                    Enter
                </Button>
            </div>
        </form>
    );
};
