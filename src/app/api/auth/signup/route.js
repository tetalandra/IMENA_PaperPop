import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'paperpop_secret_key_change_me';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        await dbConnect();

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Create Token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '30d',
        });

        // Set Cookie
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            sameSite: 'strict',
            path: '/',
        });

        return NextResponse.json(
            {
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup Fatal Error:', error);
        console.error('Stack:', error.stack);


        // Handle Mongoose Validation Errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return NextResponse.json(
                { message: messages.join(', ') },
                { status: 400 }
            );
        }

        // Handle Duplicate Key Error (E11000)
        if (error.code === 11000) {
            return NextResponse.json(
                { message: 'Email already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 }
        );
    }
}
