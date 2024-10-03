// public/main.js
//コメント追加
// フォームの送信イベントにリスナーを追加し、addUser 関数を実行する
document.getElementById('userForm').addEventListener('submit', addUser);

document.getElementById('searchInput').addEventListener('searchButton', ferchSearchUser);

// ユーザーを追加するための関数
function addUser(e) {
    // フォームのデフォルトの送信動作を防止する
    e.preventDefault();

    // フォームからユーザーの名前、メール、パスワードを取得する
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // axiosを使って、新しいユーザーをサーバーにPOSTリクエストで送信する
    axios.post('http://localhost:3000/api/users', {
        name: name,
        email: email,
        password: password
    })
    .then(response => {
        // ユーザーが正常に追加されたことを示すメッセージを表示
        alert(response.data.message);
        // 最新のユーザーリストを取得して表示する
        getUsers();
    })
    .catch(error => console.error('Error:', error));  // エラーが発生した場合、エラーメッセージをコンソールに出力
}

// すべてのユーザーを取得して表示するための関数
function getUsers() {
    // axiosを使って、サーバーからすべてのユーザーを取得するGETリクエストを送信する
    axios.get('http://localhost:3000/api/users')
        .then(response => {
            // サーバーから取得したユーザーリストを変数に格納
            const users = response.data;
            // ユーザーリストの表示要素を取得し、内容をクリア
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            // 各ユーザーをリストアイテムとして表示
            users.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${user.name} (${user.email})
                    <a href="update.html?id=${user.id}">Update</a>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                `;
                userList.appendChild(li);  // ユーザーリストに追加
            });
        })
        .catch(error => console.error('Error:', error));  // エラーが発生した場合、エラーメッセージをコンソールに出力
}

// 指定されたIDのユーザーを削除するための関数
function deleteUser(id) {
    // axiosを使って、指定したIDのユーザーを削除するDELETEリクエストを送信する
    axios.delete(`http://localhost:3000/api/users/${id}`)
        .then(response => {
            // ユーザーが正常に削除されたことを示すメッセージを表示
            alert(response.data.message);
            // 最新のユーザーリストを取得して表示する
            getUsers();
        })
        .catch(error => console.error('Error:', error));  // エラーが発生した場合、エラーメッセージをコンソールに出力
}

async function fetchSearchUser() {
  try {
    const response = await fetch(`/users/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log("検索結果:", data);

    document.getElementById("resultList").textContent = "<li>" + JSON.stringify(data) + "</li>";
  } catch (error) {
    console.error("該当するユーザーが見つかりませんでした:", error);

    document.getElementById("resultList").textContent = "該当するユーザーが見つかりませんでした";
  }
}

// ページがロードされたときに、最初にすべてのユーザーを取得して表示する
getUsers();
