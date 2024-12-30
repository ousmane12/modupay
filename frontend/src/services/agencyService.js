import axios from 'axios';

const API_BASE_URL = "https://biba-4c47ebf435ea.herokuapp.com/api";

export function fetchAgencies() {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    return axios.get(
        `${API_BASE_URL}/agencies/all`,
        { headers }
    );
}

export function createAgency(name, country, manager) {
    const postData = {
        name,
        country,
        manager
    };
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.post(
        `${API_BASE_URL}/agencies/`,
        postData,
        { headers }
    );
}

export function updateAgency(post, postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.put(`${API_BASE_URL}/agencies/${postId}`, post, { headers });
}

export function deleteAgency(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.delete(`${API_BASE_URL}/agencies/${postId}`, { headers });
}

export function getAgency(postId) {
    const userDetailsString = localStorage.getItem('userDetails');
    // Parse userDetails string to convert it into an object
    const userDetails = JSON.parse(userDetailsString);
    // Access the token property
    const token = userDetails?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.get(`${API_BASE_URL}/agencies/${postId}`, { headers });
}

export function formatAgencies(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}

export function formatError(errorResponse) {
    return errorResponse.message;
}