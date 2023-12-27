import axios from 'axios';

export function getTransactions() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    console.log("My token: " + token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `http://localhost:8000/api/transactions`,
        { headers }
    );
}

export function createTransaction(postData) {
    const postData = {
        firstName, 
        lastName, 
        login, 
        role, 
        phoneNumber,
        email,
        password,
    };
    
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const token = userDetails?.token;
    console.log("My token: " + token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `http://localhost:8000/api/transactions`,
        postData,
        { headers }
    );
}

export function updateTransaction(post, postId) {
    return axios.put(`posts/${postId}.json`, post);
}

export function deleteTransaction(postId) {
    return axiosInstance.delete(`posts/${postId}.json`);
}

export function formatTransactions(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}
