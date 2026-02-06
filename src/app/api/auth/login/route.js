import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'paperpop_secret_key_change_me';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        await dbConnect();

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

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
            { status: 200 }
        );
    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 }
        );
    }
}
