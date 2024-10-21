// データの保存先
const STORAGE_KEY = 'shortcut-entries';

// テーブルとフォームの取得
const tableBody = document.querySelector('#shortcut-table tbody');
const form = document.getElementById('shortcut-form');

// エントリーをテーブルに追加する関数
function addEntry(description, shortcut, key, app) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${description}</td>
        <td>${shortcut}</td>
        <td>${key}</td>
        <td>${app}</td>
        <td><button class="delete-btn">削除</button></td>
    `;

    // 削除ボタンのイベントリスナーを追加
    row.querySelector('.delete-btn').addEventListener('click', () => {
        row.remove();
        saveEntries();
    });

    tableBody.appendChild(row);
    saveEntries();
}

// エントリーを保存する関数
function saveEntries() {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const entries = rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
            description: cells[0].textContent,
            shortcut: cells[1].textContent,
            key: cells[2].textContent,
            app: cells[3].textContent
        };
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// 保存されたエントリーをロードする関数
function loadEntries() {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    if (savedEntries) {
        const entries = JSON.parse(savedEntries);
        entries.forEach(entry => addEntry(entry.description, entry.shortcut, entry.key, entry.app));
    }
}

// フォームの送信イベントリスナー
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const shortcut = document.getElementById('shortcut').value;
    const key = document.getElementById('key').value;
    const app = document.getElementById('app').value;

    addEntry(description, shortcut, key, app);

    // フォームをリセット
    form.reset();
});

// ページロード時にエントリーをロード
window.addEventListener('load', loadEntries);
