// 新しいエントリーをテーブルに追加する関数
function addEntry(description, shortcut, key, app) {
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${shortcut}</td>
        <td>${key}</td>
        <td>${app}</td>
        <td><button onclick="this.parentElement.parentElement.remove()">削除</button></td>
    `;
    tableBody.appendChild(row);
}

// ページがロードされたときにサンプルデータを追加
document.addEventListener('DOMContentLoaded', () => {
    addEntry('特殊文字入力', 'Shift + Alt', 'U', 'Linux');
});
