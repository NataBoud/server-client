import type React from 'react'
import { Input } from '../../components/input';
import { Button, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRegisterMutation } from '../../app/services/userApi';
import { useState } from 'react';
import { hasErrorField } from '../../utils/hasErrorFieid';
import { ErrorMessage } from '../../components/error';

type RegisterFormData = {
    email: string;
    name: string;
    password: string;
}

type Props = {
    setSelected: (value: string) => void;
}

export const Register: React.FC<Props> = ({ setSelected }) => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<RegisterFormData>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    });

    const [register, { isLoading }] = useRegisterMutation();
    const [error, setError] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await register(data).unwrap();
            setSelected('login')
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
                name="name"
                label="Name"
                type="text"
                required="required field"
            />
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
                I have an account?{' '}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected('login')}
                >
                    Login
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                    Enter
                </Button>
            </div>
        </form>
    )
}
