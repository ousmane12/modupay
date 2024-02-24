import axios from 'axios';

export function getTransactions() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `https://modoupay-api.onrender.com/api/transactions`,
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
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `https://modoupay-api.onrender.com/api/transactions`,
        postData,
        { headers }
    );
}

export function updateTransaction(post, postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.put(`https://modoupay-api.onrender.com/api/transactions/${postId}`, post, { headers });
}

export function deleteTransaction(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(`https://modoupay-api.onrender.com/api/transactions/${postId}`, { headers });
}

export function formatTransactions(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}
