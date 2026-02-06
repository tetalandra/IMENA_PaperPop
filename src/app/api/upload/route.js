import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Create unique filename
        const filename = Date.now() + '_' + file.name.replaceAll(" ", "_");

        // Ensure upload dir exists
        const uploadDir = path.join(process.cwd(), "public/uploads");
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // ignore if exists
        }

        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({ success: true, url: `/uploads/${filename}` }, { status: 201 });
    } catch (error) {
        console.error("Upload Error", error);
        return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
    }
}
