import { calculateLevel } from './level.js';

export async function handleStreak(user) {
    const today = new Date();
    const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;

    // date only no time
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);

    let expGain = 0;

    // if no last login, set streak to 1
    if(!lastLogin){
        user.streak = 1;
    } else {
        const lastLoginData = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());

        // if last login yesterday, +1 streak
        if (lastLoginData.getTime() === yesterdayDate.getTime()){
            user.streak += 1;

        // if last login today, return streak
        } else if (lastLoginData.getTime() === todayDate.getTime()){
            return {
                streak: user.streak,
                expGained: 0,
                level: user.level
            }
        } else {
            user.streak = 1;
        }
    }

    if (user.streak >= 3) {
        expGain = 20;
        user.exp += expGain;

        const levelData = calculateLevel(user.exp);
        user.level = levelData.level;

        user.lastLogin = today;
        await user.save();

        return {
            streak: user.streak,
            expGained: expGain,
            totalExp: user.exp,
            level: user.level,
        };
    }

    user.lastLogin = today;

    await user.save();

    return { streak: user.streak, expGained: 0, totalExp: user.exp, level: user.level };
}
