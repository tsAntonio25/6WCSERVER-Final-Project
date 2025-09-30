export function calculateLevel(totalExp) {
    let level = 1
    let expForNext = 500 //exp cap per level
    let remainingExp = totalExp

    // level 50 cap
    // while exp > next exp to level up, subtract the exp to the next exp then increase level
    while (remainingExp >= expForNext && level < 50) {
        remainingExp -= expForNext
        level++;

        if (level <= 10) {
            expForNext += 250   // level 2–10
        } else {
            expForNext += 750   // level 11–50 
        }
    }

    // level 50 user
    if (level >= 50) {
        return {
            level: 50,
            progress: 100,
            totalExp,
            expForNext: 0,
            expInLevel: 0
        };
    }

  // level bar fill progress (%)
    const progress = Math.floor((remainingExp / expForNext) * 100);

    return {
        level,
        progress,
        totalExp,
        expForNext,
        expInLevel: remainingExp,
    }
}