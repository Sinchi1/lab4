import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginForm } from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const StartPage = () => {
    const token = useSelector((state) => state.auth.token);
    const [isLogin, setIsLogin] = useState(true);

    if (token) {
        return <Navigate to="/main" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
                    Web Lab 4
                </h1>
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center mb-6">
                        <p className="text-sm text-gray-600">
                            Карпов Александр Дмитриевич<br />
                            Группа: P3213<br />
                            Вариант: 443
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                    isLogin
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                    !isLogin
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    {isLogin ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
};

export default StartPage;
