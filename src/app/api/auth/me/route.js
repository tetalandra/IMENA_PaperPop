import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'paperpop_secret_key_change_me';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token.value, JWT_SECRET);
        if (!decoded) {
            return NextResponse.json(
                { message: 'Invalid token' },
                { status: 401 }
            );
        }

        await dbConnect();
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

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
        console.error('Auth Check Error:', error);
        return NextResponse.json(
            { message: 'Not authorized', error: error.message },
            { status: 401 }
        );
    }
}
