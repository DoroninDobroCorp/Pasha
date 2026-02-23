import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PROGRESS_FILE = path.join(process.cwd(), 'data', 'progress.json');
const STATS_FILE = path.join(process.cwd(), 'data', 'stats.json');
const STREAK_FILE = path.join(process.cwd(), 'data', 'streak.json');

export async function POST() {
  try {
    await fs.writeFile(PROGRESS_FILE, JSON.stringify([], null, 2));
    await fs.writeFile(STATS_FILE, JSON.stringify({ level: 1, totalStars: 0, maxStars: 90, streak: 0 }, null, 2));
    await fs.writeFile(STREAK_FILE, JSON.stringify({
      currentStreak: 0,
      lastPracticeDate: '',
      problemsToday: 0,
      dailyHistory: {},
      solvedProblems: {}
    }, null, 2));
    
    return NextResponse.json({ success: true, message: 'All data reset successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to reset data' }, { status: 500 });
  }
}
