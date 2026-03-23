import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'user_achievements.json');

interface UnlockedAchievement {
  id: string;
  unlockedAt: string;
}

async function loadAchievements(): Promise<UnlockedAchievement[]> {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveAchievements(achievements: UnlockedAchievement[]): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(achievements, null, 2));
}

export async function GET() {
  const achievements = await loadAchievements();
  return NextResponse.json(achievements);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { achievementId } = body;
  
  const achievements = await loadAchievements();
  
  // Check if already unlocked
  if (achievements.find(a => a.id === achievementId)) {
    return NextResponse.json({ success: false, message: 'Already unlocked' });
  }
  
  achievements.push({
    id: achievementId,
    unlockedAt: new Date().toISOString(),
  });
  
  await saveAchievements(achievements);
  return NextResponse.json({ success: true });
}
