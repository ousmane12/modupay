import axios from 'axios';

const API_BASE_URL = "https://biba-4c47ebf435ea.herokuapp.com/api";

export function getTransactions() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `${API_BASE_URL}/transactions`,
        { headers }
    );
}

export function getExpenses() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `${API_BASE_URL}/expenses`,
        { headers }
    );
}

export function createTransaction(formData) {
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `${API_BASE_URL}/transactions`,
        formData,
        { headers }
    );
}

export function createExpense(formData) {
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `${API_BASE_URL}/expenses`,
        formData,
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
    return axios.put(`${API_BASE_URL}/transactions/${postId}`, post, { headers });
}

export function deleteTransaction(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(`${API_BASE_URL}/transactions/${postId}`, { headers });
}

export function formatTransactions(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}
