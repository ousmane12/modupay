import axios from 'axios';

export function getTransactions() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `http://localhost:8000/api/transactions`,
        { headers }
    );
}

export function createTransaction(sender, receiver, amount, amountConverted) {
    const postData = {
        sender, 
        receiver, 
        amount,
        amountConverted,
    };
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const token = userDetails?.token;
    console.log("My transdata: " + sender, receiver, amount, amountConverted);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `http://localhost:8000/api/transactions`,
        postData,
        { headers }
    );
}

export function updateTransaction(post, postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    console.log(post);
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.put(`http://localhost:8000/api/transactions/${postId}`, post, { headers });
}

export function deleteTransaction(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    console.log("My token: " + token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(`http://localhost:8000/api/transactions/${postId}`, { headers });
}

export function formatTransactions(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}
