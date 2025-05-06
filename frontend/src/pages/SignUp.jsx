import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '@/lib/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().min(2).max(50).required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
  .min(8, 'Must be at least 8 characters')
  .matches(/[a-z]/, 'Must include a lowercase letter')
  .matches(/[A-Z]/, 'Must include an uppercase letter')
  .matches(/\d/, 'Must include a number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include a special character')
  .required('Password is required'),
  confirm_password: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm password is required'),
  first_name: Yup.string().max(50),
  last_name: Yup.string().max(50),
});

export default function SignUp({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Only send the actual password, not confirm_password
      const { confirm_password, ...userData } = values;
      const newUser = await createUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('token', newUser.token);
      localStorage.setItem('user', JSON.stringify(newUser.user.id));
      navigate(`/preferences/${newUser.user.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-transparent">
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-md rounded-xl p-10 shadow-xl z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {['username', 'email', 'first_name', 'last_name'].map((field) => (
                <div key={field}>
                  <Label htmlFor={field} className="capitalize">{field.replace('_', ' ')}</Label>
                  <Field
                    as={Input}
                    id={field}
                    name={field}
                    type="text"
                    placeholder={`Enter ${field.replace('_', ' ')}`}
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
              ))}

              {/* Password Field with Toggle */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Confirm Password Field with Toggle */}
              <div>
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Creating account...' : 'Sign Up'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
