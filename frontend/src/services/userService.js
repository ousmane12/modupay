import axios from 'axios';

export function fetchUsers() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    console.log("My token: " + token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(
        `http://localhost:8000/api/users/all`,
        { headers }
    );
}

export function createUser(firstName, lastName, login, role, phoneNumber, email, password) {
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
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    console.log("My token: " + token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `http://localhost:8000/api/users`,
        postData,
        { headers }
    );
}

export function updateUser(post, postId) {
    return axios.put(`posts/${postId}.json`, post);
}

export function deleteUser(postId) {
    return axios.delete(`posts/${postId}.json`);
}

export function formatUsers(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}

export function formatError(errorResponse) {
    return errorResponse.message;
}
