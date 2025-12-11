import { NextResponse } from 'next/server';
import { getSkills } from '@/lib/api';

export async function GET() {
    try {
        const skills = await getSkills();
        return NextResponse.json(skills);
    } catch (error) {
        console.error('Error in skills API:', error);
        return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }
}
