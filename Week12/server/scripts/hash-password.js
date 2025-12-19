import bcrypt from 'bcrypt';

const plainPassword = process.argv[2];

if (!plainPassword) {
    console.error('錯誤：請提供密碼！');
    console.log('用法範例：node scripts/hash-password.js pass1234');
    process.exit(1);
}

const saltRounds = 10;

async function generateHash() {
    try {
        console.log(`正在處理密碼: ${plainPassword}`);
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        
        console.log('\n--------------------------------------------------');
        console.log('雜湊結果 (Hash):');
        console.log(hash);
        console.log('--------------------------------------------------\n');
        console.log('提示：請複製上方這串以 $2b$ 開頭的字串，貼到 mongo-init.js 的 passwordHash 欄位。');

    } catch (error) {
        console.error('發生錯誤:', error);
    }
}

generateHash();