import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invitation from '@/models/Invitation';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'paperpop_secret_key_change_me';

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

export async function GET(req, { params }) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        // params is a promise in Next.js 15+, but in 14 it's an object. 
        // Safest to await it if we are on bleeding edge or unsure, but standard for 13/14 is direct access.
        // However, user has Next.js ^16.1.6, so params is a Promise.
        const { id } = await params;

        await dbConnect();
        const invitation = await Invitation.findOne({ _id: id, user: userId });

        if (!invitation) {
            return NextResponse.json({ message: 'Invitation not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: invitation }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await req.json();

        await dbConnect();
        let invitation = await Invitation.findOne({ _id: id, user: userId });

        if (!invitation) {
            return NextResponse.json({ message: 'Invitation not found' }, { status: 404 });
        }

        invitation = await Invitation.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return NextResponse.json({ success: true, data: invitation }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const userId = await getUserId();
        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        await dbConnect();
        const invitation = await Invitation.findOne({ _id: id, user: userId });

        if (!invitation) {
            return NextResponse.json({ message: 'Invitation not found' }, { status: 404 });
        }

        await invitation.deleteOne();

        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}
