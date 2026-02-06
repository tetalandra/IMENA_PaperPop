import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invitation from '@/models/Invitation';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'paperpop_secret_key_change_me';

// Helper to get authenticated user ID
async function getUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) return null;

    try {
        const decoded = jwt.verify(token.value, JWT_SECRET);
        return decoded.id;
    } catch (error) {
        return null;
    }
}

export async function GET(req) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const invitations = await Invitation.find({ user: userId }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, count: invitations.length, data: invitations }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        await dbConnect();

        const invitation = await Invitation.create({
            user: userId,
            ...body
        });

        return NextResponse.json({ success: true, data: invitation }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}
